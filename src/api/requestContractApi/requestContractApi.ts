import { apiRequest } from "api/config";
import { ApiMethod, RequestContractStatus } from "enums";

const fetchRequestContractApi = (query: any): Promise<any> => {
  return apiRequest(
    ApiMethod.GET,
    `/api/v1/requests-contract?${query}&populate=user,contract`,
    false
  );
};
const fetchRequestContractByIdApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/requests-contract/${id}`, false);
};
const deleteRequestContractApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.DELETE, `/api/v1/requests-contract/${id}`, false);
};
const postRequestContractApi = (
  contract: string,
  type: boolean,
  amount?: number,
  description?: string
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/requests-contract`, false, {
    contract,
    type,
    amount,
    description,
  });
};
const patchRequestContractApi = (
  id: string,
  status: RequestContractStatus
): Promise<any> => {
  return apiRequest(ApiMethod.PATCH, `/api/v1/requests-contract/${id}`, false, {
    status,
  });
};
export default {
  fetchRequestContractApi,
  fetchRequestContractByIdApi,
  deleteRequestContractApi,
  postRequestContractApi,
  patchRequestContractApi,
};
