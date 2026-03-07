import {
  downloadResources,
  findVersionInfo,
  getVersionDetails,
  resolveResources,
  Version,
} from "@packages/minecraft-version-resolver";
import { getMinecraftDirectory, getVersionPath } from "@packages/fs";
import { setupJavaRuntime } from "@packages/runtime";
import { ArgumentBuilder } from "./arg-helper";
import { spawn } from "child_process";
import path from "path";
import { RunnerArgument } from "./runner-argument";
import { BrowserWindow } from "electron";
import { getSystemCriteria } from "@packages/minecraft-manifest-rules/helper";
import { getAdoptiumExecutePath } from "@packages/runtime/adoptium";
import { ArgumentAuth, MinecraftRunOptions } from "./types";

async function getVersionInfo(versionId: string) {
  const versionInfo = await findVersionInfo(versionId);
  if (!versionInfo) {
    throw new Error(`Version ${versionId} not found in manifest.`);
  }
  return versionInfo;
}

export async function prepareResource(versionDetail: Version) {
  const resources = await resolveResources(versionDetail);
  await downloadResources(resources, getMinecraftDirectory(), {});
  return resources;
}

export async function prepareRuntime(versionDetail: Version) {
  const javaVersion = versionDetail.javaVersion;

  if (!javaVersion) {
    throw new Error(
      "Unimplemented: fallback java runtime version if client.json not found",
    );
  }

  return await setupJavaRuntime(javaVersion.majorVersion, (message) => {
    console.log(message);
  });
}

async function covertAuthArgument(options: MinecraftRunOptions) {
  let userAuthProfile: ArgumentAuth;
  if (options.type === "offline") {
    userAuthProfile = { username: options.username, userType: "mojang" };
  } else {
    throw new Error(
      `Unsupported options to build user profile: type=${options.type}`,
    );
  }

  return userAuthProfile;
}

export async function runMinecraft(
  versionId: string,
  options: MinecraftRunOptions,
  window?: BrowserWindow,
) {
  const versionInfo = await getVersionInfo(versionId);
  const versionDetail = await getVersionDetails(versionInfo);

  const resources = await prepareResource(versionDetail);
  console.log(`Resolved ${resources.length} resources for ${versionId}`);
  const targetedRuntime = await prepareRuntime(versionDetail);
  console.log(targetedRuntime);

  const authProfile = await covertAuthArgument(options);

  const argumentBuilder = new ArgumentBuilder()
    .withRuntimeDirectory(targetedRuntime)
    .withVersion(versionDetail)
    .withGameDir(path.resolve(getMinecraftDirectory()))
    .withAuth(authProfile);

  const runnerArgument: RunnerArgument = argumentBuilder.buildArgument();
  console.log(
    `Running game with directory: ${runnerArgument.runtimeDirectory}`,
  );
  const javaPath = await getAdoptiumExecutePath(
    runnerArgument.runtimeDirectory,
  );

  const rawArgs = runnerArgument.build(versionDetail, getSystemCriteria(), {
    offlineMode: true,
    quickPlay: {
      enabled: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log({ rawArgs });
    console.log({ javaPath });
  }

  const child = spawn(javaPath, rawArgs, {
    stdio: "pipe",
    // IMPORTANT: Minecraft usually needs the run directory specified.
    cwd: runnerArgument.paths.gameDir,
  });

  if (child) {
    // Capture standard output
    child.stdout.on("data", (data) => {
      // .toString() converts the raw Buffer into readable text
      console.log(`stdout: ${data.toString()}`);
    });

    // Capture standard error (Crucial for Minecraft logs)
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    // Catch immediate spawning errors (e.g., bad Java path)
    child.on("error", (error) => {
      console.error(`Process error: ${error.message}`);
    });

    // See exactly when and how the game exits
    child.on("close", (code) => {
      console.log(`Minecraft exited with code ${code}`);
      // Focus to the current window
      window?.focus();
    });
  }
}
