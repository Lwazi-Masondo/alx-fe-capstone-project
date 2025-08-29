import Search from "./Search";
import RecipeResultsPlan from "./RecipeResultsPlan";
import useSearchStore from "../store/searchStore";
import { useParams } from "react-router-dom";

function Plan() {
  const { index } = useParams(); // if you're routing like /plan/0, /plan/1
  const planIndex = parseInt(index, 10);

  const plans = useSearchStore((s) => s.plans);
  const removeRecipeFromPlan = useSearchStore((s) => s.removeRecipeFromPlan);

  const plan = plans[planIndex];
  if (!plan) {
    return <p className="text-center text-red-500">Plan not found</p>;
  }

  return (
    <div>
      <h1 className="text-lime-200 text-center">{plan.title}</h1>
      <p className="text-center text-orange-400">{plan.date}</p>

      {/* Search + Results for this plan */}
      <Search />
      <RecipeResultsPlan planIndex={planIndex} />

      {/* List recipes inside this plan */}
      <div className="border-4 border-b-orange-500 mt-6">
        <h2 className="text-lime-200 text-center text-2xl">
          Recipes in this Plan
        </h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto justify-items-center">
        {plan.recipes.map((meal) => (
          <li
            key={meal.idMeal}
            className="text-white text-center text-sm w-40 h-auto m-5 rounded-2xl relative cursor-pointer border-2 border-orange-500 hover:opacity-60"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-40 h-40 mx-auto rounded-2xl"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/70 rounded-b-2xl p-2">
              <h3 className="font-bold">{meal.strMeal}</h3>
              <p>{meal.strCategory}</p>
            </div>
            <img
              src="/trash.png"
              alt="Remove recipe"
              onClick={() => removeRecipeFromPlan(planIndex, meal.idMeal)}
              className="w-6 h-6 absolute top-2 left-2 cursor-pointer rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Plan;
