import {RecipesRepository} from "@/types/RecipesRepository";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Ingredient} from "@/types/Ingredient";
import {Recipe} from "@/types/recipe";
let recipeRepositoryInstance: RecipesRepository | null = null;
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

}