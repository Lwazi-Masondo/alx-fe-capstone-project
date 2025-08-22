import useSearchStore from "../store/searchStore";

function RecipeResults() {
  const meals = useSearchStore((s) => s.meals);
  const query = useSearchStore((s) => s.meals);

  //User hasn't typed anything yet
  if (!query) {
    return <p>Start typing to search for a meal...</p>;
  }

  //User searched but, api returned no results
  if (!meals || meals.length === 0) {
    //"!meals" covers the case of "null" or "undefined" result and "meals.length === 0" covers the case of an empty array.
    return <p className="text-red-600">No meals found. Try another search.</p>;
  }

  //User searched aand meals exist in the api
  //.map can't map over an empty array so always apply a check before.
  return (
    <ul className="bg-amber-50">
      {meals.map((meal) => (
        <li key={meal.idMeal}>{meal.strMeal}</li>
      ))}
    </ul>
  );
}

export default RecipeResults;

//null = api gave no results
