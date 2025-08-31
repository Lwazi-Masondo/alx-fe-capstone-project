import { useState } from "react";
import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function Planner() {
  // Zustand state & actions
  const plans = useSearchStore((state) => state.plans);
  const addPlan = useSearchStore((state) => state.addPlan);
  const deletePlan = useSearchStore((state) => state.deletePlan);

  // Local input for new plans
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    addPlan(title, date);
    setTitle("");
    setDate("");
  };

  return (
    <div className="bg-black p-5">
      <div>
        <Link to={"/"}>
          <div className="text-orange-500 mt-2 font-bold  ml-5 lg:ml-20  hover:text-lime-200 ">
            {`<`} Back
          </div>
        </Link>
      </div>

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
          className="border-2 border-lime-200 p-2 rounded bg-white"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border-2 border-lime-200 p-2 rounded w-40 bg-white"
        />
        <button
          type="submit"
          className="bg-lime-200 px-3 py-2 rounded hover:bg-orange-500 w-28"
        >
          Add Plan
        </button>
      </form>

      {/* Display Plans */}
      <div className="grid grid-cols-1 justify-items-center md:grid-col-2 lg:grid-cols-3 gap-5 mt-10 ">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="mb-4 p-3 border-4 border-lime-200 rounded-2xl w-52 bg-black"
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
                onClick={() => deletePlan(plan.id)}
                className="text-red-500 font-bold px-2 py-1 hover:bg-red-100 rounded"
              >
                <img src="/trash.png" alt="Delete button" className="w-8" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;
