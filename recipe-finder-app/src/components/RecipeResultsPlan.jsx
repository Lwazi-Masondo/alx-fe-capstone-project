import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function RecipeResultsPlan({ planIndex }) {
  const meals = useSearchStore((s) => s.meals);
  const clearMeals = useSearchStore((s) => s.clearMeals);
  const hasSearched = useSearchStore((s) => s.hasSearched);

  const addRecipeToPlan = useSearchStore((s) => s.addRecipeToPlan);
  const removeRecipeFromPlan = useSearchStore((s) => s.removeRecipeFromPlan);
  const mealPlans = useSearchStore((s) => s.mealPlans);
  // const plans = useSearchStore((s) => s.plans);

  // const plan = plans[planIndex];

  if (!meals.length && hasSearched) {
    return (
      <div>
        <img src="/empty_bowl.png" alt="Empty Bowl" className="w-48 m-auto" />
        <p className="text-red-600 text-center font-bold">
          No meals found. Try another search.
        </p>
      </div>
    );
  }

  if (!meals.length && !hasSearched) {
    return null;
  }

  return (
    <div>
      <button
        onClick={clearMeals}
        className="bg-red-600 mx-20 mt-5 p-2 rounded text-white sticky"
      >
        Clear results
      </button>
      <ul className="m-5 p-5 bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {meals.map((meal) => {
          //To check
          const isAdded = mealPlans.some((m) => m.idMeal === meal.idMeal);

          return (
            <li
              key={meal.idMeal}
              className="text-white text-center text-sm w-40 h-auto m-5 rounded-2xl relative cursor-pointer border-2 border-orange-500"
            >
              <Link to={`/recipe/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-40 h-40 mx-auto rounded-2xl hover:opacity-60"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 rounded-b-2xl p-2">
                  <h3 className="font-bold">{meal.strMeal}</h3>
                  <p>{meal.strCategory}</p>
                </div>
              </Link>

              <img
                src={isAdded ? "/trash.png" : "/add.png"}
                alt={isAdded ? "Remove from Plan" : "Add to Plan"}
                className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
                onClick={() =>
                  isAdded
                    ? removeRecipeFromPlan(meal.idMeal)
                    : addRecipeToPlan(meal)
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeResultsPlan;
