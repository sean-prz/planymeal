"use client"
import {useEffect, useState} from "react";
import {RecipesRepository} from "@/types/RecipesRepository";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";
import {Ingredient} from "@/types/Ingredient";

interface IngredientPageProps {
    params: {
        ingredientId: number; // This must match the folder name [ingredientId]
    };
}

 function IngredientPage({ params }: IngredientPageProps) {
    const {ingredientId} = params;
    const [ingredient, setIngredient] = useState<Ingredient>()
    useEffect(() => {
        async function loadIngredient(){
            const repo : RecipesRepository = await SupaBaseRecipesRepository.getInstance()
            setIngredient(await repo.getIngredient(ingredientId))
        }
        loadIngredient()
    }, [])

    return (
        <div className={"m-5 font-bold text-xl"}> {(ingredient?.name)} </div>
    )

}

export default IngredientPage