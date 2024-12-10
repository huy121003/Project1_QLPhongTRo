import { ApiMethod } from "enums";

const methodColor = (method: ApiMethod) => {
  switch (method) {
    case ApiMethod.GET:
      return "green";
    case ApiMethod.POST:
      return "yellow";
    case ApiMethod.PATCH:
      return "purple";
    case ApiMethod.DELETE:
      return "red";
    default:
      return "gray";
  }
};
export default methodColor;
