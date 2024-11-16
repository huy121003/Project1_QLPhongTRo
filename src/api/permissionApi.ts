import {apiRequest } from "./ApiConfig";
import { ApiMethod } from "../enums";
 const fetchPermissionApi = (query: any): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/permissions?${query}`, false);
};
 const fetchPermissionByIdApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/permissions/${id}`, false);
};
export default {
  fetchPermissionApi,
  fetchPermissionByIdApi,
};