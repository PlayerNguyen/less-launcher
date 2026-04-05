import { ConfigIntent } from "@packages/config";
import { ProfileGameType } from "./enum";

/**
 * Define the profile item
 */
export interface ProfileItem {
  id: string;
  name: string;
  type: ProfileGameType;
  version: string;
  order: number;
}

export class LauncherProfile {
  items: ProfileItem[] = [];
}

/**
 * Define the primary config file
 * for the application
 */
export const ProfileConfigIntent = {
  fileName: "profile.json",
} as ConfigIntent<LauncherProfile>;
