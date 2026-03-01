import { ensureDir, getLauncherConfigPath } from "@packages/fs";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
/**
 *
 */
export abstract class ConfigObject<T> {
  private state?: T;
  private filePath: string;
  public constructor(private fileName: string) {
    this.filePath = path.resolve(getLauncherConfigPath(), this.fileName);
  }

  /**
   * If the file has not been created,
   * load default value to current state and create a file from default value.
   *
   * Otherwise, try to load the file from file record.
   *
   * @param defaultValue the default value for first load
   */
  public loadOrDefault(defaultValue: T) {
    const filePath = this.filePath;

    if (!existsSync(filePath)) {
      this.state = defaultValue;
      // Write a file as default config
      writeFileSync(filePath, this.serialize(this.state), {
        encoding: "utf-8",
      });
      return;
    }

    // Otherwise - load from file to state
    this.state = this.deserialize(
      readFileSync(filePath, { encoding: "utf-8" }),
    );
  }

  /**
   * Retrieves current state of the config.
   *
   * @throws if config is not available or has not been load
   * @returns current state of the config
   */
  public getState(): T {
    if (!this.state) {
      throw new Error(
        "Config state has not been initialized. Call loadOrDefault() first.",
      );
    }
    return this.state;
  }

  /**
   * Updates the current state and persists it to the file system.
   * * @param partialState A partial or full object of T to merge into the current state.
   */
  public set(partialState: Partial<T>): void {
    if (!this.state) {
      throw new Error("Cannot set state before initialization.");
    }

    // Merge the new data with the existing state
    this.state = {
      ...this.state,
      ...partialState,
    };

    this.saveToDisk();
  }

  /**
   * Retrieves a specific value from the configuration state by its key.
   * * @param key The property name of the configuration you want to retrieve.
   * @returns The value associated with the key.
   */
  public get<K extends keyof T>(key: K): T[K] {
    return this.getState()[key];
  }

  /**
   * Internal helper to write current state to disk
   */
  private saveToDisk(): void {
    const filePath = this.filePath;
    ensureDir(path.basename(this.filePath));
    writeFileSync(filePath, this.serialize(this.state as T), {
      encoding: "utf-8",
    });
  }

  public abstract serialize(object: T): string;

  public abstract deserialize(input: string): T;
}
