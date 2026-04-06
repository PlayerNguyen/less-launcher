import { create } from "zustand";

interface SelectedProfileState {
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string) => void;
  clearSelected: () => void;
}

export const useSelectedProfileStore = create<SelectedProfileState>((set) => ({
  selectedProfileId: null,

  setSelectedProfileId: (id: string) => set({ selectedProfileId: id }),

  clearSelected: () => set({ selectedProfileId: null }),
}));
