import personRepo from "@/ipc-wrappers/personRepositoryWrapper";

const findPersonByEmail = async (email) => {
  return personRepo.findPersonByEmail(email);
};
const createPerson = async(personData)=> {
  return personRepo.insertPerson(personData);
}
export default{
  findPersonByEmail,
  createPerson
}
