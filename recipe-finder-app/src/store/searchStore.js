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
  favourites: [],
  plans: [],

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
      plans: [...state.plans, { title, date, recipes: [], recipeInput: "" }],
    })),

  setRecipeInput: (planIndex, value) =>
    set((state) => {
      const updatedPlans = [...state.plans];
      updatedPlans[planIndex].recipeInput = value;
      return { plans: updatedPlans };
    }),

  addRecipe: (planIndex) =>
    set((state) => {
      const updatedPlans = [...state.plans];
      const plan = updatedPlans[planIndex];
      if (!plan.recipeInput) return { plans: updatedPlans };
      plan.recipes.push(plan.recipeInput);
      plan.recipeInput = "";
      return { plans: updatedPlans };
    }),

  deleteRecipe: (planIndex, recipeIndex) =>
    set((state) => {
      const updatedPlans = [...state.plans];
      updatedPlans[planIndex].recipes.splice(recipeIndex, 1);
      return { plans: updatedPlans };
    }),

  deletePlan: (planIndex) =>
    set((state) => {
      const updatedPlans = [...state.plans];
      updatedPlans.splice(planIndex, 1);
      return { plans: updatedPlans };
    }),
}));

export default useSearchStore;
