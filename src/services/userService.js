import userRepo from "@/ipc-wrappers/userRepositoryWrapper";
import cryptionService from "@/services/cryptionService";

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
export default {
  userUpdatePath,
  createNewUser,
  findUser,
  findByEmail,
};
