//window.ipcRenderer defined in preload
const invokeEvent = (eventName, payload) =>
  window.ipcRenderer.invoke(eventName, payload);
export default {
  invokeEvent,
};
