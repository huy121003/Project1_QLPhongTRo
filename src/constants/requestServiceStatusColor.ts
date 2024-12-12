import { RegisterServiceStatus } from "enums";

const requestServiceStatusColor = (status: RegisterServiceStatus) => {
  switch (status) {
    case RegisterServiceStatus.PENDING:
      return "text-yellow-600 ";
    case RegisterServiceStatus.APPROVED:
      return "text-blue-600 ";
    case RegisterServiceStatus.SUCCESS:
      return "text-green-600 ";
  }
};
export default requestServiceStatusColor;
