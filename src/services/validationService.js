const validateEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return;
  }
  throw new Error("Email validation failed! Invalid email pattern!");
};
export default {
  validateEmail
}

