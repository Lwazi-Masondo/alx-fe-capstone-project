import useSearchStore from "../store/searchStore";
import { Link } from "react-router-dom";

function Favourites() {
  const favourites = useSearchStore((s) => s.favourites);
  const removeFavourite = useSearchStore((s) => s.removeFavourite);

  if (favourites.length === 0) {
    return (
      <div>
        <p className="text-center font-bold text-white text-2xl mt-20">
          No favourites yet!
        </p>
        <img src="empty-favourites.png" alt="Empty bowl" className="m-auto" />
      </div>
    );
  }
  return (
    <div>
      <div>
        <Link to={"/"}>
          <div className="text-orange-500 mt-2 font-bold  ml-10 lg:ml-20  hover:text-lime-200 ">
            {`<`} Back
          </div>
        </Link>
      </div>

      <h1 className="text-center text-orange-500  font-bold text-2xl my-10">
        Favourites
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto justify-items-center">
        {favourites.map((meal) => (
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
              src={"/redheart.png"}
              alt={"Remove from favourites"}
              onClick={() => removeFavourite(meal.idMeal)}
              className="w-6 h-6 absolute top-2 right-2 cursor-pointer rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
