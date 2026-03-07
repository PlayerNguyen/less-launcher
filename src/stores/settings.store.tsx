import { ComboboxItem } from "@mantine/core";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SettingsState {
  lastUsername?: string;
  setLastUsername: (username: string) => void;

  lastPlayedVersion?: ComboboxItem | null;
  setLastPlayedVersion: (version: ComboboxItem | null) => void;
}

export const useSettingStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Last username
      lastUsername: undefined,
      setLastUsername: (username: string) => set({ lastUsername: username }),
      // Last played version
      lastPlayedVersion: undefined,
      setLastPlayedVersion: (version: ComboboxItem | null) =>
        set({ lastPlayedVersion: version }),
      // Other
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
