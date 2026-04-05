import { useState, useEffect } from "react";

export const useOperatingSystem = () => {
  const [os, setOs] = useState({
    name: "Unknown",
    isWindows: false,
    isMac: false,
    isLinux: false,
  });

  useEffect(() => {
    const platform =
      // @ts-ignore
      navigator.userAgentData?.platform || navigator.platform || "";
    const platformLower = platform.toLowerCase();

    const isWin = platformLower.includes("win");
    const isMac = platformLower.includes("mac");
    const isLinux = platformLower.includes("linux");

    setOs({
      name: isWin ? "Windows" : isMac ? "macOS" : isLinux ? "Linux" : "Unknown",
      isWindows: isWin,
      isMac: isMac,
      isLinux: isLinux,
    });
  }, []);

  return os;
};
