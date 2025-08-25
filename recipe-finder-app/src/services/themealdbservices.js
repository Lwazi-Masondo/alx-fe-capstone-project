import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export async function fetchRecipes(query) {
  if (!query) return []; //if there is no query return empty array

  const response = await axios.get(API_URL + encodeURIComponent(query));

  return response.data.meals || [];
}

//To fetch al available categories
export async function fetchCategories() {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  return response.data.meals; // step: 1. first request the available categories in themealdb api.
}

//to fetch meals by category
export async function fetchByCategory(category) {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  return response.data.meals; // step: 2. request the list of meals in the selected category
}
