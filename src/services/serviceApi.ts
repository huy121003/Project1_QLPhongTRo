import { Axios } from "axios";
import apiConfig from "../api/ApiConfig";

export const fetchServicesApi = async (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/dormitory-services?${query}`);
};

export const deleteServiceApi = async (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/dormitory-services/${id}`);
};

export const postServiceApi = (
  roomNumber: string,
  wifiFee: number,
  parkingFee: number,
  elevatorFee: number,
  cleaningFee: number,
  laundryFee: number
): Promise<any> => {
  return apiConfig.post(`/api/v1/dormitory-services`, {
    roomNumber,
    wifiFee: parseFloat(String(wifiFee)),
    parkingFee: parseFloat(String(parkingFee)),
    elevatorFee: parseFloat(String(elevatorFee)),
    cleaningFee: parseFloat(String(cleaningFee)),
    laundryFee: parseFloat(String(laundryFee)),
  });
};