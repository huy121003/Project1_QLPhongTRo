import { ServiceType } from "enums";

 const serviceTypeColor = (type: ServiceType) => {
  switch (type) {
    case ServiceType.Electricity:
      return "text-orange-600 ";
    case ServiceType.Water:
      return "text-blue-600 ";
    case ServiceType.Internet:
      return "text-purple-600 ";
    case ServiceType.Other:
      return "text-pink-600 ";
  }
};
export default serviceTypeColor;
