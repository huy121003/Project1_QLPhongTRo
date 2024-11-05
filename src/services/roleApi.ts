import apiConfig from "../api/ApiConfig";

export const fecthRoleApi = async (query:string): Promise<any> => {
    return apiConfig.get(`/api/v1/roles?${query}`);
  }
  
export const postRoleApi = async (name:string,description:string,permissions:string[]): Promise<any> => {
    return apiConfig.post(`/api/v1/roles`,{
        name,
        description,
        permissions,
        isActive:true

    });
  }
export const fetchRoleByIdApi = async (id:string): Promise<any> => {
    return apiConfig.get(`/api/v1/roles/${id}`);
  }
export const deleteRoleApi = async (id:string): Promise<any> => {
    return apiConfig.delete(`/api/v1/roles/${id}`);
  }
export const patchRoleApi = async (id:string,name:string,description:string,permissions:string[]): Promise<any> => {
    return apiConfig.patch(`/api/v1/roles/${id}`,{
        name,
        description,
        permissions,
        isActive:true
    });
  }