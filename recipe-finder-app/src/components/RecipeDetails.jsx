import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setMeal(data.meals ? data.meals[0] : null);
    }
    fetchMeal();
  }, [id]);

  if (!meal)
    return (
      <div>
        <img src="/public/search_glass.png" alt="" className="w-48 m-auto" />
        <p className="text-lime-500 text-center font-bold my-10">Loading...</p>
      </div>
    );

  return (
    <>
      {" "}
      <div className="mt-10 w-72">
        <Link to={"/search"}>
          <div className="text-orange-500  font-bold  ml-10 lg:ml-20  hover:text-lime-200 ">
            {`<`} BACK TO SEARCH
          </div>
        </Link>
        <Link to={"/favourites"}>
          <div className="text-orange-500 mt-2 font-bold  ml-10 lg:ml-20  hover:text-lime-200 ">
            {`<`} BACK TO FAVOURITES
          </div>
        </Link>
      </div>
      <div className="text-white text-center">
        <h1 className="text-center font-bold text-2xl text-orange-500 my-10">
          {meal.strMeal}
        </h1>
        <div className="flex flex-col items-center">
          <figure>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-52 md:w-60 lg:w-96 rounded-xl 
      "
            />
            <figcaption className="text-lime-200 ">
              <div className="font-bold text-xl">{meal.strArea}</div>
              <div>{meal.strCategory}</div>
            </figcaption>
          </figure>
          <div>
            <h2 className="text-center font-bold text-xl text-orange-500 mt-10 mb-5">
              Ingredients
            </h2>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${1 + i}`];
                return ingredient ? (
                  <li key={i} className="flex justify-between gap-20">
                    <span>{ingredient}</span>
                    <span className="text-lime-200">{measure}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>

        <h2 className="text-center text-xl font-bold mt-10 mb-5 text-orange-500">
          Instructions
        </h2>
        <p className=" mx-5 md:mx-10 mb-10 ">{meal.strInstructions}</p>
      </div>
    </>
  );
}

export default RecipeDetails;
