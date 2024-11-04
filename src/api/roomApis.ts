import { apiConfig } from "./ApiConfig";
import { RoomStatus, RoomType } from "../models/RoomModel";

export const fetchRoomApi = (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/rooms?${query}`);
};
export const fetchRoomByIdApi = (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/rooms/${id}`);
};
export const deleteRoomApi = (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/rooms/${id}`);
};
export const postRoomApi = (
  roomName: string,
  area: number,
  type: RoomType,
  status: RoomStatus,
  price: number,
  description: string,
  services: any[]
): Promise<any> => {
  return apiConfig.post(`/api/v1/rooms`, {
    roomName,
    area: parseInt(area.toString()),
    type,
    status,
    price: parseInt(price.toString()),
    description,
    services,
  });
};

export const patchRoomApi = (
  id: string,
  area: number,
  type: RoomType,
  status: RoomStatus,
  price: number,
  description: string,
  services: any[]
): Promise<any> => {
  return apiConfig.patch(`/api/v1/rooms/${id}`, {
    area: parseInt(area.toString()),
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
  return apiConfig.patch(`/api/v1/rooms/${id}`, {
    status,
  });
};
