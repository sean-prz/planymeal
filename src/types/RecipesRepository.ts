import { Recipe } from "@/types/recipe";
import { Ingredient } from "@/types/Ingredient";
import { ShoppingItem } from "./shoppingItem";

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
  getIngredientsToShop(): Promise<ShoppingItem[]>;
  toggleChecked(shoppingItem: ShoppingItem): Promise<void>;
  removeBoughtIngredients(): Promise<void>;
  getAllIngredients(): Promise<Ingredient[]>;
  updateIngredientType(ingredient: Ingredient, newtype: string): Promise<void>;
  deleteIngredient(ingredientId: number): Promise<void>;
  addIngredient(ingredientName: string): Promise<Ingredient>;
  getIngredientsInStock(): Promise<Ingredient[]>;
}
