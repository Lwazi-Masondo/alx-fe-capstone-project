import { create } from "zustand";
import {
  fetchRecipes,
  fetchCategories,
  fetchByCategory,
} from "../services/themealdbservices";

const useSearchStore = create((set) => ({
  query: "", //to capture user input
  meals: [],
  categories: [],
  recipes: [],
  selectedCategory: "",

  setQuery: (q) => set({ query: q }),

  //function to fetch meals from the api
  fetchMeals: async () => {
    const currentQuery = useSearchStore.getState().query.trim();

    if (!currentQuery) {
      set({ meals: [] });
      return;
    }

    try {
      const results = await fetchRecipes(currentQuery);
      set({ meals: results });
    } catch (error) {
      console.error("Error fetching meals:", error);
      set({ meals: [] });
    }
  },

  //fetch categories once
  loadCategories: async () => {
    try {
      const data = await fetchCategories();
      console.log("Fetched categories:", data);
      set({ categories: data });
    } catch (error) {
      console.error("Error Loading categories:", error);
    }
  },
  //fetch meals by category
  filterByCategory: async (category) => {
    if (!category) {
      set({ meals: [] }); //"Reset when all categories is chosen"
      return;
    }
    try {
      const results = await fetchByCategory(category);
      set({ meals: results, selectedCategory: category });
    } catch (error) {
      console.error("Error filtering by category:", error);
      set({ meals: [] });
    }
  },
}));

export default useSearchStore;
