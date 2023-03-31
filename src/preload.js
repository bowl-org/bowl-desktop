import { contextBridge, ipcRenderer } from "electron";

//Use ipcRenderer without  enabling node integration
contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
    //ipc main functions
    //let validChannels = [
      //"findMessage",
      //"deleteMessage",
      //"updateMessage",
      //"getAllMessages",
      //"insertMessage",
      //"getToken",
      //"setToken"
    //];
    ////invoke if given channel exists in main
    //if (validChannels.includes(channel)) {
      //return ipcRenderer.invoke(channel, data);
    //}else{
      //return new Error(channel, " not exists in preload.js!");
    //}
  },
});
