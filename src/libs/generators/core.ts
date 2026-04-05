export interface Generator {
  /**
   * Generates the random data from provided generator
   *
   * @param input any input, can be undefined
   * @returns output
   */
  generate: <T>(input?: T) => string;
}
