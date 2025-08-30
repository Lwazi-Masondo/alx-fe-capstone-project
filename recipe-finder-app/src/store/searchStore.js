import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchRecipes,
  fetchCategories,
  fetchByCategory,
} from "../services/themealdbservices";

const useSearchStore = create(
  persist(
    (set, get) => ({
      query: "", //to capture user input
      meals: [],
      categories: [],
      recipes: [],
      selectedCategory: "",
      favourites: [],
      plans: [],
      mealPlans: [],

      setQuery: (q) => set({ query: q }),

      //function to fetch meals from the api
      fetchMeals: async () => {
        const currentQuery = useSearchStore.getState().query.trim();

        if (!currentQuery) {
          set({ meals: [], hasSearched: true }); //searched but no query
          return;
        }

        try {
          const results = await fetchRecipes(currentQuery);
          set({ meals: results, hasSearched: true }); // searched
        } catch (error) {
          console.error("Error fetching meals:", error);
          set({ meals: [] });
        }
      },

      clearMeals: () => set({ meals: [], hasSearched: false }),

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

      //Filter
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

      //Favourites
      addFavourite: (meal) =>
        set((state) => {
          //prevents duplicates
          if (state.favourites.find((fav) => fav.idMeal === meal.idMeal)) {
            return state;
          }
          return { favourites: [...state.favourites, meal] };
        }),

      removeFavourite: (idMeal) =>
        set((state) => ({
          favourites: state.favourites.filter((fav) => fav.idMeal !== idMeal),
        })),

      // planner
      //Add a new plan
      addPlan: (title, date) =>
        set((state) => ({
          plans: [...state.plans, { title, date, recipes: [] }],
        })),

      //delete plan
      deletePlan: (planIndex) =>
        set((state) => {
          const updated = [...state.plans];
          updated.splice(planIndex, 1);
          return { plans: updated };
        }),

      //Add/Remove recipe inside a plan
      addRecipeToPlan: (recipe) =>
        set((state) => {
          if (state.mealPlans.find((m) => m.idMeal === recipe.idMeal)) {
            return state;
          }
          return { mealPlans: [...state.mealPlans, recipe] };
        }),

      removeRecipeFromPlan: (idMeal) =>
        set((state) => ({
          mealPlans: state.mealPlans.filter((m) => m.idMeal !== idMeal),
        })),
    }),

    //partialize so only plans and favourites are stored not api queries or results
    {
      name: "mealPlanner-storage", // key for localStorage
      partialize: (state) => ({
        plans: state.plans,
        favourites: state.favourites,
        mealPlans: state.mealPlans,
      }),
    }
  )
);

export default useSearchStore;
