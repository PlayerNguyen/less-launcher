import { Criteria, OperatingSystem } from "./types";
import os from "os";

function getTargetOS(): OperatingSystem {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "osx";
  return "linux";
}

export function getSystemCriteria(
  additionalCriteria?: Partial<Criteria>,
): Criteria {
  return {
    os: getTargetOS(),
    version: os.version(),
    arch: os.arch(),
    ...additionalCriteria,
  };
}
