import { app, ipcMain } from "electron";
import "./ipc-handlers/userIpcHandler"
import "./ipc-handlers/messageIpcHandler"
import "./ipc-handlers/authTokenIpcHandler"
import "./ipc-handlers/nodeCryptionIpcHandler"
import "./ipc-handlers/contactRequestNotificationIpcHandler"
import "./ipc-handlers/groupRequestNotificationIpcHandler"
import "./ipc-handlers/contactIpcHandler"
import "./ipc-handlers/contactConversationIpcHandler"

ipcMain.handle("closeApp", async () => {
  return app.quit();
});

