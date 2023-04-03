import userRepo from "@/ipc-wrappers/userRepositoryWrapper"
const createNewUser = async (newUser) => {
  return await userRepo.insertUser(newUser);

}
export default {
  createNewUser
}
