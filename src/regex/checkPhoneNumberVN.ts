 const checkPhoneNumberVN = (phoneNumber: string) => {
  return String(phoneNumber).match(/^(0[3|5|7|8|9])\d{8}$/);
};
export default checkPhoneNumberVN;
