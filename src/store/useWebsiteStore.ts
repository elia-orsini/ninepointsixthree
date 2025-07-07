import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WebsiteStore {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const useWebsiteStore = create<WebsiteStore>()(
  persist(
    (set) => ({
      currentPage: 0,
      setCurrentPage: (currentPage: number) => set({ currentPage }),
    }),
    { name: "website-store" }
  )
);
