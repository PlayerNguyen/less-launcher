/**
 * Represents a wrapped state for asynchronous data fetching.
 * Use this to track the lifecycle of a resource.
 * * @template T The type of the data being loaded.
 */
export type Loadable<T> = {
  /** The fetched resource. Remains `undefined` until a successful execution. */
  data: T | undefined;

  /** Indicates if a promise is currently pending. */
  isLoading: boolean;

  /** Contains the error object if the last execution failed; otherwise null. */
  error: Error | null;
};

/**
 * Initial a state Async wrap state
 */
export const initialLoadable = <T,>(initialData?: T): Loadable<T> => ({
  data: initialData,
  isLoading: false,
  error: null,
});

/**
 * A generic helper to execute async logic for a specific store key.
 * This replaces both createAsyncAction and createLoadableAction.
 */
export const createLoadableAction = <S, T>(
  set: (fn: (state: S) => Partial<S>) => void,
  key: keyof S,
) => {
  return async (promise: Promise<T>) => {
    // 1. Start Loading
    set(
      (state) =>
        ({
          [key]: {
            ...(state[key] as Loadable<T>),
            isLoading: true,
            error: null,
          },
        }) as Partial<S>,
    );

    try {
      // 2. Handle Success
      const data = await promise;
      set(
        () =>
          ({
            [key]: { data, isLoading: false, error: null },
          }) as Partial<S>,
      );
    } catch (error) {
      // 3. Handle Failure
      set(
        () =>
          ({
            [key]: { data: undefined, isLoading: false, error: error as Error },
          }) as Partial<S>,
      );
    }
  };
};

/**
 * @template S - The Store interface
 * @template T - The return type from IPC
 * @template Args - A tuple/array of argument types for the IPC call
 */
export const createIpcAction = <S, T, Args extends any[] = []>(
  set: (fn: (state: S) => Partial<S>) => void,
  key: keyof S,
  channel: string,
) => {
  const execute = createLoadableAction<S, T>(set, key);

  // Returns a function that accepts the defined Args
  return (...args: Args) => {
    return execute(window.ipcRenderer.invoke(channel, ...args));
  };
};
