import apiConfig from "../api/ApiConfig";

export const fetchInvoiceApi = (query: string): Promise<any> => {
  console.log(query);
  return apiConfig.get(`/api/v1/invoices?${query}`);
};

export const fetchInvoiceByIdApi = (id: string): Promise<any> => {
  return apiConfig.get(`/api/v1/invoices/${id}`);
};
export const deleteInvoiceApi = (id: string): Promise<any> => {
  return apiConfig.delete(`/api/v1/invoices/${id}`);
};

export const postInvoiceApi = (
  room: {
    _id: string;
    roomName: string;
  },
  tenant: {
    _id: string;
    name: string;
    idCard: string;
    phone: string;
  },
  service: {
    _id: string;
    name: string;
    unit: string;
    priceUnit: number;
  },
  month: Date,
  dueDate: Date,
  totalNumber: number,
  amount: number,
  description: string,
  firstIndex?: number,
  finalIndex?: number
): Promise<any> => {
  console.log(
    "invoice",
    room,
    tenant,
    service,
    month,
    dueDate,
    totalNumber,
    amount,
    description,
    firstIndex,
    finalIndex
  );
  return apiConfig.post(`/api/v1/invoices`, {
    room,
    tenant,
    service,
    firstIndex,
    finalIndex,

    month,
    dueDate,
    description,
  });
};
