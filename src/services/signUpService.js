import * as apiService from "@/services/apiService";
import cryptionService from "@/services/cryptionService";
import userService from "./userService";

const signUpPath = "/signup";

const signUp = async (userData) => {
  const keyPair = await cryptionService.generateKeyPair();
  userData.public_key = keyPair.publicKey;
  let res = await apiService.POST(signUpPath, userData);
  const newUser = {
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    ...userData,
  };
  await userService.createNewUser(newUser);
  return res;
};
export default {
  signUp,
};
