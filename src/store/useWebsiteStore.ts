import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WebsiteStore {
  displayBigLogo: boolean;
  setDisplayBigLogo: (displayBigLogo: boolean) => void;
}

export const useWebsiteStore = create<WebsiteStore>()(
  persist(
    (set) => ({
      displayBigLogo: true,
      setDisplayBigLogo: (displayBigLogo) => set({ displayBigLogo }),
    }),
    { name: "website-store" }
  )
);
