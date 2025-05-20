"use client";

import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import CommandPaletteInput from "../components/CommandPalette";
import InputIngredient from "../shopping/components/inputIngredient";
import { useCallback, useEffect, useState } from "react";
import { Ingredient } from "@/types/Ingredient";
import IngredientsRow from "./components/IngredientRow";

export default function PantryPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [refresh, setRefresh] = useState(0);
  const addToPantry = useCallback(async (ingredientName: string) => {
    console.log("adding ingredient to pantry");
    const repo = await SupaBaseRecipesRepository.getInstance();
    await repo.addIngredientToPantry(ingredientName);
    setRefresh((prevRefresh) => prevRefresh + 1);
  }, []);

  useEffect(() => {
    async function loadIngredients() {
      const repo = await SupaBaseRecipesRepository.getInstance();
      const ingredients = await repo.getIngredientsInStock();
      setIngredients(ingredients);
    }
    loadIngredients();
  }, [refresh]);

  return (
    <div className="m-10">
      <div className="font-bold text-xl">Add To The Pantry</div>
      <InputIngredient onSubmit={addToPantry} />
      <div className="mt-10 font-bold text-xl">Currently In Stock</div>
      <div className="flex w-full justify-center">
        <div className=" flex-col flex divide-y-1 divide-gray-200 w-96 md:w-2/3">
          {ingredients.map((ingredient) => {
            return (
              <IngredientsRow
                key={ingredient.id}
                ingredient={ingredient}
                loadIngredients={() => {
                  setRefresh((prevRefresh) => prevRefresh + 1);
                  return Promise.resolve();
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
