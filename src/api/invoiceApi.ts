import apiConfig, { apiRequest } from "./ApiConfig";
import { InvoiceStatus } from "../models/InvoiceModal";
import { ApiMethod } from "./ApiMethod";

export const fetchInvoiceApi = (query: string): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/invoices?${query}`, false);
};

export const fetchInvoiceByIdApi = (id: string): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/invoices/${id}`, false);
};
export const deleteInvoiceApi = (id: string): Promise<any> => {
    return apiRequest(ApiMethod.DELETE, `/api/v1/invoices/${id}`, false);
};

export const fetchInvoiceByUserId = (): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/invoices/by-user`, false);
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
    return apiRequest(ApiMethod.POST, `/api/v1/invoices`, false, {
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
    return apiRequest(ApiMethod.PATCH, `/api/v1/invoices/${id}`, false, {
        firstIndex,
        finalIndex,
    });
};
export const patchInvoiceStatusApi = (
    id: string,
    status: InvoiceStatus
): Promise<any> => {
    return apiRequest(ApiMethod.PATCH, `/api/v1/invoices/${id}`, false, {
        status,
    });
};

// Thanh toán
export const createLinkPayment = (
    idInvoices: string[],
    idPost: string
): Promise<any> => {
    return apiRequest(ApiMethod.POST, `/api/v1/pay/payment`, false, {
        idInvoices,
        idPost,
    });
};
