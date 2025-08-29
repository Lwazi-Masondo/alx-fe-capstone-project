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
      mealPlan: [],

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
      addRecipeToPlan: (planIndex, meal) =>
        set((state) => {
          const updated = [...state.plans];
          const plan = updated[planIndex];
          if (!plan.recipes.find((r) => r.idMeal === meal.idMeal)) {
            plan.recipes.push(meal);
          }
          return { plans: updated };
        }),

      removeRecipeFromPlan: (planIndex, idMeal) =>
        set((state) => {
          const updated = [...state.plans];
          updated[planIndex].recipes = updated[planIndex].recipes.filter(
            (r) => r.idMeal !== idMeal
          );
          return { plans: updated };
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
