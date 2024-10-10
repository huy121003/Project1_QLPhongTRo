import { Axios } from "axios";
import apiConfig from "../api/ApiConfig";

export const fecthAccountApi = async (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/users?${query}`);
};

export const deleteAcountApi = async (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/users/${id}`);
};
export const postAccountApi = (
  email: string,
  password: string,
  name: string,
  age: number,
  gender: string,
  address: string,
  idCard: string,
  role: string
): Promise<any> => {
  return apiConfig.post(`/api/v1/users`, {
    email,
    password,
    name,
    age: parseInt(String(age)), // Đảm bảo tuổi là số nguyên
    gender,
    address,
    idCard,
    role,
  });
};
