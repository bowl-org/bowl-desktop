import crypto from "crypto";
const generateKeyPair = () => {
  let keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return {
    privateKey: keyPair.privateKey,
    publicKey: Buffer.from(keyPair.publicKey).toString("base64"),
  };
};
const createPublicKeyFromString = (publicKeyData) => {
  // return toHexString(crypto.createPublicKey(publicKeyData));
  // return crypto.createPublicKey(publicKeyData);
  return publicKeyData;
};
const createPrivateKeyFromString = (privateKeyData) => {
  // return toHexString(crypto.createPrivateKey(privateKeyData));
  // return crypto.createPrivateKey(privateKeyData);
  return privateKeyData;
};
const encryptData = (publicKey, data) => {
  console.log("PEM Public Key", derTopemFormat(publicKey, true));
  return crypto
    .publicEncrypt(
      {
        key: derTopemFormat(publicKey, true),
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data, "utf-8")
    )
    .toString("base64");
};
const decryptData = (privateKey, data) => {
  return crypto
    .privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(data, "base64")
    )
    .toString("utf-8");
};
const derTopemFormat = (derFormattedKey, isPublic) => {
  let keyType = isPublic ? "PUBLIC" : "RSA PRIVATE";
  return (
    `-----BEGIN ${keyType} KEY-----\n` +
    derFormattedKey +
    `\n-----END ${keyType} KEY-----`
  );
};
const generatePublicKeyFromPrivate = (privateKey) => {
  let publicKey = crypto
    .createPublicKey({
      key: privateKey,
      type: "pkcs8",
      format: "pem",
    })
    .export({
      type: "spki",
      format: "der",
    });
  return Buffer.from(publicKey).toString("base64");
};
const generateHash = async(data) => {
  return crypto.createHash('sha1').update(data).digest("base64");
}
export default {
  generateKeyPair,
  createPublicKeyFromString,
  createPrivateKeyFromString,
  encryptData,
  decryptData,
  generatePublicKeyFromPrivate,
  generateHash
};
