import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function RecipeResults() {
  const meals = useSearchStore((s) => s.meals);
  const query = useSearchStore((s) => s.query);
  const selectedCategory = useSearchStore((s) => s.selectedCategory);
  const favourites = useSearchStore((s) => s.favourites);
  const removeFavourite = useSearchStore((s) => s.removeFavourite);
  const addFavourite = useSearchStore((s) => s.addFavourite);
  const clearMeals = useSearchStore((s) => s.clearMeals);
  const hasSearched = useSearchStore((s) => s.hasSearched);

  // //User searched but, api returned no results
  if (!meals.length && hasSearched) {
    return (
      <div className="mb-20">
        <img src="/empty_bowl.png" alt="Empty Bowl" className="w-48 m-auto" />
        <p className="text-red-600 text-center font-bold">
          No meals found. Try another search.
        </p>
      </div>
    );
  }

  //No search and no category yet - show message
  if (!meals.length && !hasSearched) {
    return null;
  }

  //User searched aand meals exist in the api
  //.map can't map over an empty array so always apply a check before.
  return (
    <ul className="m-5 p-5 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
      <button
        onClick={clearMeals}
        className="bg-red-600 mx-20 mt-5 p-2 rounded text-white sticky"
      >
        Clear results
      </button>
      {meals.map((meal) => {
        //check if meal is already in favourites
        const isFavourite = favourites.some(
          (fav) => fav.idMeal === meal.idMeal
        );
        return (
          <li
            key={meal.idMeal}
            className="text-white text-center text-sm  w-40 h-auto m-5 rounded-2xl relative cursor-pointer border-2 border-orange-500 "
          >
            {" "}
            <Link to={`/recipe/${meal.idMeal}`}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-40 h-40 mx-auto rounded-2xl  drop-shadow-2xl hover:opacity-60 "
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 rounded-b-2xl p-2">
                <h3 className="font-bold">{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
              </div>
            </Link>
            <img
              src={isFavourite ? "/redheart.png" : "/whiteheart.png"}
              alt={isFavourite ? "Remove from favourites" : "Add to favourites"}
              onClick={() =>
                isFavourite ? removeFavourite(meal.idMeal) : addFavourite(meal)
              }
              className="w-6 h-6 absolute top-2 right-2 cursor-pointer rounded"
            />
          </li>
        );
      })}
    </ul>
  );
}

export default RecipeResults;

//null = api gave no results
