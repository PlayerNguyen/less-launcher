import { Generator } from "./core";

export class ProfileNameGenerator implements Generator {
  public constructor(public suggestedName: string[]) {}

  public generate<T>(_?: T): string {
    if (this.suggestedName.length === 0) {
      return "";
    }

    const randomIndex = Math.floor(Math.random() * this.suggestedName.length);
    return this.suggestedName[randomIndex];
  }
}
