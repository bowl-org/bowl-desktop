import authTokenRepo from "../ipc-wrappers/authTokenRepositoryWrapper";

const setToken = async (tokenData) => {
  return await authTokenRepo.setToken(tokenData);
};
const getToken = async () => {
  return await authTokenRepo.getToken();
};
const deleteToken = async () => {
  return await authTokenRepo.deleteToken();
}
export default {
  setToken,
  getToken,
  deleteToken
};
