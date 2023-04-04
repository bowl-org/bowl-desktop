const insertUser = async(user) => {
  return  window.ipcRenderer.invoke("insertUser", user);
}
const updateUser = async(id, updatedUser) => {
  return  window.ipcRenderer.invoke("insertUser", {id: id, ...updatedUser});
}
const deleteUser = async(id) => {
  return  window.ipcRenderer.invoke("deleteUser", id);
}
const findUser = async(id) => {
  return  window.ipcRenderer.invoke("findUser", id);
}
const findUserByEmail = async(email) => {
  return  window.ipcRenderer.invoke("findUserByEmail", email);
}
const getAllUsers = async() => {
  return  window.ipcRenderer.invoke("getAllUsers");
}
export default {
  insertUser,
  updateUser,
  deleteUser,
  findUser,
  findUserByEmail,
  getAllUsers,
}
