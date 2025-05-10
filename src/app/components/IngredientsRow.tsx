"use client"

import {Ingredient} from "@/types/Ingredient";
import {IngredientsRowStyle} from "@/app/components/IngredientsRow.style";

function capitalizeFirstLetter(str: string): string {
    if (!str) {
        return str; // Handle empty string case
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
interface prop {
    ingredients: Ingredient[],
    setShowTextInput: (state: boolean) => void,
}

function IngredientsRow({ingredients, setShowTextInput} : prop) {

    return (
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
                    className={IngredientsRowStyle}
                    onClick={(e) =>  {e.stopPropagation(); setShowTextInput(true)}}
                >
                    +
                </div>

            </div>

        </div>
    )


}
export default IngredientsRow;
