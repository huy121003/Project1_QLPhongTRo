interface ContractModel {
  _id: string;
  room: {
    _id: string;
    roomName: string;

    price: number;
  };
  tenant: {
    _id: string;
    name: string;
    idCard: string;
    phone: string;
    email: string;
    address: string;
  };
  innkeeper: {
    _id: string;
    name: string;
  };
  startDate: Date;
  endDate: Date;
  depositAmount: number;
  status: ContractStatus;
  rentCycleCount: number;
  createdAt: Date;
  actualEndDate: Date;
  updatedAt: Date;
  createdBy: {
    _id: string;
    email: string;
  };
  updatedBy: {
    _id: string;
    email: string;
  };
}
export default ContractModel;
export enum ContractStatus {
  EXPIRED = "EXPIRED",
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
}
