import React, { createContext, useState } from "react";

interface BarConfig {
  actions?: React.ReactNode;
}

const BarContext = createContext<{
  config: BarConfig;
  setConfig: (config: BarConfig) => void;
} | null>(null);

export const BarProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<BarConfig>({});

  return (
    <BarContext.Provider value={{ config, setConfig }}>
      {children}
    </BarContext.Provider>
  );
};
