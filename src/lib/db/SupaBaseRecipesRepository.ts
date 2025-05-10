import {RecipesRepository} from "@/types/RecipesRepository";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Ingredient} from "@/types/Ingredient";
import {Recipe} from "@/types/recipe";
let recipeRepositoryInstance: RecipesRepository | null = null;



interface NeedsIngredient {
    id?: number; // Or string, if this table has its own PK
    recipe_id: number; // Or string
    tag_id: number; // Or string
    // other fields like quantity, unit, etc.
}



export class SupaBaseRecipesRepository implements RecipesRepository {
    private constructor(
        private supabase : SupabaseClient
    ) {}


    static async getInstance(): Promise<RecipesRepository> {
        if (!recipeRepositoryInstance) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
            const supabase = await createClient(supabaseUrl,supabaseAnonKey)
            recipeRepositoryInstance = new SupaBaseRecipesRepository(supabase)
        }
        return recipeRepositoryInstance!;
    }

    async getIngredientsForRecipe(recipeID: number): Promise<Ingredient[]> {
        try {
            const { data, error } = await this.supabase
                .from('recipes')
                .select(
                    `
        id,
        needs_ingredients (
          ingredient_id,
          ingredients (*)
        )
      `
                )
                .eq('id', recipeID)
                .single(); // Assuming recipe titles are unique

            if (error) {
                throw error;
            }
            console.log(data)
            if (!data) {
                return [];
            }
            const ingredients: Ingredient[] =
                data.needs_ingredients.map(
                    item => item.ingredients) as unknown as Ingredient[]
            console.log(ingredients)
            return ingredients
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            return [];
        }
    }

    async getRecipes(): Promise<Recipe[]> {
        const res = await this.supabase.from("recipes").select()
        return res.data as Recipe[]
    }

    async addIngredientToRecipe(ingredientName:string, recipeID:number) {
        console.log(`Adding ${ingredientName} to recipe ${recipeID}`)
        let ingredientID: number
        const { data: existingTag, error: selectTagError } = await this.supabase
            .from('ingredients')
            .select('id')
            .eq('name', ingredientName)
            .maybeSingle<Pick<Ingredient, 'id'>>(); // Use maybeSingle for 0 or 1 row

        if (selectTagError) {
            console.error('Error fetching ingredient:', selectTagError);
            throw selectTagError;
        }
        if (existingTag) {
            // 2a. If exists, get the tag.id
            ingredientID = existingTag.id;
            console.log(`Ingredient "${ingredientName}" found with ID: ${ingredientID}`);
        } else {
            // 2b. If doesn't exist, insert into 'tags' and get the automatically generated id
            console.log(`Ingredient "${ingredientName}" not found, creating it...`);
            const { data: newTag, error: insertTagError } = await this.supabase
                .from('ingredients')
                .insert({ name: ingredientName })
                .select('id') // Important: select the 'id' of the newly inserted row
                .single<Pick<Ingredient, 'id'>>(); // We expect a single row back

            if (insertTagError) {
                console.error('Error inserting ingredient:', insertTagError);
                throw insertTagError;
            }
            if (!newTag) {
                // Should not happen if insertTagError is null, but good for type safety
                throw new Error('Failed to insert ingredient or retrieve its ID.');
            }
            ingredientID = newTag.id;
            console.log(`Tag "${ingredientName}" created with ID: ${ingredientID}`);
        }
        // 3. Add an entry in 'needs_ingredients' with recipeID and tagID
        console.log(
            `Adding entry to needs_ingredients for recipe ID ${recipeID} and ingredient ID ${ingredientID}`,
        );
        const { data: newNeedsIngredient, error: insertLinkError } = await this.supabase
            .from('needs_ingredients')
            .insert({
                recipe_id: recipeID,
                ingredient_id: ingredientID,
                // Add other fields for 'needs_ingredients' if necessary, e.g., quantity
            })
            .select() // Select all columns of the newly created 'needs_ingredients' row
            .single<NeedsIngredient>();
        if (insertLinkError) {
            console.error(
                'Error inserting into needs_ingredients:',
                insertLinkError,
            );
            throw insertLinkError;
        }
        if (!newNeedsIngredient) {
            throw new Error('Failed to create the link in needs_ingredients.');
        }
    }

}