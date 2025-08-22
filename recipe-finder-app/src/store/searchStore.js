import { create } from "zustand";
import fetchRecipes from "../services/themealdbservices";

const useSearchStore = create((set) => ({
  query: "", //to capture user input
  meals: [],

  setQuery: (q) => set({ query: q }),

  //function to fetch meals from the api
  fetchMeals: async () => {
    set({ meals: [] }); //clear previous result
    set((state) => {
      if (!state.query.trim()) return { meals: [] }; //no query
    });

    try {
      const results = await fetchRecipes(useSearchStore.getState().query);
      set({ meals: results });
    } catch (error) {
      console.error("Error fetching meals:", error);
      set({ meals: [] });
    }
  },
}));

export default useSearchStore;
