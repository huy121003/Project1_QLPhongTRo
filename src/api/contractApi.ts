import apiConfig, { apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";
export const fetchContractApi = (query: any): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/contracts?${query}`, false);
};
export const fetchContractByIdApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.GET, `/api/v1/contracts/${id}`, false);
};
export const deleteContractApi = (id: string): Promise<any> => {
  return apiRequest(ApiMethod.DELETE, `/api/v1/contracts/${id}`, false);
};
export const postContractApi = (
  room: {
    _id: string;
    roomName: string;
    price: number;
  },
  tenant: {
    _id: string;
    name: string;
    idCard: string;
    phone: string;
    email: string;
    address: string;
  },
  startDate: Date,
  endDate: Date,
  address: string,
  depositAmount: number,
  rentCycleCount: number,
  status: string
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/contracts`, false, {
    room,
    tenant,

    startDate,
    endDate,
    address,
    depositAmount,
    status,
    rentCycleCount: parseInt(rentCycleCount.toString()),
  });
};

export const patchContractApi = (
  id: string,

  status: string
): Promise<any> => {
  return apiRequest(ApiMethod.PATCH, `/api/v1/contracts/${id}`, false, {
    status,
  });
};
