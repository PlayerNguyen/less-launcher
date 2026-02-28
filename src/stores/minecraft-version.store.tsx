import { create } from "zustand";

type MinecraftVersionStore = {
  versions?: string[];
  setVersions: (versions: string[]) => void;
  loadVersions: () => void;
};

const useMinecraftVersionStore = create<MinecraftVersionStore>((setter) => ({
  versions: undefined,
  setVersions: (versions: string[]) => {
    setter((state: MinecraftVersionStore) => ({ ...state, versions }));
  },
  loadVersions: async () => {
    const versions: string[] = await window.ipcRenderer.invoke(
      "app:list-minecraft-versions",
    );
    setter((state: MinecraftVersionStore) => ({ ...state, versions }));
  },
}));

export default useMinecraftVersionStore;
