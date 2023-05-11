import { app, ipcMain } from "electron";
import "./ipc-handlers/userIpcHandler"
import "./ipc-handlers/authTokenIpcHandler"
import "./ipc-handlers/nodeCryptionIpcHandler"
import "./ipc-handlers/contactRequestNotificationIpcHandler"
import "./ipc-handlers/groupRequestNotificationIpcHandler"
import "./ipc-handlers/contactMessageIpcHandler"
import "./ipc-handlers/groupMessageIpcHandler"
import "./ipc-handlers/contactConversationIpcHandler"
import "./ipc-handlers/groupConversationIpcHandler"
import "./ipc-handlers/hashTableIpcHandler"
import "./ipc-handlers/personGroupIpcHandler"
import "./ipc-handlers/personIpcHandler"

ipcMain.handle("closeApp", async () => {
  return app.quit();
});

