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
          plans: [...state.plans, { id: Date.now(), title, date, recipes: [] }],
        })),

      //delete plan
      deletePlan: (planId) =>
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== planId),
        })),

      //Add/Remove recipe inside a plan
      addRecipeToPlan: (recipe, planId) =>
        set((state) => {
          const plan = state.plans.find((p) => p.id === planId);
          if (!plan) return {}; // plan not found

          // prevent duplicates in this plan
          if (plan.recipes.some((r) => r.idMeal === recipe.idMeal)) return {};

          const updatedPlans = state.plans.map((p) =>
            p.id === planId ? { ...p, recipes: [...p.recipes, recipe] } : p
          );

          return { plans: updatedPlans };
        }),

      removeRecipeFromPlan: (planId, idMeal) =>
        set((state) => {
          const plan = state.plans.find((p) => p.id === planId);
          if (!plan) return {};

          const updatedPlans = state.plans.map((p) =>
            p.id === planId
              ? { ...p, recipes: p.recipes.filter((r) => r.idMeal !== idMeal) }
              : p
          );

          return { plans: updatedPlans };
        }),
    }),

    //partialize so only plans and favourites are stored not api queries or results
    {
      name: "mealPlanner-storage", // key for localStorage
      partialize: (state) => ({
        plans: state.plans,
        favourites: state.favourites,
      }),
    }
  )
);

export default useSearchStore;
