"use client"

import {useEffect, useState} from "react";
import {Recipe} from "@/types/recipe";
import {Ingredient} from "@/types/Ingredient";
import {RecipesRepository} from "@/types/RecipesRepository";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";

interface RecipePageProps {
    params: {
        recipeId: number; // This must match the folder name [ingredientId]
    };
}


function IngredientPage({ params }: RecipePageProps) {
    const [recipe, setRecipe] = useState<Recipe>()
    const [ingredients, setIngredients] = useState<Ingredient[]>()




    useEffect(() => {
        async function loadRecipeAndIngredients() {

            const recipeRepository: RecipesRepository = await SupaBaseRecipesRepository.getInstance()
            const recipes = await recipeRepository.getRecipes()
            const recipe = recipes.find(i => i.id == params.recipeId)
            setRecipe(recipe)
            if (recipe) {
              const ingredients = await recipeRepository.getIngredientsForRecipe(recipe.id)
              setIngredients(ingredients)
            }

        }
        loadRecipeAndIngredients()
    }, [])

    return (
        <div className={"m-5"}>
            <h3 className={"text-3xl font-bold"}>{recipe?.title} </h3>
            <ul>
                {ingredients?.map(ingredient => (
                    <li key={ingredient.id}> - {ingredient.name}  </li>
                ))}

            </ul>

        </div>
    )

}

export default IngredientPage
