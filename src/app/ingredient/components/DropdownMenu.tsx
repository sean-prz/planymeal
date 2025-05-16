// components/DropdownMenu.tsx
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { Ingredient } from "@/types/Ingredient";
import { ingredient_type } from "@/types/ingredient_types";
import { RecipesRepository } from "@/types/RecipesRepository";
import React, { useState, useRef, useEffect, Ref } from "react";

interface DropdownMenuProps {
  ingredient: Ingredient;
  ref: Ref<HTMLDivElement>;
  toggleMenu: () => void;
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const { ingredient, ref, toggleMenu } = props;

  async function updateIngredient(key: string) {
    console.log("updating ingredinet type ");
    // change the ingredient type to key
    const repo: RecipesRepository =
      await SupaBaseRecipesRepository.getInstance();
    await repo.updateIngredientType(ingredient, key);
    toggleMenu();
  }

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white rounded-md  p-2 border-1 divide-y-1 divide-gray-300"
    >
      {Object.values(ingredient_type).map((item) => (
        <div
          key={item.dbName}
          className="hover:font-bold"
          onClick={(e) => {
            e.preventDefault();
            updateIngredient(item.dbName);
          }}
        >
          {item.displayedName}
        </div>
      ))}
    </div>
  );
}
