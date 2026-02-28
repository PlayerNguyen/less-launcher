import {
  Arch,
  ConditionalArgument,
  OperatingSystem,
} from "../minecraft-manifest-rules/types";

export interface VersionManifest {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: VersionInfo[];
}

export interface VersionInfo {
  id: string;
  type: "release" | "snapshot" | "old_beta" | "old_alpha" | string;
  url: string;
  time: string;
  releaseTime: string;
  sha1?: string;
  complianceLevel?: number;
}

// ---------------------------------------------------------
// Download & Resource Types
// ---------------------------------------------------------

export interface Download {
  sha1: string;
  size: number;
  url: string;
}

// Extends Download specifically for libraries which include a local storage path
export interface Artifact extends Download {
  path: string;
}

export interface ResolvedResource {
  url: string;
  path: string;
  sha1: string;
  size?: number;
}

// ---------------------------------------------------------
// Rules & Arguments
// ---------------------------------------------------------
export type TargetOS = OperatingSystem;

export interface OSRule {
  name?: TargetOS;
  version?: string;
  arch?: Arch;
}

export interface FeatureRule {
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
  [key: string]: boolean | undefined;
}

export interface Rule {
  action: "allow" | "disallow";
  os?: OSRule;
  features?: FeatureRule;
}

export type Argument = string | ConditionalArgument;

export interface Arguments {
  game: Argument[];
  jvm: Argument[];
}

// ---------------------------------------------------------
// Libraries & Assets
// ---------------------------------------------------------

export interface LibraryDownloads {
  artifact?: Artifact;
  classifiers?: Record<string, Artifact>;
}

export interface Library {
  name: string;
  downloads?: LibraryDownloads;
  rules?: Rule[];
  // Uses Record to account for dynamic native classifiers (e.g., "natives-linux", "natives-macos")
  natives?: Record<string, string>;
  extract?: {
    exclude: string[];
  };
  url?: string;
}

// Represents the metadata pointer inside the Version client.json
export interface AssetIndexMetadata {
  id: string;
  sha1: string;
  size: number;
  totalSize: number;
  url: string;
}

// Represents the actual content of the downloaded asset index .json file
export interface AssetIndex {
  objects: Record<
    string,
    {
      hash: string;
      size: number;
    }
  >;
}

// ---------------------------------------------------------
// Core Version Type
// ---------------------------------------------------------

export interface VersionDownloads {
  client: Download;
  server?: Download;
  client_mappings?: Download;
  server_mappings?: Download;
}

export interface Version {
  id: string;
  type?: "release" | "snapshot" | "old_beta" | "old_alpha" | string;
  time?: string;
  releaseTime?: string;
  mainClass: string;
  minimumLauncherVersion?: number;
  assets?: string;
  assetIndex?: AssetIndexMetadata;
  complianceLevel?: number;
  downloads: VersionDownloads;
  libraries: Library[];
  arguments?: Arguments;
  minecraftArguments?: string;
  javaVersion?: {
    component: string;
    majorVersion: number;
  };
  logging?: {
    client: {
      argument: string;
      type: string;
      file: Download & { id: string };
    };
  };
}
