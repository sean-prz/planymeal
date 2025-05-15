// app/page.tsx
import RecipeList from "./components/RecipeList";
import { SupaBaseRecipesRepository } from "@/lib/db/SupaBaseRecipesRepository";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function Home() {
  const recipeRepository = await SupaBaseRecipesRepository.getInstance();
  const recipes = await recipeRepository.getRecipes();

  return (
    <div>
      <RecipeList recipes={recipes} /> {/* Pass recipes as props */}
    </div>
  );
}

export default Home;
