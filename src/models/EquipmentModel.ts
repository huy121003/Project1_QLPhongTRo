export interface EquipmentModel {
  _id: string;
  name: string;
  status: EquipmentStatus;
  price: string;
  description: string;
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
export enum EquipmentStatus {
  New = "NEW",
  Old = "OLD",
  Broken = "BROKEN",
  Repairing = "REPAIRING",
}
