import { create } from "zustand";

type SidebarStore = {
  isCompact: boolean;
  setCompact: (compact: boolean) => void;
};

const useSidebarStore = create<SidebarStore>((setter) => ({
  isCompact: false,

  setCompact: (compact: boolean) => {
    setter((state: SidebarStore) => ({ ...state, isCompact: compact }));
  },
}));

export default useSidebarStore;
