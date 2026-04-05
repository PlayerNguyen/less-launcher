import { ProfileItem } from "@packages/profile/config";
import { create } from "zustand";
import {
  createIpcAction,
  initialLoadable,
  Loadable,
} from "../util/loadable.store";

interface ProfileStore {
  profiles: Loadable<ProfileItem[]>;
  loadProfiles: () => Promise<void>;
  reset: () => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  // Initialize using the generic helper
  profiles: initialLoadable([]),

  // Create the action using the utility
  loadProfiles: createIpcAction<ProfileStore, ProfileItem[]>(
    set,
    "profiles",
    "app:get-profiles",
  ),

  reset: () => set({ profiles: initialLoadable([]) }),
}));

export default useProfileStore;
