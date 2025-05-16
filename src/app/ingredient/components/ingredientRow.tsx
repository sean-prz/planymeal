"use client";

import { Ingredient } from "@/types/Ingredient";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";

interface prop {
  ingredient: Ingredient;
}
function capitalizeFirstLetter(str: string): string {
  if (!str) {
    return str; // Handle empty string case
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function IngredientRow(prop: prop) {
  const { ingredient } = prop;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  async function deleteIngredient() {
    const repo = await SupaBaseRecipesRepository.getInstance();
    await repo.deleteIngredient(ingredient.id);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    ingredient.type = "reload to see";
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If click is on the trigger, let toggleDropdown handle it
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      // If click is outside the menu, close it
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="flex justify-evenly py-2 px-4 hover:scale-99">
      <div className="flex-1 px-4">
        <p className="font-bold">{capitalizeFirstLetter(ingredient.name)}</p>
      </div>
      <div className="flex-1 px-4 cursor-pointer">
        <p onClick={toggleDropdown} ref={triggerRef}>
          {ingredient.type ? ingredient.type : "unspecified"}
        </p>
      </div>
      <div
        className={"font-bold text-red-500 cursor-pointer"}
        onClick={() => deleteIngredient()}
      >
        x
      </div>
      {isOpen && (
        <div className="absolute">
          <DropdownMenu
            ingredient={ingredient}
            ref={menuRef}
            toggleMenu={toggleDropdown}
          />
        </div>
      )}
    </div>
  );
}
