import * as apiService from "@/services/apiService"

const logInPath = "/login";

export const logIn = async (logInData) => {
  return await apiService.POST(logInPath, logInData);
} ;
