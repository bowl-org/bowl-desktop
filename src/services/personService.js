import personRepo from "@/ipc-wrappers/personRepositoryWrapper";

const findPersonByEmail = async (email) => {
  return personRepo.findPersonByEmail(email);
};
const createPerson = async(personData)=> {
  return personRepo.insertPerson(personData);
}
const getPersonById = async(id)=> {
  return personRepo.findPerson(id);
}
export default{
  findPersonByEmail,
  createPerson,
  getPersonById
}
