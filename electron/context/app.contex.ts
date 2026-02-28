/**
 * Stores simple context of the
 * launcher
 */
export class AppContext {
  private static instance: AppContext;

  private constructor() {}

  public static getInstance(): AppContext {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }
}
