import { Recipe } from "@/types/recipe";
import { Ingredient } from "@/types/Ingredient";

export interface RecipesRepository {
  getRecipes(): Promise<Recipe[]>;
  getIngredientsForRecipe(recipeID: number): Promise<Ingredient[]>;
  addIngredientToRecipe(ingredientName: string, recipeID: number): Promise<void>;
}

