import axios from "axios";

const API_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

async function fetchRecipes(query) {
  if (!query) return [];

  const response = await axios.get(API_URL, {
    params: {
      q: query,
      app_key: API_KEY,
      to: 10,
    },
  });

  return response.data.items;
}

export default fetchRecipes;
