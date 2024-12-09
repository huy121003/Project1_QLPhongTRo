import { Gender } from "enums";

const genderColor = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return "text-blue-600 ";
    case Gender.Female:
      return "text-pink-600 ";
    default:
      return "text-purple-600 ";
  }
};
export default genderColor;
