import { IpcHandler } from "@packages/ipc/types";
import { getProfiles } from "@packages/profile";

export class GetProfilesHandler implements IpcHandler {
  channel: string = "app:get-profiles";

  async listener() {
    return getProfiles();
  }
}
