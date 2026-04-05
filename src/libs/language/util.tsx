export const STORAGE_KEY = "i18nextLng";
export const DEFAULT_LANGUAGE = "en";

export function getLatestLanguage(): string {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
}

export function setLatestLanguage(value?: string): void {
  localStorage.setItem(STORAGE_KEY, value ?? DEFAULT_LANGUAGE);
}
