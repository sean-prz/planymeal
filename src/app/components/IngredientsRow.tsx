"use client";

import { Ingredient } from "@/types/Ingredient";
import { IngredientsRowStyle } from "@/app/components/IngredientsRow.style";
import { Recipe } from "@/types/recipe";
import { capitalizeFirstLetter } from "@/lib/utils";

interface prop {
  ingredients: Ingredient[];
  recipe: Recipe;
  setSelected: (recipe: Recipe) => void;
  setShowTextInput: (state: boolean) => void;
}

function IngredientsRow({
  ingredients,
  setShowTextInput,
  recipe,
  setSelected,
}: prop) {
  ingredients.sort((a, b) => {
    let atype = a.type ? a.type : "";
    let btype = b.type ? b.type : "";
    return btype.localeCompare(atype);
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.id}
          className={`bg-gray-100 border-gray-200 border-1 rounded-full px-4 py-2 font-semibold text-sm cursor-pointer ${ingredient.type}`}
        >
          {capitalizeFirstLetter(ingredient.name)}
        </div>
      ))}
      <div>
        <div
          className={IngredientsRowStyle}
          onClick={(e) => {
            e.stopPropagation();
            setShowTextInput(true);
            setSelected(recipe);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
}
export default IngredientsRow;
