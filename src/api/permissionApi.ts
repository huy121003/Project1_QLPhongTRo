import { apiConfig, apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";

export const fetchPermissionApi = (query: any): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/permissions?${query}`, false);
};
export const fetchPermissionByIdApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/permissions/${id}`, false);
};
