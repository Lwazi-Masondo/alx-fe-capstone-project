import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchRecipes(query) {
  if (!query) return []; //if there is no query return empty array

  const response = await axios.get(API_URL + encodeURIComponent(query));

  return response.data.meals || [];
}

export default fetchRecipes;
