import { ConfigIntent } from "@packages/config";

export class RuntimeConfig {
  /**
   * Defines the latest runtime version that
   * system is retrieved.
   */
  latestRuntimeVersion?: string = undefined;
}

export const RuntimeConfigIntent = {
  fileName: "runtime.json",
} as ConfigIntent<RuntimeConfig>;
