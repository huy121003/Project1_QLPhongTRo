import axios from "../api/ApiConfig";
import { RoomStatus, RoomType } from "../models/RoomModel";

export const fetchRoomApi = (query: any): Promise<any> => {
  return axios.get(`/api/v1/rooms?${query}`);
};
export const fetchRoomByIdApi = (id: string): Promise<any> => {
  return axios.get(`/api/v1/rooms/${id}`);
};
export const deleteRoomApi = (id: string): Promise<any> => {
  return axios.delete(`/api/v1/rooms/${id}`);
};
export const postRoomApi = (
  roomName: string,
  type: RoomType,
  status: RoomStatus,
  price: number,
  description: string,
  services: any[]
): Promise<any> => {
  return axios.post(`/api/v1/rooms`, {
    roomName,
    type,
    status,
    price: parseInt(price.toString()),
    description,
    services,
  });
};

export const patchRoomApi = (
  id: string,
  type: RoomType,
  status: RoomStatus,
  price: number,
  description: string,
  services: any[]
): Promise<any> => {
 
  return axios.patch(`/api/v1/rooms/${id}`, {
    type,
    status,
    price: parseInt(price.toString()),
    description,
    services,
  });
};
export const updateRoomStatusApi = (
  id: string,
  status: RoomStatus
): Promise<any> => {
  return axios.patch(`/api/v1/rooms/${id}`, {
    status,
  });
};
