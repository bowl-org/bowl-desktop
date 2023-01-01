import * as apiService from "@/services/apiService"

const forgotPasswordPath = "/forgotpassword";

export const resetPassword = async (emailData) => {
  return await apiService.POST(forgotPasswordPath, emailData);
} ;
