import ipcRendererHelper from "@/helpers/ipcRendererHelper";
const generateKeyPair = async () => {
  return ipcRendererHelper.invokeEvent("generateKeyPair");
};
const createPublicKeyFromString = async (publicKeyData) => {
  return ipcRendererHelper.invokeEvent(
    "createPublickeyFromString",
    publicKeyData
  );
};
const createPrivateKeyFromString = async (privateKeyData) => {
  return ipcRendererHelper.invokeEvent(
    "createPrivateKeyFromString",
    privateKeyData
  );
};
const encryptData = async (publicKey, data) => {
  return ipcRendererHelper.invokeEvent("encryptData", [publicKey, data]);
};
const decryptData = async (privateKey, data) => {
  return ipcRendererHelper.invokeEvent("decryptData", [privateKey, data]);
};
const generatePublicKeyFromPrivate = async (privateKey) => {
  return ipcRendererHelper.invokeEvent(
    "generatePublicKeyFromPrivate",
    privateKey
  );
};
const generateHash = async (data) => {
  return ipcRendererHelper.invokeEvent("generateHash", data);
};
export default {
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
  generatePublicKeyFromPrivate,
  generateHash
};
