import { Method } from "../models/PermissonModel";

export const getMethodColor = (method: Method) => {
    switch (method) {
      case Method.GET:
        return "green";
      case Method.POST:
        return "yellow";
      case Method.PATCH:
        return "purple";
      case Method.DELETE:
        return "orange";
      default:
        return "gray";
    }
  };