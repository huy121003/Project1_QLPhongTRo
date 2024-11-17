import { ApiMethod } from "../enums";
import { apiRequest } from "./ApiConfig";

const fetchPaymentApi = (query: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/pay?${query}`, false);
};
const fetchPaymentByIdApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/pay/${id}`, false);
};

const deletePaymentApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.DELETE, `/api/v1/pay/${id}`, false);
};
const postPaymentApi = (
  userId: string,
  nameConfig: string,
  clientId: string,
  apiKey: string,
  checksumKey: string
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/pay`, false, {
    userId,
    nameConfig,
    clientId,
    apiKey,
    checksumKey,
  });
};
const patchPaymentApi = (
  id: string,
  nameConfig: string,
  clientId: string,
  apiKey: string,
  checksumKey: string
): Promise<any> => {
  return apiRequest(ApiMethod.PATCH, `/api/v1/pay/${id}`, false, {
    nameConfig,
    clientId,
    apiKey,
    checksumKey,
  });
};
const postLinkPaymentApi = (
  idInvoice: string,
  idPost: string
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/pay/payment`, false, {
    idInvoice,
    idPost,
  });
};

export default {
  fetchPaymentApi,
  fetchPaymentByIdApi,
  deletePaymentApi,
  postPaymentApi,
  patchPaymentApi,
  postLinkPaymentApi,
};
