import { generateCuid2 } from "@electron/util/cuid-instance";
import { IpcHandler } from "@packages/ipc/types";
import { ProfileItem } from "@packages/profile/config";
import { ProfileGameType } from "@packages/profile/enum";
import { createProfile } from "@packages/profile/service";
import { IpcMainInvokeEvent } from "electron";
import z from "zod/v4";

/**
 * Defines the expected structure and validation rules for creating a new profile.
 * This schema uses Zod to ensure incoming data meets requirements.
 */
const CreateProfileHandlerSchema = z.object({
  name: z.string().min(4).max(32),
  type: z.enum(ProfileGameType),
  version: z.string().min(1),
});

/**
 * Implements the logic for handling the creation of a new user profile
 * via an Inter-Process Communication (IPC) channel.
 */
export class CreateProfileHandler implements IpcHandler {
  channel: string = "app:create-profile";

  async listener(_: IpcMainInvokeEvent, profileItem: ProfileItem) {
    const response = z.safeParse(CreateProfileHandlerSchema, profileItem);

    // If invalid body
    if (!response.success || !response.data) {
      throw response.error;
    }

    const generatedProfileData = {
      ...response.data,
      id: generateCuid2(),
      order: 0,
    };

    createProfile(generatedProfileData);
    return generatedProfileData;
  }
}
