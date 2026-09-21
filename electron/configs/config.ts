import type { ConfigIntent } from "@packages/config";
import type { LauncherMetadata } from "./launcher-metadata";

export const LauncherConfig = {
  Metadata: {
    fileName: "metadata.json",
  } as ConfigIntent<LauncherMetadata>,
} as const;
