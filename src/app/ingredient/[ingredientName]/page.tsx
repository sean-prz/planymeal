interface IngredientPageProps {
    params: {
        ingredientName: string; // This must match the folder name [ingredientName]
    };
}

 function IngredientPage({ params }: IngredientPageProps) {
    const {ingredientName} = params;

    return (
        <div> {ingredientName} </div>
    )

}

export default IngredientPage