// app/components/RecipeList.tsx
"use client";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard"
import CommandPaletteInput from "@/app/components/CommandPalette";
import {useEffect, useRef, useState} from "react";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps) {
    const [recipesVisible, setRecipesVisible] = useState(recipes)
    const [showTextInput, _setShowTextInput] = useState(false)
    const [recipeSelected, _setRecipeSelected] = useState<Recipe | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null);

    function setShowTextInput(state: boolean): void {
        _setShowTextInput(state)
    }
    function setRecipeSelected(recipe: Recipe | null) {
        console.log("Setting recipe")
        _setRecipeSelected(recipe)
    }

    function setVisibility(recipe: Recipe, visible: boolean) {
        if (visible) {
            // Add the recipe if it's not already in the visible recipes
            if (!recipesVisible.find((r) => r.id === recipe.id)) {
                setRecipesVisible((prevRecipes) => [...prevRecipes, recipe]);
            }
        } else {
            // Remove the recipe if it's currently visible
            setRecipesVisible((prevRecipes) =>
                prevRecipes.filter((r) => r.id !== recipe.id),
            );
        }
    }
    async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const input =
                inputRef.current?.value || '';
            const recipeRepository = await SupaBaseRecipesRepository.getInstance()
            await recipeRepository.addRecipe(input)
            // clear input
            if (inputRef.current)
            inputRef.current.value = ""
            const recipes = await recipeRepository.getRecipes()
            setRecipesVisible(recipes)
        }
    }

    useEffect(() => {
        function handleWindowClick() {
            if (showTextInput) {
                _setShowTextInput(false);
                _setRecipeSelected(null)
            };
            console.log("clicked")
        }

        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, [showTextInput]);

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                className="px-5 py-1 border-gray-950 border-1 rounded"
                onKeyDown={handleKeyDown}
            ></input>
            {recipesVisible.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} selected={recipe == recipeSelected} setSelected={setRecipeSelected}  setShowTextInput={setShowTextInput} setVisibility={setVisibility}></RecipeCard>
            ))}
            {showTextInput ? (<CommandPaletteInput showTextInput={showTextInput} setShowTextInput={setShowTextInput} recipe={recipeSelected} setRecipeSelected={setRecipeSelected}></CommandPaletteInput>) : ( <div></div>)}
        </div>
    );
}

export default RecipeList;
