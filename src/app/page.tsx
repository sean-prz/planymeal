// app/page.tsx
import RecipeList from "./components/RecipeList";
import {SupaBaseRecipesRepository} from "@/lib/db/SupaBaseRecipesRepository";

async function Home() {
    const recipeRepository = await SupaBaseRecipesRepository.getInstance()
    const recipes = await recipeRepository.getRecipes()

    return (
        <div>
            <RecipeList recipes={recipes} /> {/* Pass recipes as props */}
        </div>
    );
}

export default Home;
