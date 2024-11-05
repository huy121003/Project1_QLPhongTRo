import { ContractStatus } from "../models/ContractModel";
import { InvoiceStatus } from "../models/InvoiceModal";
import { Method } from "../models/PermissonModel";
import { RoomStatus, RoomType } from "../models/RoomModel";
import { ServiceType } from "../models/ServiceModel";

export const getMethodColor = (method: Method) => {
  switch (method) {
    case Method.GET:
      return "green";
    case Method.POST:
      return "yellow";
    case Method.PATCH:
      return "purple";
    case Method.DELETE:
      return "orange";
    default:
      return "gray";
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case "SUPER ADMIN":
      return "border-red-600 bg-red-200 text-red-600";
    case "NORMAL USER":
      return "border-green-600 bg-green-200 text-green-600";
    default:
      return "border-blue-600 bg-blue-200 text-blue-600";
  }
};
export const getRoomStatusColor = (status: string) => {
  switch (status) {
    case RoomStatus.Available:
      return "text-green-600 ";
    case RoomStatus.Occupied:
      return "text-yellow-600 ";
  }
};
export const getRoomTypeColor = (type: string) => {
  switch (type) {
    case RoomType.Single:
      return "text-orange-600 ";
    case RoomType.Double:
      return "text-purple-600 ";
    case RoomType.Quad:
      return "text-blue-600 ";
    case RoomType.Studio:
      return "text-pink-600 ";
  }
};

export const getServiceTypeColor = (type: string) => {
  switch (type) {
    case ServiceType.Electricity:
      return "text-orange-600 ";
    case ServiceType.Water:
      return "text-blue-600 ";
    case ServiceType.Internet:
      return "text-purple-600 ";
    case ServiceType.Other:
      return "text-pink-600 ";
  }
};
export const getContractStatusColor = (status: string) => {
  switch (status) {
    case ContractStatus.ACTIVE:
      return "text-green-600 ";
    case ContractStatus.CANCELED:
      return "text-red-600 ";
    case ContractStatus.EXPIRED:
      return "text-orange-600 ";
  }
};
export const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case InvoiceStatus.PAID:
      return "text-green-600 ";
    case InvoiceStatus.UNPAID:
      return "text-red-600 ";
  }
};
