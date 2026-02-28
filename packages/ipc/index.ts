import { IpcHandlerContext } from "./ipc-handler-context";

let ipcHandlerContext: IpcHandlerContext | null;

export function getIpcHandlerContext() {
  if (!ipcHandlerContext) {
    ipcHandlerContext = new IpcHandlerContext();
  }

  return ipcHandlerContext;
}
