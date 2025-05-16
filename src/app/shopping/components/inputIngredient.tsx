"use client";

import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

interface Prop {}

export default function InputIngredient(prop: Prop) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      console.log("adding ingredient to ingredients");
      const inputValue = inputRef.current?.value || "";
      const repo = await SupaBaseRecipesRepository.getInstance();
      const ingredient = await repo.addIngredient(inputValue);
      console.log(ingredient.id);
      await repo.addIngredientToCard(ingredient);
      // clear input
      inputRef.current!.value = "";
    }
  }

  return (
    <div className="mt-10">
      <div className="relative mr-5 w-full">
        {" "}
        {/* Relative for absolute positioning of icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <PlusCircleIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Ingredient"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
      </div>
    </div>
  );
}
