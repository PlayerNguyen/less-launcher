import { describe, it, expect, vi, afterEach } from "vitest";
import os from "os";
import { getSystemCriteria } from "./helper";

describe("getSystemCriteria", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shouldReturnWindowsCriteriaWhenPlatformIsWin32", () => {
    // Arrange
    vi.stubGlobal("process", { ...process, platform: "win32" });
    vi.spyOn(os, "version").mockReturnValue("10.0.19045");
    vi.spyOn(os, "arch").mockReturnValue("x64");

    // Act
    const result = getSystemCriteria();

    // Assert
    expect(result.os).toBe("windows");
    expect(result.version).toBe("10.0.19045");
    expect(result.arch).toBe("x64");
  });

  it("shouldReturnOsxCriteriaWhenPlatformIsDarwin", () => {
    // Arrange
    vi.stubGlobal("process", { ...process, platform: "darwin" });
    vi.spyOn(os, "version").mockReturnValue("23.0.0");

    // Act
    const result = getSystemCriteria();

    // Assert
    expect(result.os).toBe("osx");
    expect(result.version).toBe("23.0.0");
  });

  it("shouldReturnLinuxCriteriaWhenPlatformIsLinux", () => {
    // Arrange
    vi.stubGlobal("process", { ...process, platform: "linux" });

    // Act
    const result = getSystemCriteria();

    // Assert
    expect(result.os).toBe("linux");
  });

  it("shouldOverrideDefaultsWhenAdditionalCriteriaIsProvided", () => {
    // Arrange
    vi.stubGlobal("process", { ...process, platform: "win32" });
    const additional = {
      is_demo_user: true,
      arch: "x86", // Overriding the mock/system arch
    };

    // Act
    const result = getSystemCriteria(additional);

    // Assert
    expect(result.os).toBe("windows");
    expect(result.is_demo_user).toBe(true);
    expect(result.arch).toBe("x86");
  });

  it("shouldPreserveSystemVersionWhenNotOverridden", () => {
    // Arrange
    const mockVersion = "Special-Kernel-Version";
    vi.spyOn(os, "version").mockReturnValue(mockVersion);

    // Act
    const result = getSystemCriteria({ is_demo_user: false });

    // Assert
    expect(result.version).toBe(mockVersion);
    expect(result.is_demo_user).toBe(false);
  });
});
