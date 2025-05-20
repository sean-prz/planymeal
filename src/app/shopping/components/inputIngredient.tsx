"use client";

import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { Ingredient } from "@/types/Ingredient";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

interface Prop {
  onSubmit: (input: string) => Promise<void>;
}

export default function InputIngredient(prop: Prop) {
  const { onSubmit } = prop;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [topSuggestions, setTopSuggestions] = useState<string[]>([]);
  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const inputValue = inputRef.current?.value || "";
    setTopSuggestions(
      ingredients
        .map((ingredient) => ingredient.name)
        .filter((suggestion) => suggestion.includes(inputValue))
        .slice(0, 3),
    );
    if (inputValue.length < 2) setTopSuggestions([]);
    if (e.key == "Enter") {
      onSubmit(inputValue); // clear input
      inputRef.current!.value = "";
      setTopSuggestions([]);
    }
  }

  useEffect(() => {
    async function loadIngredients() {
      const repo = await SupaBaseRecipesRepository.getInstance();
      const ingredients = await repo.getAllIngredients();
      setIngredients(ingredients);
    }
    loadIngredients();
  }, []);

  return (
    <div className="mt-10">
      <div className="relative mr-5 w-full">
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
        <div
          id="suggestionsList"
          className="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-white shadow-lg"
        >
          {topSuggestions.map((item) => (
            <div
              className="w-full cursor-pointer p-2 text-center hover:bg-gray-100"
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                inputRef!.current!.value = item;
                inputRef!.current!.focus();
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
