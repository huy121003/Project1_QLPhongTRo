import { Axios } from "axios";
import apiConfig from "../api/ApiConfig";

export const fecthAccountApi = async (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/users?${query}`);
};
export const fecthAccountByIdApi = async (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/users/${id}`);
};
export const deleteAcountApi = async (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/users/${id}`);
};
export const postAccountApi = (
  email: string,
  phone: number,
  password: string,
  name: string,
  birthday: Date,
  gender: string,
  address: string,
  idCard: string,
  role: string
): Promise<any> => {
  return apiConfig.post(`/api/v1/users`, {
    email,
    phone,
    password,
    name,
    birthday,
    gender,
    address,
    idCard,
    role: role,
  });
};
export const patchAccountApi = (
  id: string,

  phone: number,

  name: string,
  birthday: Date,
  gender: string,
  address: string,
  idCard: string,
  role: string
): Promise<any> => {
  return apiConfig.patch(`/api/v1/users/${id}`, {
    phone,
    name,
    birthday,
    gender,
    address,
    idCard,
    role,
  });
};
