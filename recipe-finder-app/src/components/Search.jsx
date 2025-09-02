import useSearchStore from "../store/searchStore";
import FilterFoods from "./Filter";
import RecipeResults from "./RecipeResults";
import { Link } from "react-router-dom";

function Search({ onSubmit }) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery); //selectors prevent unnecessary rendering and better that the other method.
  const fetchMeals = useSearchStore((s) => s.fetchMeals);

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents page from reloading;
    fetchMeals();
  };

  if (!query) {
    setError("Please Enter a value first");
    return;
  }

  return (
    <div className="flex-1">
      <div>
        <Link to={"/"}>
          <div className="text-orange-500 mt-5 font-bold  ml-5 lg:ml-20  hover:text-lime-200 ">
            {`<`} Back
          </div>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-none flex justify-center gap-2 m-5 mt-10"
      >
        <input
          type="text"
          placeholder="Search Recipe.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" border-4 border-lime-200  w-3xs md:w-2xl lg:w-4xl rounded bg-white p-2 focus:border-4 focus:border-orange-500 hover:border-orange-500"
        />
        <button
          type="submit"
          className="bg-lime-200 px-2.5 py-2.5 rounded w-20 cursor-pointer hover:bg-orange-500"
        >
          Search
        </button>
      </form>
      <div>
        <FilterFoods />
      </div>
      {error && (
        <p className="text-red-600 text-center font-bold my-5">{error}</p>
      )}
      <RecipeResults />
    </div>
  );
}

export default Search;
