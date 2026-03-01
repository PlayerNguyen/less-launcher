import { ConfigIntent } from "@packages/config";
import { LauncherMetadata } from "./launcher-metadata";

export const LauncherConfig = {
  Metadata: {
    fileName: "metadata.json",
  } as ConfigIntent<LauncherMetadata>,
} as const;
