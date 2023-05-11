import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const insertPerson = async (personData) => {
  return ipcRendererHelper.invokeEvent("insertPerson", personData);
};
const updatePerson = async (personData) => {
  return ipcRendererHelper.invokeEvent("updatePerson", personData);
};
const deletePerson = async (id) => {
  return ipcRendererHelper.invokeEvent("deletePerson", id);
};
const findPerson = async (id) => {
  return ipcRendererHelper.invokeEvent("findPerson", id);
};
const findPersonByEmail = async (email) => {
  return ipcRendererHelper.invokeEvent("findPersonByEmail", email);
};
const getAllPersons = async () => {
  return ipcRendererHelper.invokeEvent("getAllPersons");
};

export default {
  insertPerson,
  updatePerson,
  deletePerson,
  findPerson,
  findPersonByEmail,
  getAllPersons,
};
