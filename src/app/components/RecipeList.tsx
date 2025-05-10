// app/components/RecipeList.tsx
"use client";
import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard"
interface RecipeListProps {
    recipes: Recipe[];
}

function RecipeList({ recipes }: RecipeListProps) {
    return (
        <div>
            {recipes.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
            ))}
        </div>
    );
}

export default RecipeList;
