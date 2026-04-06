import useProfileStore from "@src/stores/ProfileStore";
import { useEffect } from "react";
import { SplashCreateProfileScreen } from "./SplashCreateProfile";
import { usePageAction } from "@src/libs/dynamic-bar/hooks";

export default function Home() {
  const { profiles, loadProfiles } = useProfileStore();

  usePageAction("Home");

  useEffect(() => {
    if (!profiles.data) {
      loadProfiles();
    }
  }, [loadProfiles, profiles.data]);

  // Display that no profile found
  if (profiles && (!profiles.data || profiles.data.length == 0)) {
    return <SplashCreateProfileScreen />;
  }

  return <>{JSON.stringify(profiles.data)}</>;
}
