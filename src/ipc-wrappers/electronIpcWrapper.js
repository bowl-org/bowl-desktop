const closeApp = async () => {
  return window.ipcRenderer.invoke("closeApp");
};

export default{
  closeApp
}
