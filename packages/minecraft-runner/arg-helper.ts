import { getMinecraftDirectory, getVersionPath } from "@packages/fs";
import * as path from "path";
import * as fs from "fs";
import { RunnerArgument } from "./runner-argument";
import { ArgumentAuth } from "./types";
import { Version } from "@packages/minecraft-version-resolver";

export class ArgumentBuilder {
  private argument: RunnerArgument = new RunnerArgument();

  public withRuntimeDirectory(runtimeDirectory: string): ArgumentBuilder {
    this.argument.runtimeDirectory = runtimeDirectory;
    return this;
  }

  /**
   * @deprecated use withVersion instead
   */
  public withVersionId(versionId: string): ArgumentBuilder {
    this.argument.version.id = versionId;
    // append the data
    this.argument.paths.assetsDir = path.resolve(
      getVersionPath(versionId),
      "assets",
    );
    this.argument.paths.jarPath = path.resolve(
      getVersionPath(versionId),
      `versions`,
      versionId,
      `${versionId}.jar`,
    );

    this.argument.paths.nativesDir = path.resolve(
      getVersionPath(versionId),
      "natives",
    );

    this.buildLibraries(versionId);

    return this;
  }

  public withVersion(version: Version) {
    const versionId = version.id;
    this.argument.version.id = versionId;
    this.argument.paths.assetsDir = path.resolve(
      getMinecraftDirectory(),
      "assets",
    );
    this.argument.paths.jarPath = path.resolve(
      getMinecraftDirectory(),
      `versions`,
      versionId,
      `${versionId}.jar`,
    );

    this.argument.paths.nativesDir = path.resolve(
      getMinecraftDirectory(),
      "natives",
    );

    this.argument.version.assets = version.assets || "";

    this.buildLibraries(versionId);

    return this;
  }

  public withGameDir(gameDir: string): ArgumentBuilder {
    this.argument.paths.gameDir = gameDir;
    return this;
  }

  public withAuth(auth: ArgumentAuth): ArgumentBuilder {
    this.argument.auth = auth;
    return this;
  }

  private buildLibraries(versionId: string) {
    const librariesDir = path.resolve(getMinecraftDirectory(), "libraries");
    const stack = [];
    stack.push(librariesDir);

    while (stack.length > 0) {
      const currentDir = stack.pop();

      if (!currentDir) {
        continue;
      }

      const files = fs.readdirSync(currentDir);
      for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          stack.push(filePath);
        } else {
          this.argument.paths.libraries.push(filePath);
        }
      }
    }
  }

  public buildArgument() {
    return this.argument;
  }
}
