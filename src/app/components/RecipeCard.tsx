"use client"
import {Recipe} from "@/types/recipe";
import {useEffect, useState} from "react";
import {RecipesRepository} from "@/types/RecipesRepository";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {Ingredient} from "@/types/Ingredient";
import {RecipeCardStyle} from "@/app/components/RecipeCard.style";

interface RecipeProp {
    recipe: Recipe
}

function capitalizeFirstLetter(str: string): string {
    if (!str) {
        return str; // Handle empty string case
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function RecipeCard({recipe} : RecipeProp) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [showInput, setShowInput] = useState(false);
    const [newTag, setNewTag] = useState("");
    useEffect(() => {
        async function loadIngredients() {
            const recipeRepository: RecipesRepository = await SupaBaseRecipesRepository.getInstance()
            const ingredients = await recipeRepository.getIngredientsForRecipe(recipe.id)
            setIngredients(ingredients)
        }
        loadIngredients()
    }, [])

    return (
    <div
        className={RecipeCardStyle}
    >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {recipe.title}
        </h3>
        <div className="flex flex-row flex-wrap gap-2">
            {ingredients.map((ingredient) => (
                <div
                    key={ingredient.id}
                    className="bg-gray-100 border-gray-200 border-1 rounded-full px-4 py-2 font-semibold text-sm"
                >
                    {capitalizeFirstLetter(ingredient.name)}
                </div>
            ))}
            <div>
                <div
                    className="
                        bg-gray-100
                        border-gray-200
                        border-1
                        rounded-full
                        px-4
                        py-2
                        font-semibold
                        text-sm
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        w-8
                        h-8
                        text-gray-800
                      "
                    onClick={() => {
                        // Handle the action to add a new tag here
                        setShowInput(true)
                        console.log("Add tag button clicked");

                    }}
                >
                    +
                </div>
                
            </div>
            
        </div>
        <div>{showInput ? ("clicked"): "not clicked"}</div>
    </div>

    );
}
export default RecipeCard;