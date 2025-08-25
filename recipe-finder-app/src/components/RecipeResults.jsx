import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function RecipeResults() {
  const meals = useSearchStore((s) => s.meals);
  const query = useSearchStore((s) => s.meals);
  const recipes = useSearchStore((s) => s.recipes);
  const selectedCategory = useSearchStore((s) => s.selectedCategory);

  //User hasn't typed anything yet
  if (!query) {
    return <p>Start typing to search for a meal...</p>;
  }

  //User searched but, api returned no results
  if (!meals || meals.length === 0) {
    //"!meals" covers the case of "null" or "undefined" result and "meals.length === 0" covers the case of an empty array.
    return (
      <div>
        <img
          src="/public/empty_bowl.png"
          alt="Empty Bowl"
          className="w-48 m-auto"
        />
        <p className="text-red-600 text-center font-bold">
          No meals found. Try another search.
        </p>
      </div>
    );
  }

  //User searched aand meals exist in the api
  //.map can't map over an empty array so always apply a check before.
  return (
    <ul className="m-5 p-5 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {meals.map((meal) => (
        <li
          key={meal.idMeal}
          className="text-white text-center text-sm  w-40 h-auto m-5 rounded relative cursor-pointer border-2 border-orange-500 "
        >
          {" "}
          <Link to={`/recipe/${meal.idMeal}`}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-40 h-40 mx-auto rounded  drop-shadow-2xl "
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/70 rounded-b  ">
              <h3 className="font-bold">{meal.strMeal}</h3>
              <p>{meal.strCategory}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecipeResults;

//null = api gave no results
