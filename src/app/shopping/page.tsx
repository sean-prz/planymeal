"use client";

import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Ingredient } from "@/types/Ingredient";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";
import { useEffect } from "react";
import { ShoppingItem } from "@/types/shoppingItem";
import { supabase } from "@/lib/db/SupaBaseRecipesRepository";
import { ingredient_type } from "@/types/ingredient_types";
import InputIngredient from "./components/inputIngredient";
function ShoppingList({}) {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>();
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  useEffect(() => {
    console.log("recomputing setShowClearButton");
    setShowClearButton(
      shoppingItems
        ? shoppingItems.filter((item) => item.checked).length > 0
        : false,
    );
    console.log("to" + showClearButton);
  }, [shoppingItems]);

  useEffect(() => {
    async function loadIngredients() {
      const repo = await SupaBaseRecipesRepository.getInstance();
      const items = await repo.getIngredientsToShop();
      const seen = new Set<number>();
      const itemsFiltered = items.filter((item) => {
        if (seen.has(item.ingredient.id)) {
          return false;
        }
        seen.add(item.ingredient.id);
        return true;
      });
      setShoppingItems(itemsFiltered);
    }
    loadIngredients();

    // Set up realtime subscription
    const channel = supabase
      .channel("any") // You can use a specific channel name or 'any'
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shopping_card" }, // Replace with your table name and schema
        async (payload) => {
          console.log("Change received!", payload);
          // Refresh the data after any change event (INSERT, UPDATE, DELETE)
          loadIngredients();
        },
      )
      .subscribe();

    // Unsubscribe when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function setChecked(item: ShoppingItem) {
    // first update local even if it's gonna be overwritten super fast:
    setShoppingItems(
      shoppingItems?.map((shoppingItem) =>
        shoppingItem.ingredient.id === item.ingredient.id
          ? { ...shoppingItem, checked: !shoppingItem.checked }
          : shoppingItem,
      ),
    );
    const repo = await SupaBaseRecipesRepository.getInstance();
    repo.toggleChecked(item);
  }

  async function clearBoughtItems() {
    const repo = await SupaBaseRecipesRepository.getInstance();
    await repo.removeBoughtIngredients();
  }

  return (
    <div className="m-5 flex flex-col">
      <div className="flex align-middle ">
        <div className="text-xl font-bold p-2 mr-5">Shopping List</div>
        <div
          className={`self-end text-red-300 border-red-300 bg-red-50 cursor-pointer text-center border-1 w-fit rounded-sm p-2 px-4 ${
            showClearButton ? "visible" : "hidden"
          }`}
          onClick={() => clearBoughtItems()}
        >
          Clear
        </div>
      </div>

      {Object.values(ingredient_type).map((type) => {
        const empty =
          shoppingItems?.filter((item) => item.ingredient.type == type.dbName)
            .length == 0;
        if (empty) return;
        // Each group (h3 + list of items) needs a key.
        // Use a unique property from 'type', like type.id or type.dbName.
        return (
          <React.Fragment key={type.displayedName || type.dbName}>
            <h3 className={`font-bold`}>{type.displayedName}</h3>
            <p className={type.dbName}> </p>
            {shoppingItems
              ?.filter((item) => item.ingredient.type === type.dbName) // Use strict equality
              .map((shoppingItem) => (
                // The key here should be unique for each shoppingItem,
                // shoppingItem.id is usually best if available.
                <div
                  key={shoppingItem.ingredient.id}
                  className="flex items-center"
                >
                  <Checkbox
                    checked={shoppingItem.checked}
                    onClick={() => setChecked(shoppingItem)}
                  />
                  <p>{shoppingItem.ingredient.name}</p>
                </div>
              ))}
          </React.Fragment>
        );
      })}
      <InputIngredient />
    </div>
  );
}
export default ShoppingList;
