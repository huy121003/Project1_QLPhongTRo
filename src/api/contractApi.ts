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
  },
  startDate: Date,
  endDate: Date,
  depositAmount: number,
  status: string
): Promise<any> => {
  return apiConfig.post(`/api/v1/contracts`, {
    room,
    tenant,

    startDate,
    endDate,
    depositAmount,
    status,
    rentCycleCount: 1,
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
