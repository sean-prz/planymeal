// app/components/RecipeList.tsx
"use client";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard"
import CommandPaletteInput from "@/app/components/CommandPalette";
import {useEffect, useRef, useState} from "react";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {RecipesRepository} from "@/types/RecipesRepository";
interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps) {
    const [recipesVisible, setRecipesVisible] = useState(recipes)
    const [showTextInput, _setShowTextInput] = useState(false)
    const [showAddRecipe, setShowAddRecipe] = useState(false)
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
    async function submitNewRecipe(input: string) {
            const recipeRepository = await SupaBaseRecipesRepository.getInstance()
            await recipeRepository.addRecipe(input)
            // clear input
            if (inputRef.current)
            inputRef.current.value = ""
            const recipes = await recipeRepository.getRecipes()
            setRecipesVisible(recipes)
            setShowAddRecipe(false)
        }
    async function submitNewIngredient(input: string) {
        if (recipeSelected && input.length > 0) {
            const recipeRepository: RecipesRepository = await SupaBaseRecipesRepository.getInstance()
            await recipeRepository.addIngredientToRecipe(input, recipeSelected.id)
            setShowTextInput(false)
            setRecipeSelected(null)
        }
    }

    useEffect(() => {
        function handleWindowClick() {
            if (showTextInput || showAddRecipe) {
                _setShowTextInput(false);
                setShowAddRecipe(false)
                console.log("setting to false")
                _setRecipeSelected(null)
            };
            console.log("clicked")
        }

        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, [showTextInput, showAddRecipe]);

    return (
        <div>
            <p className={"bg-gray-200 rounded-xl px-2 m-2 inline-flex cursor-pointer"}
                onClick={(e) => {e.stopPropagation();  setShowAddRecipe(true)}} >+</p>
            {recipesVisible.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} selected={recipe == recipeSelected} setSelected={setRecipeSelected}  setShowTextInput={setShowTextInput} setVisibility={setVisibility}></RecipeCard>
            ))}
            {showAddRecipe ? (<CommandPaletteInput placeholder={"Add Recipe"} showTextInput={showAddRecipe} onSubmit={submitNewRecipe}></CommandPaletteInput>) : (<div></div>)}
            {showTextInput ? (<CommandPaletteInput placeholder={"Add ingredient"} showTextInput={showTextInput} onSubmit={submitNewIngredient}></CommandPaletteInput>) : ( <div></div>)}
        </div>
    );
}

export default RecipeList;
