import apiConfig, { apiRequest } from "./ApiConfig";
import { ServiceType } from "../models/ServiceModel";
import { ApiMethod } from "./ApiMethod";

export const fetchServiceApi = async (query: any): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/services?${query}`, false);
};

export const fetchServiceByIdApi = async (id: string): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/services/${id}`, false);
};

export const deleteServiceApi = async (id: string): Promise<any> => {
    return apiRequest(ApiMethod.DELETE, `/api/v1/services/${id}`, false);
};

export const postServiceApi = (
    serviceName: string,
    description: string,
    price: number,
    unit: string,
    type: ServiceType
): Promise<any> => {
    return apiRequest(ApiMethod.POST, `/api/v1/services`, false, {
        serviceName,
        description,
        price: parseInt(price.toString()),
        unit,
        type,
    });
};

export const patchServiceApi = (
    id: string,
    serviceName: string,
    description: string,
    price: number,
    unit: string,
    type: ServiceType
): Promise<any> => {
    return apiRequest(ApiMethod.PATCH, `/api/v1/services/${id}`, false, {
        serviceName,
        description,
        price: parseInt(price.toString()),
        unit,
        type,
    });
};

export const postServiceToRoomApi = async (
    roomId: string,
    serviceId: string
) => {
    return apiRequest(
        ApiMethod.POST,
        `/api/v1/rooms/${roomId}/services`,
        false,
        { serviceId }
    );
};
