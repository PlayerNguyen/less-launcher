
/**
 * Define at application-level.
 */
export interface ConfigIntent<T> {
  fileName: string;
  id?: string;
  _type?: T;
}