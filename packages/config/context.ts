import { JsonConfigObject } from "./config-json";
import { ConfigIntent } from "./types";

export class ConfigContext {
  // Store multiple instances keyed by their filename or a custom ID
  private static instances = new Map<string, JsonConfigObject<any>>();

  /**
   * Initializes a specific configuration.
   * Use this for each unique config file you have.
   */
  public static initialize<T>(
    intent: ConfigIntent<T>,
    defaultValue: T,
  ): JsonConfigObject<T> {
    if (this.instances.has(intent.fileName)) {
      return this.instances.get(intent.fileName) as JsonConfigObject<T>;
    }

    const config = JsonConfigObject.create<T>(intent.fileName);
    config.loadOrDefault(defaultValue);

    this.instances.set(intent.fileName, config);
    return config;
  }

  /**
   * Retrieves a specific configuration instance by its filename.
   */
  public static use<T>(intent: ConfigIntent<T>): JsonConfigObject<T> {
    const instance = this.instances.get(intent.fileName);
    if (!instance) {
      throw new Error(
        `Config [${intent.fileName}] is not initialized. Call initialize() first.`,
      );
    }
    return instance as JsonConfigObject<T>;
  }
}
