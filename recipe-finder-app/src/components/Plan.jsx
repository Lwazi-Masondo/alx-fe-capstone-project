import SearchForPlan from "./SearchForPlan";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function Plan() {
  const removeRecipeFromPlan = useSearchStore((s) => s.removeRecipeFromPlan);
  const mealPlans = useSearchStore((s) => s.mealPlans);

  return (
    <div>
      <div>
        <SearchForPlan />
      </div>
      {/* Display */}
      <div className="border-2 border-t-orange-500 mt-5">
        <p className="text-2xl text-orange-500 mt-10 text-center font-bold">
          Plans
        </p>
        <div>
          {mealPlans.length === 0 ? (
            <div>
              <p className="text-center font-bold text-white text-2xl mt-20">
                No Recipes yet!
              </p>
              <img
                src="empty-favourites.png"
                alt="Empty bowl"
                className="m-auto"
              />
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto justify-items-center">
                {mealPlans.map((meal) => (
                  <li
                    key={meal.idMeal}
                    className="text-white text-center text-sm  w-40 h-auto m-5 rounded-2xl relative cursor-pointer border-2 border-orange-500 hover:opacity-60 "
                  >
                    {" "}
                    <Link to={`/recipe/${meal.idMeal}`}>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-40 h-40 mx-auto  drop-shadow-2xl rounded-2xl"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 rounded-b-2xl p-2 ">
                        <h3 className="font-bold">{meal.strMeal}</h3>
                        <p>{meal.strCategory}</p>
                      </div>
                    </Link>
                    <img
                      src={"/trash.png"}
                      alt={"Remove from Plan"}
                      onClick={() => removeRecipeFromPlan(meal.idMeal)}
                      className="w-6 h-6 absolute top-2 right-2 cursor-pointer rounded"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plan;
