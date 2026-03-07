import { ConfigObject } from "./config";

export class JsonConfigObject<T> extends ConfigObject<T> {
  constructor(fileName: string) {
    super(fileName);
  }

  public serialize(object: T): string {
    return JSON.stringify(object, null, 0);
  }

  public deserialize(input: string): T {
    return JSON.parse(input) as T;
  }

  /**
   * Factory method to create a new JsonConfigObject instance.
   */
  public static create<T>(fileName: string): JsonConfigObject<T> {
    return new JsonConfigObject<T>(fileName);
  }
}
