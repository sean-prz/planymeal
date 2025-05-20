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
    <div className="m-5">
      welcome to the pantry
      <InputIngredient onSubmit={addToPantry} />
      <div className="flex-col flex">
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
  );
}
