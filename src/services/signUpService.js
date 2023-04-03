import * as apiService from "@/services/apiService";
import cryptionService from "@/services/cryptionService";

const signUpPath = "/signup";

export const signUp = async (userData) => {
  //TODO generate public key
  const keyPair = await cryptionService.generateKeyPair();
  userData.public_key = keyPair.publicKey;
  return await apiService.POST(signUpPath, userData);
};
