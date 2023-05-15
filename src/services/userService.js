import userRepo from "@/ipc-wrappers/userRepositoryWrapper";
import cryptionService from "@/services/cryptionService";
import Store from "@/store/index";
import personService from "./personService";
import * as apiService from "@/services/apiService";
import { toPerson } from "@/backend/models/user";

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
const updateUser = async (id, userData) => {
  return await userRepo.updateUser(id, userData);
};
const updateCurrentUserKeypair = async (keypair) => {
  try {
    let user = await findUser(Store.getters.user.id);
    await cryptionService.testKeypair(keypair.privateKey, keypair.publicKey);
    user.privateKey = keypair.privateKey;
    user.publicKey = keypair.publicKey;
    await updateUser(Store.getters.user.id,user);
    await personService.updatePerson(toPerson(user));
    Store.dispatch("setUser", user);
    await sendUpdateUserRequest(user.publicKey, user.name);
    // await updateCurrentUserKeypair(user.name, keypair.publicKey);
  } catch (err) {
    console.log(err);
    throw new Error("Update current user keypair failed!");
  }
};
const sendUpdateUserRequest = async (publicKey, name) => {
  await apiService.PUT(
    userUpdatePath,
    { public_key: publicKey, name: name },
    apiService.generateAuthHeader(Store.getters.token.data)
  );
};
const updateCurrentUserDetail = async (name, publicKey) => {
  try {
    console.log("Current User id", Store.getters.user.id);
    let user = await findUser(Store.getters.user.id);
    user.name = name ?? user.name;
    user.publicKey = publicKey ?? user.publicKey;
    //Make sure key pair is right right before send
    await cryptionService.testKeypair(user.privateKey, user.publicKey);
    await sendUpdateUserRequest(user.publicKey, user.name);
    await personService.updatePerson(toPerson(user));
    // await personService.updatePerson({
    //   id: user.personId,
    //   name: user.name,
    //   email: user.email,
    //   publicKey: user.publicKey
    // });
    //Can change id after update person
    Store.dispatch("setUser", user);
    console.log("Updated User id", Store.getters.user.id);
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
  updateUser,
  updateCurrentUserDetail,
  updateCurrentUserKeypair,
};
