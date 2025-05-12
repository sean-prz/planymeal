// app/components/RecipeList.tsx
"use client";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard"
import CommandPaletteInput from "@/app/components/CommandPalette";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {RecipesRepository} from "@/types/RecipesRepository";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps) {
    const [recipesVisible, setRecipesVisible] = useState(recipes)
    const [showTextInput, _setShowTextInput] = useState(false)
    const [showAddRecipe, setShowAddRecipe] = useState(false)
    const [recipeSelected, _setRecipeSelected] = useState<Recipe | null>(null)
    const [recipesPlanned, setRecipesPlanned] = useState<boolean[]>(recipes.map(() => false))
    const inputRef = useRef<HTMLInputElement | null>(null)

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
    async function handleChange(event:  ChangeEvent<HTMLInputElement>) {
        const input = event.target.value.toLowerCase()
        setRecipesVisible(recipes.filter(recipe => recipe.title.includes(input.toLowerCase())))
        if (input.length == 0) setRecipesVisible(recipes)
    }

    function setPlanned(
      index: number
    ): (stat : boolean) => void {
      return (stat: boolean) => {
            console.log(`changing ${index} to ${stat}`)
        setRecipesPlanned((prevRecipesPlanned) => {
          const newRecipesPlanned = [...prevRecipesPlanned];
          newRecipesPlanned[index] = stat;
          return newRecipesPlanned;
        });
      };
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
            <div className="flex items-center m-5"> {/* Aligns items vertically in the center */}

      <div className="relative mr-5 w-full"> {/* Relative for absolute positioning of icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search recipes..."
          onChange={handleChange}
        />
      </div>
        <div className="px-4 inline-flex text-center"
                >{recipesPlanned.filter((it) => it).length}<br/> Selected</div>
      <p
        className="bg-gray-200 rounded-xl px-4 py-2  inline-flex cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowAddRecipe(true);
        }}
      >
        +
      </p>
    </div>
            {recipesVisible.map((recipe) => (
             <RecipeCard 
                    key={recipe.id}
                    recipe={recipe} 
                    selected={recipe == recipeSelected} 
                    setSelected={setRecipeSelected}  
                    setShowTextInput={setShowTextInput} 
                    setVisibility={setVisibility}
                    planned={recipesPlanned[recipes.indexOf(recipe)]}
                    setPlanned={setPlanned(recipes.indexOf(recipe))}
                >
                </RecipeCard>
            ))}
            {showAddRecipe ? (<CommandPaletteInput placeholder={"Add Recipe"} showTextInput={showAddRecipe} onSubmit={submitNewRecipe}></CommandPaletteInput>) : (<div></div>)}
            {showTextInput ? (<CommandPaletteInput placeholder={"Add ingredient"} showTextInput={showTextInput} onSubmit={submitNewIngredient}></CommandPaletteInput>) : ( <div></div>)}
        </div>
    );
}

export default RecipeList;
