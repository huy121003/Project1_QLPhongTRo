interface InvoiceModel {
  _id: string;
  room: {
    _id: string;
    roomName: string;
  };
  tenant: {
    _id: string;
    name: string;
    idCard: string;
    phone: string;
  };
  service: {
    _id: string;
    name: string;
    unit: string;
    priceUnit: number;
  };
  firstIndex?: number;
  finalIndex?: number;
  totalNumber?: number;
  month: number;
  description: string;
  amount: number;
  status: InvoiceStatus;
  createdBy: {
    _id: string;
    email: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;

  updatedBy: {
    _id: string;
    email: string;
    name: string;
  };
}

export enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export default InvoiceModel;
