import apiConfig from "./ApiConfig";
export const fetchContractApi = (query: any): Promise<any> => {
  return apiConfig.get(`/api/v1/contracts?${query}`);
};
export const fetchContractByIdApi = (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/contracts/${id}`);
};
export const deleteContractApi = (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/contracts/${id}`);
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
  return apiConfig.post(`/api/v1/contracts`, {
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
  return apiConfig.patch(`/api/v1/contracts/${id}`, {
    status,
  });
};
