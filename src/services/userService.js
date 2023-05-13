import userRepo from "@/ipc-wrappers/userRepositoryWrapper";
import cryptionService from "@/services/cryptionService";
import Store from "@/store/index";
import personService from "./personService";
import * as apiService from "@/services/apiService";

const userUpdatePath = "/user/update";
const createNewUser = async (newUser) => {
  //Create key pair if not exists
  if (newUser.privateKey == null || newUser.privateKey == "") {
    console.log("Creating key pair for new user...");
    const keyPair = await cryptionService.generateKeyPair();
    newUser.privateKey = keyPair.privateKey;
    newUser.publicKey = keyPair.publicKey;
  }
  return await userRepo.insertUser(newUser);
};
const findByEmail = async (email) => {
  return await userRepo.findUserByEmail(email);
};
const findUser = async (id) => {
  return await userRepo.findUser(id);
};
const updateCurrentUser = async (name, publicKey) => {
  try {
    console.log("Current User id", Store.getters.user.id)
    let user = await findUser(Store.getters.user.id);
    user.name = name ?? user.name;
    user.publicKey = publicKey ?? user.publicKey;
    //Make sure key pair is right right before send
    let testData = await cryptionService.encryptData(user.publicKey, "This is test");
    await cryptionService.decryptData(user.privateKey, testData);
    await apiService.PUT(
      userUpdatePath,
      { public_key: user.publicKey, name: user.name },
      apiService.generateAuthHeader(Store.getters.token.data)
    );
    await personService.updatePerson({
      id: user.personId,
      name: user.name,
      email: user.email,
      publicKey: user.publicKey
    });
    //Can change id after update person
    Store.dispatch("setUser", user);
    console.log("Updated User id", Store.getters.user.id)
  } catch (err) {
    console.log(err);
    throw new Error("Update current user failed!");
  }
};
export default {
  userUpdatePath,
  createNewUser,
  findUser,
  findByEmail,
  updateCurrentUser,
};
