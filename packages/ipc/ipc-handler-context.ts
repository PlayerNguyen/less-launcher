import { ipcMain } from "electron";
import { IpcHandler } from "./types";

export class IpcHandlerContext {
  private handlers: Map<string, IpcHandler> = new Map();

  registerHandler(handler: IpcHandler) {
    this.handlers.set(handler.channel, handler);
  }

  unregisterHandler(handler: IpcHandler) {
    this.handlers.delete(handler.channel);
  }

  unregisterAllHandlers() {
    this.handlers.clear();
  }

  getHandler(channel: string) {
    return this.handlers.get(channel);
  }

  async loadAllHandlers() {
    for (const handler of this.handlers.values()) {
      ipcMain.handle(handler.channel, await handler.listener);
    }
  }

  unloadAllHandlers() {
    ipcMain.removeAllListeners();
  }

  size() {
    return this.handlers.size;
  }
}
