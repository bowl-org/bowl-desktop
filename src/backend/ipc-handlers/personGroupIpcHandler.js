import { ipcMain } from "electron";
import personGroupRepo from "../repository/personGroupRepository";

ipcMain.handle("insertPersonGroup", async (event, args) => {
  return await personGroupRepo.insertPersonGroup(args);
});
ipcMain.handle("deletePersonGroup", async (event, id) => {
  return await personGroupRepo.deletePersonGroup(id);
});
ipcMain.handle("findPersonGroup", async (event, id) => {
  return await personGroupRepo.findPersonGroup(id);
});
ipcMain.handle(
  "getPersonGroupsByGroupConversationId",
  async (event, groupConversationId) => {
    return await personGroupRepo.getPersonGroupsByGroupConversationId(
      groupConversationId
    );
  }
);
