import apiConfig from "../api/ApiConfig";
import { InvoiceStatus } from "../models/InvoiceModal";

export const fetchInvoiceApi = (query: string): Promise<any> => {
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
  month: string,
  //dueDate: Date,

  description: string,
  firstIndex?: number,
  finalIndex?: number
): Promise<any> => {
  return apiConfig.post(`/api/v1/invoices`, {
    room,
    tenant,
    service,
    firstIndex,
    finalIndex,

    month,
    //dueDate,
    description,
  });
};

export const patchInvoiceApi = (
  id: string,
  firstIndex?: number,
  finalIndex?: number
): Promise<any> => {
  return apiConfig.patch(`/api/v1/invoices/${id}`, {
    firstIndex,
    finalIndex,
  });
};
export const patchInvoiceStatusApi = (
  id: string,
  status: InvoiceStatus
): Promise<any> => {
  return apiConfig.patch(`/api/v1/invoices/${id}`, {
    status,
  });
};
