export interface LanguageSection {
  languageCode: string;
  labelText: string;
}

class LanguageRegistry {
  private static instance: LanguageRegistry;
  private sections: Map<string, LanguageSection>;

  private constructor() {
    this.sections = new Map<string, LanguageSection>();
  }

  /**
   * Returns the singleton instance of the registry
   */
  public static getInstance(): LanguageRegistry {
    if (!LanguageRegistry.instance) {
      LanguageRegistry.instance = new LanguageRegistry();
    }
    return LanguageRegistry.instance;
  }

  /**
   * Registers a new language section
   */
  public register(section: LanguageSection): void {
    this.sections.set(section.languageCode, section);
  }

  /**
   * Retrieves a specific section by language code
   */
  public getSection(code: string): LanguageSection | undefined {
    return this.sections.get(code);
  }

  /**
   * Returns all registered sections as an array
   */
  public getAllSections(): LanguageSection[] {
    return Array.from(this.sections.values());
  }
}

export const languageRegistry = LanguageRegistry.getInstance();
