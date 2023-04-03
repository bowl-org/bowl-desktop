
const generateKeyPair = async () => {
  return window.ipcRenderer.invoke("generateKeyPair");
};
const createPublicKeyFromString = async (publicKeyData) => {
  return window.ipcRenderer.invoke("createPublickeyFromString", publicKeyData);
};
const createPrivateKeyFromString = async (privateKeyData) => {
  return window.ipcRenderer.invoke(
    "createPrivateKeyFromString",
    privateKeyData
  );
};
const encryptData = async (publicKey, data) => {
  return window.ipcRenderer.invoke("encryptData", [publicKey, data]);
};
const decryptData = async (privateKey, data) => {
  return window.ipcRenderer.invoke("decryptData", [privateKey, data]);
};
export default {
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
};
