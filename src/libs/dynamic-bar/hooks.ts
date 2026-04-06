import { useContext, useCallback, useState, useEffect } from "react";
import { BarConfig, BarContext } from "./context";

/**
 * Hook to access the bar context
 * Must be used within a BarProvider
 */
export function useBarContext() {
  const context = useContext(BarContext);

  if (!context) {
    throw new Error(
      "useBarContext must be used within a BarProvider component",
    );
  }

  return context;
}

/**
 * Hook to update bar configuration
 */
export function useBarConfig() {
  const { config, setConfig } = useBarContext();

  const updateConfig = useCallback(
    (newConfig: Partial<BarConfig>) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        ...newConfig,
      }));
    },
    [setConfig],
  );

  const resetConfig = useCallback(() => {
    setConfig({});
  }, [setConfig]);

  return {
    config,
    updateConfig,
    resetConfig,
  };
}

/**
 * Hook to manage bar visibility state
 */
export function useBarVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}

/**
 * Hook to manage loading state for the bar
 */
export function useBarLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  const withLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      startLoading();
      try {
        return await promise;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}

/**
 * Hook to set bar actions dynamically
 */
export function useBarActions() {
  const { updateConfig } = useBarConfig();

  const setActions = useCallback(
    (actions: React.ReactNode) => {
      updateConfig({ actions });
    },
    [updateConfig],
  );

  const clearActions = useCallback(() => {
    updateConfig({ actions: undefined });
  }, [updateConfig]);

  return {
    setActions,
    clearActions,
  };
}

/**
 * Hook to set bar actions for the current page/component
 * Automatically clears actions on unmount
 *
 * @param actions - The content to display in the bar
 *
 * @example
 * export function HomePage() {
 *   usePageAction("Home");
 *   return <div>Home content</div>;
 * }
 */
export function usePageAction(actions: React.ReactNode) {
  const { setActions, clearActions } = useBarActions();

  useEffect(() => {
    setActions(actions);
    return () => {
      clearActions();
    };
  }, [actions, setActions, clearActions]);
}
