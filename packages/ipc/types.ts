import { IpcMainInvokeEvent } from "electron";

export type IpcHandlerListener = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<any> | any;

export interface IpcHandler {
  listener: IpcHandlerListener;
  channel: string;
}
