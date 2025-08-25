import { create } from "zustand";
import {
  fetchRecipes,
  fetchCategories,
  fetchByCategory,
} from "../services/themealdbservices";

const useSearchStore = create((set) => ({
  query: "", //to capture user input
  meals: [],
  categries: [],
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
    const data = await fetchCategories();
    set({ categories: data });
  },

  //fetch meals by category
  filterByCategory: async (category) => {
    if (!category) return;
    const results = await fetchByCategory(category);
    set({ recipes: results, selectedCategory: category });
  },
}));

export default useSearchStore;
