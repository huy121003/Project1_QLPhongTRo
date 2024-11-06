import apiConfig, { apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";

export const fecthRoleApi = async (query: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/roles?${query}`, false);
};

export const postRoleApi = async (
  name: string,
  description: string,
  permissions: string[]
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/roles`, false, {
    name,
    description,
    permissions,
    isActive: true,
  });
};
export const fetchRoleByIdApi = async (id: string): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/roles/${id}`, false);
};
export const deleteRoleApi = async (id: string): Promise<any> => {
  return apiRequest(ApiMethod.DELETE, `/api/v1/roles/${id}`, false);
};
export const patchRoleApi = async (
  id: string,
  name: string,
  description: string,
  permissions: string[]
): Promise<any> => {
  return apiRequest(ApiMethod.PATCH, `/api/v1/roles/${id}`, false, {
    name,
    description,
    permissions,
    isActive: true,
  });
};
