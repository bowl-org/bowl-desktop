import * as apiService from "@/services/apiService"

const signUpPath = "/signup";

export const signUp = async (userData) => {
  //TODO generate public key
  userData.public_key = "dummy_public_key"
  return await apiService.POST(signUpPath, userData);
} ;
