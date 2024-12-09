import { apiRequest } from "api/config";
import { ApiMethod } from "enums";

const createLinkPayment = (idInvoices: string[]): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/pay/payment`, false, {
    idInvoices,
  });
};
export default { createLinkPayment };
