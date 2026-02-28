import { IpcMainInvokeEvent } from "electron";

export type IpcHandlerListener = (
  event: IpcMainInvokeEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any> | any;

export interface IpcHandler {
  listener: IpcHandlerListener;
  channel: string;
}
