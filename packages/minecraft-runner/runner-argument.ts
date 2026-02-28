import { Version } from "@packages/minecraft-version-resolver";
import path from "path";
import { Argument, RunnerArgumentBuildOptions } from "./types";
import {
  ConditionalArgument,
  Criteria,
} from "@packages/minecraft-manifest-rules/types";
import { pickValue } from "@packages/minecraft-manifest-rules/resolver";

export class RunnerArgument implements Argument {
  runtimeDirectory: string = "";
  auth: {
    username: string;
    uuid?: string;
    accessToken?: string;
    userType: "mojang" | "msa";
  } = {
    username: "",
    userType: "mojang",
  };
  version: {
    id: string;
    type: string;
    assets: string;
  } = {
    id: "",
    type: "",
    assets: "",
  };
  paths: {
    gameDir: string;
    assetsDir: string;
    nativesDir: string;
    jarPath: string;
    libraries: string[];
  } = {
    gameDir: "",
    assetsDir: "",
    nativesDir: "",
    jarPath: "",
    libraries: [],
  };
  jvm: {
    minMemory: string;
    maxMemory: string;
    launcherName: string;
    launcherVersion: string;
    additionalArgs?: string[];
  } = {
    minMemory: "1G",
    maxMemory: "2G",
    launcherName: "less-launcher",
    launcherVersion: "1.0.0",
    additionalArgs: [],
  };
  window?: {
    width: number;
    height: number;
    fullscreen: boolean;
  };

  public build(
    versionDetail: Version,
    criteria: Criteria,
    options: RunnerArgumentBuildOptions = {
      offlineMode: false,
      quickPlay: {
        enabled: false,
      },
    },
  ): string[] {
    const args: string[] = [];

    // 1. Memory Setup (Standard JVM args usually prefixed)
    args.push(`-Xms${this.jvm.minMemory}`);
    args.push(`-Xmx${this.jvm.maxMemory}`);

    // 2. Process JVM Arguments from Manifest
    if (versionDetail.arguments?.jvm) {
      for (const entry of versionDetail.arguments.jvm) {
        this.processArgumentEntry(entry, criteria, args);
      }
    }

    // 3. Main Class
    args.push(versionDetail.mainClass || "net.minecraft.client.main.Main");

    // 4. Process Game Arguments from Manifest
    if (versionDetail.arguments?.game) {
      for (const entry of versionDetail.arguments.game) {
        this.processArgumentEntry(entry, criteria, args);
      }
    }

    // 5. Replace placeholders and return
    return (
      args
        // Flter if using offline mode
        .filter((arg) =>
          options?.offlineMode ? !this.filterOfflineMode(arg) : true,
        )
        .filter((arg) =>
          !options?.quickPlay.enabled ? !this.filterQuickPlay(arg) : true,
        )
        .map((arg) => this.replacePlaceholders(arg))
    );
  }

  private filterOfflineMode(input: string) {
    const fields = ["--uuid", "${auth_uuid}", "--xuid", "${auth_xuid}"];
    for (const field of fields) {
      if (input.includes(field)) {
        return true;
      }
    }
    return false;
  }

  private filterQuickPlay(input: string) {
    const fields = [
      "--quickPlayPath",
      "${quickPlayPath}",
      "--quickPlaySingleplayer",
      "${quickPlaySingleplayer}",
      "--quickPlayMultiplayer",
      "${quickPlayMultiplayer}",
      "--quickPlayRealms",
      "${quickPlayRealms}",
    ];
    for (const field of fields) {
      if (input.includes(field)) {
        return true;
      }
    }
    return false;
  }

  private processArgumentEntry(
    entry: string | ConditionalArgument,
    criteria: Criteria,
    output: string[],
  ) {
    if (typeof entry === "string") {
      output.push(entry);
    } else {
      const picked = pickValue(entry, criteria);
      if (picked) {
        if (Array.isArray(picked)) {
          output.push(...picked);
        } else {
          output.push(picked);
        }
      }
    }
  }

  private replacePlaceholders(template: string): string {
    const fullClassPath = [...this.paths.libraries, this.paths.jarPath].join(
      path.delimiter,
    );

    const map: Record<string, string> = {
      "${auth_player_name}": this.auth.username,
      "${version_name}": this.version.id,
      "${game_directory}": this.paths.gameDir,
      "${assets_root}": this.paths.assetsDir,
      "${assets_index_name}": this.version.assets,
      "${auth_uuid}": this.auth.uuid || "",
      "${auth_access_token}": this.auth.accessToken || "",
      "${user_type}": this.auth.userType,
      "${version_type}": this.version.type,
      "${natives_directory}": this.paths.nativesDir,
      "${launcher_name}": this.jvm.launcherName,
      "${launcher_version}": this.jvm.launcherVersion,
      "${classpath}": fullClassPath,
      // Add more as needed based on manifest
    };

    return template.replace(/\${[^}]+}/g, (match) => map[match] || match);
  }
}
