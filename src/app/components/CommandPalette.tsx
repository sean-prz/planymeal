import React, {useEffect, useRef} from 'react';
import { commandPaletteStyle } from './commandPalette.style';
import {RecipesRepository} from "@/types/RecipesRepository";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {Recipe} from "@/types/recipe";

interface CommandPaletteInputProps {
    showTextInput: boolean,
    recipe: Recipe | null,
    setRecipeSelected: (recipe : Recipe | null) => void;
    setShowTextInput: (state: boolean) => void;
}



function CommandPaletteInput({showTextInput, recipe, setShowTextInput, setRecipeSelected}: CommandPaletteInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputValue = inputRef.current?.value || '';
            console.log('Enter key pressed. Input value:', inputValue);
            if (recipe && inputValue.length > 0) {
                const recipeRepository: RecipesRepository = await SupaBaseRecipesRepository.getInstance()
                await recipeRepository.addIngredientToRecipe(inputValue, recipe.id)
                setShowTextInput(false)
                setRecipeSelected(null)
            }


        }
    };

    useEffect(() => {
        if (showTextInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showTextInput]);


    return (
        <div id="background" className="fixed backdrop-blur-xs inset-0 flex items-center justify-center "  style={{ pointerEvents: 'none' }}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Type an Ingredient..."
                className={commandPaletteStyle}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}


export default CommandPaletteInput;
