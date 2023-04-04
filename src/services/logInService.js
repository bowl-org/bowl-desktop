import * as apiService from "@/services/apiService";
import authTokenService from "./authTokenService";
import userService from "./userService";

const logInPath = "/login";
/*
1. Check if jwt token exists in local db
2. If token exists auto login the user
3. Otherwise send user credentials to server to authenticate user
4. Then check user exsistency on local database
5. If user not exists in local db create new key pair for user then save user to db
*/
const logIn = async (logInData, rememberMe) => {
  let res = await apiService.POST(logInPath, logInData);
  let user = await userService.findByEmail(logInData.email);
  if (user == null) {
    console.log("User not found in local db, creating new user...");
    //Set name which we get from server
    logInData.name = res.data.user.name;
    user = await userService.createNewUser(logInData);
    //TODO update user public key on server
  }
  //res.data.data -> response token object
  res.data.token = { userId: user.id, data: res.data.data };
  //Save token to database
  if (rememberMe) {
    await authTokenService.setToken(res.data.token);
  }
  //autoLogIn();

  return res;
};
const logOut = async () => {
  return await authTokenService.deleteToken();
};
const autoLogInCheck = async () => {
  let token = await authTokenService.getToken();
  if (token == null) {
    throw Error("Token not found!");
  } else {
    let user = await userService.findUser(token.userId);
    if (user == null) {
      throw Error("User not found!");
    } else {
      return user;
    }
  }
};

export default {
  logIn,
  logOut,
  autoLogInCheck,
};
