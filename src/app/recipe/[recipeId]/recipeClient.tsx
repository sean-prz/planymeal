"use client";

import { use, useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { Ingredient } from "@/types/Ingredient";
import { RecipesRepository } from "@/types/RecipesRepository";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";

interface RecipePageProps {
  recipeId: number;
}

function RecipePage({ recipeId }: RecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredients, setIngredients] = useState<Ingredient[]>();

  useEffect(() => {
    async function loadRecipeAndIngredients() {
      const recipeRepository: RecipesRepository =
        await SupaBaseRecipesRepository.getInstance();
      const recipes = await recipeRepository.getRecipes();
      const recipe = recipes.find((i) => i.id == recipeId);
      setRecipe(recipe);
      if (recipe) {
        const ingredients = await recipeRepository.getIngredientsForRecipe(
          recipe.id,
        );
        setIngredients(ingredients);
      }
    }
    loadRecipeAndIngredients();
  }, []);

  return (
    <div className={"m-5"}>
      <h3 className={"text-3xl font-bold"}>{recipe?.title} </h3>
      <ul>
        {ingredients?.map((ingredient) => (
          <li key={ingredient.id}> - {ingredient.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipePage;
