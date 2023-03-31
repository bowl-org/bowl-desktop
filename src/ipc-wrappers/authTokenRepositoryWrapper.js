const getToken = async () => {
  return  window.ipcRenderer.invoke("getToken");
};
const setToken = async (tokenData) => {
  return  window.ipcRenderer.invoke("setToken", tokenData);
};

export default {
  getToken,
  setToken
};
