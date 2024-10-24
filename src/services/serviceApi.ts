import { Axios } from "axios";
import apiConfig from "../api/ApiConfig";
import { ServiceModel, ServiceType } from "./serviceModel";

export const fetchServiceApi = async (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/services?${query}`);
};

export const fetchServiceByIdApi = async (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/services/${id}`);
};

export const deleteServiceApi = async (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/services/${id}`);
};

export const postServiceApi = (
  serviceName: string,
  description: string,
  price: string,
  unit: string,
  type: ServiceType
): Promise<any> => {
  return apiConfig.post(`/api/v1/services`, {
    serviceName,
    description,
    price,
    unit,
    type,
  });
};

export const patchServiceApi = (
  id: string,
  serviceName: string,
  description: string,
  price: string,
  unit: string,
  type: ServiceType
): Promise<any> => {
  return apiConfig.patch(`/api/v1/services/${id}`, {
    serviceName,
    description,
    price,
    unit,
    type,
  });
};