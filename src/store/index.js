import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      myMovies: [],
      modalIsOpen: false,
      addMovie: (movie) => set({ myMovies: [...get().myMovies, movie] }),
      changeModalState: (state) => set({ modalIsOpen: state }),
    }),
    {
      name: "movies-storage",
    }
  )
);
