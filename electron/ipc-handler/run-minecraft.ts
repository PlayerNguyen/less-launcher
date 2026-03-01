import { IpcHandler } from "@packages/ipc/types";
import { runMinecraft } from "@packages/minecraft-runner/runner";
import { SettingsState } from "@src/stores/settings.store";
import { BrowserWindow, IpcMainInvokeEvent } from "electron";

export class RunMinecraftHandler implements IpcHandler {
  channel: string = "app:run-minecraft";

  public constructor(public browserWindow: BrowserWindow) {}

  listener = (_: IpcMainInvokeEvent, settings: SettingsState) => {
    console.log(`Trigger run minecraft game`);
    const { lastPlayedVersion, lastUsername } = settings;
    console.log(
      `Starting Minecraft ${lastPlayedVersion} with username ${lastUsername}`,
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
