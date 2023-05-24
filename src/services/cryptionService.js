import nodeCryptionWrapper from "@/ipc-wrappers/nodeCryptionWrapper";
const decryptSym = async (key, encrypted) => {
  return nodeCryptionWrapper.decryptSym(key, encrypted);
};
const encryptSym = async (key, data) => {
  return nodeCryptionWrapper.encryptSym(key, data);
};
const generateKey = async () => {
  return nodeCryptionWrapper.generateKey();
};
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
const testKeypair = async (privateKey, publicKey) => {
  try {
    let testData = "This is test";
    let encrypted = await encryptData(publicKey, testData);
    if (testData != (await decryptData(privateKey, encrypted))) {
      throw new Error("Decryption fault!");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Invalid keypair!");
  }
};
const generatePublicKeyFromPrivate = async (privateKey) => {
  return nodeCryptionWrapper.generatePublicKeyFromPrivate(privateKey);
};
const generateHash = async(data) => {
  return nodeCryptionWrapper.generateHash(data);
}
export default {
  generateKey,
  decryptSym,
  encryptSym,
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
  testKeypair,
  generatePublicKeyFromPrivate,
  generateHash
};
