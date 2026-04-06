import React, { createContext, useState } from "react";

export interface BarConfig {
  actions?: React.ReactNode;
}

export const BarContext = createContext<{
  config: BarConfig;
  setConfig: (config: BarConfig | ((prev: BarConfig) => BarConfig)) => void;
} | null>(null);

export const BarProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<BarConfig>({});

  return (
    <BarContext.Provider value={{ config, setConfig }}>
      {children}
    </BarContext.Provider>
  );
};
