import { Recipe } from "@/types/recipe";
import { Ingredient } from "@/types/Ingredient";

export interface RecipesRepository {
  getRecipes(): Promise<Recipe[]>;
  getIngredientsForRecipe(recipeID: number): Promise<Ingredient[]>;
  addIngredientToRecipe(
    ingredientName: string,
    recipeID: number,
  ): Promise<void>;
  removeIngredientToRecipe(
    recipeID: number,
    ingredientID: number,
  ): Promise<void>;
  addRecipe(recipeName: string): Promise<void>;
  removeRecipe(recipeID: number): Promise<void>;
  getIngredient(ingredientID: number): Promise<Ingredient>;
  // get all Ingredients to make the recipes and push it to the shopping_card table
  makeRecipes(recipes: Recipe[]): Promise<void>;
  addIngredientToCard(ingredient: Ingredient): Promise<void>;
  getIngredientsToShop(): Promise<Ingredient[]>;
}
