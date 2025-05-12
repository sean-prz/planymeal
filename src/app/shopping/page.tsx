"use client"

import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Ingredient } from '@/types/Ingredient';  
import { SupaBaseRecipesRepository } from '@/lib/db/SupaBaseRecipesRepository';
import { useEffect } from 'react'; 
function ShoppingList({}) {
  const [ingredients, setIngredients] = useState<Ingredient[]>()

  useEffect(() => {
    async function loadIngredients() {
      const repo = await SupaBaseRecipesRepository.getInstance()
      const items = await repo.getIngredientsToShop()
      setIngredients(items.map(it => it.ingredient))
    }
    loadIngredients() 
    }, [])


  return (
  <div className="m-5">
      <div className="text-xl font-bold">Shopping List</div>
      {ingredients?.map((ingredient) => { return(
      <div className="flex items-center"> 
        <Checkbox/> <p>{ingredient.name}</p>
      </div>
      )})}
  </div>
  )
}
export default ShoppingList;

