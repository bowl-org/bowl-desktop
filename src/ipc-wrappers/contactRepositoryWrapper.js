import ipcRendererHelper from "@/helpers/ipcRendererHelper";
const insertContact = async (contactData) => {
  return ipcRendererHelper.invokeEvent("insertContact", contactData);
};
const updateContact = async (contactData) => {
  return ipcRendererHelper.invokeEvent("updateContact", contactData);
};
const deleteContact = async (contactData) => {
  return ipcRendererHelper.invokeEvent("deleteContact", contactData);
};
const findContact = async (contactData) => {
  return ipcRendererHelper.invokeEvent("findContact", contactData);
};
const findContactByEmail = async (email) => {
  return ipcRendererHelper.invokeEvent("findContactByEmail", email);
};
const findContactByPersonId = async (personId) => {
  return ipcRendererHelper.invokeEvent("findContactByPersonId", personId);
};
const getAllContacts = async () => {
  return ipcRendererHelper.invokeEvent("getAllContacts");
};

export default {
  insertContact,
  updateContact,
  deleteContact,
  findContact,
  findContactByEmail,
  findContactByPersonId,
  getAllContacts,
};
