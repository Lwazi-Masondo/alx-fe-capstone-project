import { create } from "zustand";

const useSearchStore = create((set) => ({
  //to capture user input
  query: "",
  setQuery: (q) => set({ query: q }),
}));

export default useSearchStore;
