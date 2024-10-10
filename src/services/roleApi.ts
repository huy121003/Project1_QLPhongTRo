import apiConfig from "../api/ApiConfig";

export const fecthRoleApi = async (): Promise<any> => {
    return apiConfig.get(`/api/v1/roles`);
  }
  