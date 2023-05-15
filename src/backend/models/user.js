import person from "./person";
const userModel = {
  ...person.personModel,
  personId: 0,
  privateKey: "",
};

export const toPerson = (data) => {
  let newPerson = person.personModel;
  Object.keys(data).forEach((key) => {
    Object.prototype.hasOwnProperty.call(person.personModel, key)
      ? (newPerson[key] = data[key])
      : "";
  });
  newPerson.id = data.personId;
  return newPerson;
};
export default { userModel, toPerson };
