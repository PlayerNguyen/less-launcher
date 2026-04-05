import { create } from "zustand";
import {
  Loadable,
  initialLoadable,
  createIpcAction,
} from "./util/loadable.store";

interface MinecraftVersionStore {
  versions: Loadable<string[] | undefined>;
  loadVersions: () => Promise<void>;
}

const useMinecraftVersionStore = create<MinecraftVersionStore>((set) => ({
  // State initialization
  versions: initialLoadable<string[]>(undefined),

  // Action definition using the generic helper
  loadVersions: createIpcAction<MinecraftVersionStore, string[]>(
    set,
    "versions",
    "app:list-minecraft-versions",
  ),
}));

export default useMinecraftVersionStore;