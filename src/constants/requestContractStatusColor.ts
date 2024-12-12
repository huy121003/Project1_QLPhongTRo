import { RequestContractStatus } from "enums";

 const requestContractStatusColor = (
  status: RequestContractStatus
) => {
  switch (status) {
    case RequestContractStatus.PENDING:
      return "text-yellow-600 ";
    case RequestContractStatus.SUCCESS:
      return "text-green-600 ";
    case RequestContractStatus.REJECTED:
      return "text-red-600 ";
  }
};
export default requestContractStatusColor;
