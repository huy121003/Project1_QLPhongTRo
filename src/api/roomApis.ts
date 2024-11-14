import { apiConfig, apiRequest } from "./ApiConfig";
import { RoomStatus, RoomType } from "../models/RoomModel";
import { ApiMethod } from "./ApiMethod";

export const fetchRoomApi = (query: any): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/rooms?${query}`, false);
};
export const fetchRoomByIdApi = (id: string): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/rooms/${id}`, false);
};
export const deleteRoomApi = (id: string): Promise<any> => {
    return apiRequest(ApiMethod.DELETE, `/api/v1/rooms/${id}`, false);
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
    return apiRequest(ApiMethod.POST, `/api/v1/rooms`, false, {
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
    return apiRequest(ApiMethod.PATCH, `/api/v1/rooms/${id}`, false, {
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
