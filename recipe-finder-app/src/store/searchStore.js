import { create } from "zustand";
import fetchRecipes from "../services/themealdbservices";

const useSearchStore = create((set) => ({
  query: "", //to capture user input
  meals: [],

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
}));

export default useSearchStore;
