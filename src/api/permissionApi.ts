import { apiConfig } from "./ApiConfig";

export const fetchPermissionApi = (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/permissions?${query}`);
};
export const fetchPermissionByIdApi = (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/permissions/${id}`);
};
