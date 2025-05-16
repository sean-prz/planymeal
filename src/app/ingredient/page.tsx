"use client";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { Ingredient } from "@/types/Ingredient";
import { useEffect } from "react";
import React, { useState } from "react";
import IngredientRow from "./components/ingredientRow";
import { ingredient_type } from "@/types/ingredient_types";
import DropdownMenu from "./components/DropdownMenu";
export default function IngredientPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [options, setOptions] = useState<string[]>();
  useEffect(() => {
    async function loadIngredients() {
      const repo = await SupaBaseRecipesRepository.getInstance();
      const ingredients = await repo.getAllIngredients();
      setIngredients(ingredients);
      return;
    }
    loadIngredients();
  }, []);

  // need to fetch all ingredients (id, name, type)
  //and display it on a table ordered by name
  return (
    <div>
      <div className="flex flex-col divide-y-1 divide-gray-100">
        {ingredients?.map((ingredient) => (
          <div key={ingredient.id}>
            <IngredientRow ingredient={ingredient} />
          </div>
        ))}
      </div>
    </div>
  );
}
