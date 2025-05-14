import { use } from "react";
import { Recipe } from "@/types/recipe";
import { Ingredient } from "@/types/Ingredient";
import { RecipesRepository } from "@/types/RecipesRepository";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import RecipePage from "./recipeClient";

interface RecipePageProps {
  params: Promise<{ recipeId: number }>;
}

/*export async function generateStaticParams() {
  const repo = await SupaBaseRecipesRepository.getInstance();
  const recipes = await repo.getRecipes();
  return recipes.map((recipe) => ({
    recipeId: recipe.id.toString(),
  }));
}*/

function RecipeServer({ params }: RecipePageProps) {
  const { recipeId } = use(params);
  return <RecipePage recipeId={recipeId} />;
}

export default RecipeServer;
