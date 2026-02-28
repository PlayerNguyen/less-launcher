export interface ArgumentAuth {
  username: string;
  uuid?: string;
  accessToken?: string;
  userType: "mojang" | "msa";
}

export interface ArgumentWindow {
  width: number;
  height: number;
  fullscreen: boolean;
}

export interface Argument {
  // Runtime entry point
  runtimeDirectory: string;

  // Authentication & Identity
  auth: ArgumentAuth;

  // Version Information
  version: {
    id: string; // e.g., "1.17.1"
    type: string; // e.g., "release"
    assets: string; // The asset index ID
  };

  // Paths (Must be Absolute)
  paths: {
    gameDir: string; // .minecraft folder
    assetsDir: string; // .minecraft/assets
    nativesDir: string; // extracted natives folder
    jarPath: string; // path to the version jar
    libraries: string[]; // List of absolute paths to all required library jars
  };

  // Performance & JVM
  jvm: {
    minMemory: string; // e.g., "1G"
    maxMemory: string; // e.g., "2G"
    launcherName: string;
    launcherVersion: string;
    additionalArgs?: string[]; // Custom flags like -XX:+UseG1GC
  };

  // Environment
  window?: ArgumentWindow;
}

export type QuickPlayOptions = {
  enabled: boolean;
};

export type RunnerArgumentBuildOptions = {
  offlineMode?: boolean;
  quickPlay: QuickPlayOptions;
};
