 const checkPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};
export default checkPassword;
