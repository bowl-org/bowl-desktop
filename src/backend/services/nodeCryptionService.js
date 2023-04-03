import crypto from "crypto";
const generateKeyPair = () => {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
};
const createPublicKeyFromString = (publicKeyData) => {
  return crypto.createPublicKey(publicKeyData);
};
const createPrivateKeyFromString = (privateKeyData) => {
  return crypto.createPrivateKey(privateKeyData);
};
const encryptData = (publicKey, data) => {
  return crypto.publicEncrypt(publicKey, Buffer.from(data, 'utf-8'));
};
const decryptData = (privateKey, data) => {
  return crypto.privateDecrypt(privateKey, Buffer.from(data, 'utf-8')).toString('utf-8');
};
export default {
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
};
