import { JsonConfigObject } from "./config-json";
import type { ConfigIntent } from "./types";

// biome-ignore lint/complexity/noStaticOnlyClass: ConfigContext is a static registry by design
export class ConfigContext {
  // Store multiple instances keyed by their filename or a custom ID
  private static instances = new Map<string, JsonConfigObject<unknown>>();

  /**
   * Initializes a specific configuration.
   * Use this for each unique config file you have.
   */
  public static initialize<T>(
    intent: ConfigIntent<T>,
    defaultValue: T,
  ): JsonConfigObject<T> {
    if (ConfigContext.instances.has(intent.fileName)) {
      return ConfigContext.instances.get(
        intent.fileName,
      ) as JsonConfigObject<T>;
    }

    const config = JsonConfigObject.create<T>(intent.fileName);
    config.loadOrDefault(defaultValue);

    ConfigContext.instances.set(
      intent.fileName,
      config as JsonConfigObject<unknown>,
    );
    return config;
  }

  /**
   * Retrieves a specific configuration instance by its filename.
   */
  public static use<T>(intent: ConfigIntent<T>): JsonConfigObject<T> {
    const instance = ConfigContext.instances.get(intent.fileName);
    if (!instance) {
      throw new Error(
        `Config [${intent.fileName}] is not initialized. Call initialize() first.`,
      );
    }
    return instance as JsonConfigObject<T>;
  }
}
