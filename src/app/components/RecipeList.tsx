// app/components/RecipeList.tsx
"use client";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard"
import CommandPaletteInput from "@/app/components/CommandPalette";
import {useEffect, useState} from "react";
interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps) {
    const [recipesVisible, setRecipesVisible] = useState(recipes)
    const [showTextInput, _setShowTextInput] = useState(false)
    const [recipeSelected, _setRecipeSelected] = useState<Recipe | null>(null)

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
            {recipesVisible.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} selected={recipe == recipeSelected} setSelected={setRecipeSelected}  setShowTextInput={setShowTextInput} setVisibility={setVisibility}></RecipeCard>
            ))}
            {showTextInput ? (<CommandPaletteInput showTextInput={showTextInput} setShowTextInput={setShowTextInput} recipe={recipeSelected} setRecipeSelected={setRecipeSelected}></CommandPaletteInput>) : ( <div></div>)}
        </div>


    );
}

export default RecipeList;
