import { ConfigContext } from "@packages/config";
import { ProfileConfigIntent, ProfileItem } from "./config";
import { ProfileGameType } from "./enum";
import log from "electron-log";

/**
 * Retrieves all profiles that the user has created.
 * @returns An array of {@link ProfileItem} objects representing the stored profiles.
 */
export function getProfiles(): ProfileItem[] {
  const profileConfig = ConfigContext.use(ProfileConfigIntent);
  const items = profileConfig.get("items");

  return items;
}

/**
 * Creates a new profile and appends it to the existing profile list.
 * @param profileItem - The profile object to be added to the configuration.
 */
export function createProfile(profileItem: ProfileItem) {
  const profileConfig = ConfigContext.use(ProfileConfigIntent);
  const appendedList = [...getProfiles(), profileItem];
  profileConfig.set({
    items: appendedList,
  });
  log.info(`Successfully created a new game profile: ${profileItem.id}`);
}

/**
 * Removes a specific profile from the configuration based on its unique identifier.
 * @param id - The unique ID of the profile to be removed.
 */
export function removeProfile(id: string) {
  const profileConfig = ConfigContext.use(ProfileConfigIntent);
  const currentProfileList = [...getProfiles()];
  const updatedProfileList = currentProfileList.filter(
    (profile) => profile.id != id,
  );
  profileConfig.set({
    items: updatedProfileList,
  });
}

/**
 * Returns a list of game types that are currently supported for profiles.
 * @returns An array of {@link ProfileGameType} containing the supported identifiers.
 */
export function supportedProfileGameType(): ProfileGameType[] {
  return Object.values(ProfileGameType);
}
