"use client"
import {Recipe} from "@/types/recipe";
import {useEffect, useState} from "react";
import {RecipesRepository} from "@/types/RecipesRepository";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {Ingredient} from "@/types/Ingredient";
import {RecipeCardStyle} from "@/app/components/RecipeCard.style";
import IngredientsRow from "@/app/components/IngredientsRow";

interface RecipeProp {
    recipe: Recipe,
    selected: boolean,
    setSelected: (recipe: Recipe) => void,
    setShowTextInput: (state: boolean) => void,
    setVisibility: (recipe: Recipe, visible: boolean) => void
}

function capitalizeFirstLetter(str: string): string {
    if (!str) {
        return str; // Handle empty string case
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
async function removeRecipe(recipe: Recipe) {
   const recipeRepository = await SupaBaseRecipesRepository.getInstance()
   await recipeRepository.removeRecipe(recipe.id)
}


function RecipeCard({recipe, selected, setSelected, setShowTextInput, setVisibility} : RecipeProp) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    useEffect(() => {
        async function loadIngredients() {
            const recipeRepository: RecipesRepository = await SupaBaseRecipesRepository.getInstance()
            const ingredients = await recipeRepository.getIngredientsForRecipe(recipe.id)
            setIngredients(ingredients)
        }
        loadIngredients()
    }, [selected])

    return (
    <div className={RecipeCardStyle + ((selected) ? "scale-101" : "")  } >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {capitalizeFirstLetter(recipe.title)}
        </h3>
        <div onClick={() => {removeRecipe(recipe);setVisibility(recipe, false)} }>X</div>
        <IngredientsRow ingredients={ingredients} setSelected={setSelected} recipe={recipe} setShowTextInput={setShowTextInput}></IngredientsRow>
    </div>
    );
}
export default RecipeCard;
