import { IpcHandler } from "@packages/ipc/types";
import { runMinecraft } from "@packages/minecraft-runner/runner";
import { SettingsState } from "@src/stores/settings.store";
import { BrowserWindow, IpcMainInvokeEvent } from "electron";
import log from "electron-log/main";
export class RunMinecraftHandler implements IpcHandler {
  channel: string = "app:run-minecraft";

  public constructor(public browserWindow: BrowserWindow) {}

  listener = (_: IpcMainInvokeEvent, settings: SettingsState) => {
    log.info(`Trigger run minecraft game via RunMinecraftHandler`);
    const { lastPlayedVersion, lastUsername } = settings;
    log.info(
      `Starting Minecraft ${lastPlayedVersion?.value} with username ${lastUsername}`,
    );

    // Start from service
    if (!lastPlayedVersion) {
      throw new Error(
        `Unable to get last played version: ${lastPlayedVersion}`,
      );
    }

    if (!lastUsername) {
      throw new Error(`Username must be filled to start minecraft`);
    }

    runMinecraft(
      lastPlayedVersion?.value,
      { type: "offline", username: lastUsername },
      this.browserWindow,
    );
  };
}
