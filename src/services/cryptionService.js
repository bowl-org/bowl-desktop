import nodeCryptionWrapper from "@/ipc-wrappers/nodeCryptionWrapper";
const generateKeyPair = async () => {
  return nodeCryptionWrapper.generateKeyPair();
};
const createPublicKeyFromString = async (publicKeyData) => {
  return nodeCryptionWrapper.createPublicKeyFromString(publicKeyData);
};
const createPrivateKeyFromString = async (privateKeyData) => {
  return nodeCryptionWrapper.createPrivateKeyFromString(privateKeyData);
};
const encryptData = async (publicKey, data) => {
  return nodeCryptionWrapper.encryptData(publicKey, data);
};
const decryptData = async (privateKey, data) => {
  return nodeCryptionWrapper.decryptData(privateKey, data);
};
export default {
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
};
