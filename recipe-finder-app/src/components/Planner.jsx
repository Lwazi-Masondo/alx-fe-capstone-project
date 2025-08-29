import { useState, useEffect } from "react";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function Planner() {
  // Store state & actions
  const plans = useSearchStore((state) => state.plans);
  const addPlan = useSearchStore((state) => state.addPlan);
  const setRecipeInput = useSearchStore((state) => state.setRecipeInput);
  const deletePlan = useSearchStore((state) => state.deletePlan);

  // Local state for plan inputs
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // Load plans from localStorage on mount
  useEffect(() => {
    const storedPlans = localStorage.getItem("mealPlans");
    if (storedPlans) {
      useSearchStore.getState().setPlans(JSON.parse(storedPlans));
    }
  }, []);

  // Save plans to localStorage whenever plans change
  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(plans));
  }, [plans]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    addPlan(title, date);
    setTitle("");
    setDate("");
  };

  return (
    <div className=" bg-black p-5">
      <h1 className="text-orange-500 text-center font-bold text-3xl m-10">
        Meal Planner
      </h1>

      {/* Add Plan Form */}
      <form
        onSubmit={handleAddPlan}
        className="flex flex-col gap-2 mb-6 justify-self-center items-center"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Plan title"
          className="border-2 border-lime-200 p-2 rounded  bg-white"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border-2 border-lime-200 p-2 rounded w-40  bg-white"
        />
        <button
          type="submit"
          className="bg-lime-200 px-3 py-2 rounded hover:bg-orange-500 w-28"
        >
          Add Plan
        </button>
      </form>

      {/* Display Plans */}
      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5 ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="mb-4 p-3 border-4 border-lime-200 rounded-2xl w-52  bg-black"
          >
            <div className="flex justify-between items-center text-center text-white mb-2 flex-col gap-5">
              <div>
                <h2 className="font-bold text-xl">{plan.title}</h2>
                <p>{plan.date}</p>
              </div>
              <Link to={"/plan"}>
                <img src="/add.png" alt="Add Recipe" className="w-10" />
              </Link>

              <button
                onClick={() => deletePlan(index)}
                className="text-red-500 font-bold px-2 py-1 hover:bg-red-100 rounded"
              >
                <img src="/trash.png" alt="Delete button" className="w-8" />
              </button>
            </div>

            {/* Recipes list */}
            {plan.recipes.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {plan.recipes.map((recipe, i) => (
                  <li key={i} className="flex justify-between items-center">
                    {recipe}
                    <button
                      onClick={() => deleteRecipe(index, i)}
                      className="text-red-500 font-bold px-1 hover:bg-red-100 rounded ml-2"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Add Recipe Form */}
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                addRecipe(index);
              }}
              className="flex gap-2 mt-2"
            >
              <input
                type="text"
                value={plan.recipeInput}
                onChange={(e) => setRecipeInput(index, e.target.value)}
                placeholder="Add recipe"
                className="border-2 border-lime-200 p-2 rounded flex-1"
              />
              <button
                type="submit"
                className="bg-lime-200 px-3 py-2 rounded hover:bg-orange-500"
              >
                Add
              </button>
            </form> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;
