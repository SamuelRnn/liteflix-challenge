import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      myMovies: [],
      addMovie: (movie) => set({ myMovies: [...get().myMovies, movie] }),
    }),
    {
      name: "movies-storage",
    }
  )
);
