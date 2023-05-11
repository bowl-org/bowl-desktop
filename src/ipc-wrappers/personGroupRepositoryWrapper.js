import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const insertPersonGroup = async (personGroupData) => {
  return ipcRendererHelper.invokeEvent("insertPersonGroup", personGroupData);
};
const deletePersonGroup = async (id) => {
  return ipcRendererHelper.invokeEvent("deletePersonGroup", id);
};
const findPersonGroup = async (id) => {
  return ipcRendererHelper.invokeEvent("findPersonGroup", id);
};
const getPersonGroupsByGroupConversationId = async (groupConversationId) => {
  return ipcRendererHelper.invokeEvent(
    "getPersonGroupsByGroupConversationId",
    groupConversationId
  );
};

export default {
  insertPersonGroup,
  deletePersonGroup,
  findPersonGroup,
  getPersonGroupsByGroupConversationId
};
