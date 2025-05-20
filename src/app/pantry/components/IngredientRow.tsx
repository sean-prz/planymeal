"use client";

import { Ingredient } from "@/types/Ingredient";
import { useEffect, useRef, useState } from "react";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { capitalizeFirstLetter } from "@/lib/utils";

interface prop {
  ingredient: Ingredient;
  loadIngredients: () => Promise<void>;
}

export default function IngredientRow(prop: prop) {
  const { ingredient, loadIngredients } = prop;

  async function deleteIngredient() {
    const repo = await SupaBaseRecipesRepository.getInstance();
    await repo.removeIngredientFromPantry(ingredient.id);
    loadIngredients();
  }

  return (
    <div className="flex justify-evenly py-2 px-4 hover:scale-99">
      <div className="flex-1 px-4">
        <p className="font-bold">{capitalizeFirstLetter(ingredient.name)}</p>
      </div>

      <div
        className={"font-bold text-red-500 cursor-pointer"}
        onClick={deleteIngredient}
      >
        x
      </div>
    </div>
  );
}
