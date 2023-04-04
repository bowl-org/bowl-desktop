const getToken = async () => {
  return  window.ipcRenderer.invoke("getToken");
};
const setToken = async (tokenData) => {
  return  window.ipcRenderer.invoke("setToken", tokenData);
};
const deleteToken = async () => {
  return  window.ipcRenderer.invoke("deleteToken");
};

export default {
  getToken,
  setToken,
  deleteToken
};
