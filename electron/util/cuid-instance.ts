import { init } from "@paralleldrive/cuid2";

/**
 * @constant {number} DEFAULT_ID_LENGTH - The desired length of the generated CUID2 identifier.
 */
const DEFAULT_ID_LENGTH = 12;

/**
 * @constant {function(): number} RANDOM_GENERATOR - The function used for generating random numbers
 * when initializing CUID2. Using Math.random for simplicity in this example.
 */
const RANDOM_GENERATOR = Math.random;

/**
 * Initializes and exports the CUID2 generator with controlled configuration.
 * @type {typeof init}
 * @readonly
 * @const
 */
const generateCuid2 = init({
  // Use the defined random generator
  random: RANDOM_GENERATOR,
  // Use the defined ID length
  length: DEFAULT_ID_LENGTH,
});

export { generateCuid2 };
