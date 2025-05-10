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
    const [showTextInput, _setShowTextInput] = useState(false)

    function setShowTextInput(state: boolean): void {
        _setShowTextInput(state)
    }

    useEffect(() => {
        function handleWindowClick() {
            if (showTextInput) {_setShowTextInput(false)};
            console.log("clicked")
        }

        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, [showTextInput]);

    return (
        <div>
            {recipes.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe}  setShowTextInput={setShowTextInput}></RecipeCard>
            ))}
            {showTextInput ? (<CommandPaletteInput showTextInput={showTextInput}></CommandPaletteInput>) : ( <div></div>)}
        </div>


    );
}

export default RecipeList;
