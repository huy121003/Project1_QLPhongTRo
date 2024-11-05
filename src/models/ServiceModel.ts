export interface ServiceModel {
  _id: string;
  serviceName: string;
  description: string;
  price: string;
  unit: string;
  type: ServiceType;
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
export enum ServiceType {
  Water = "WATER",
  Electricity = "ELECTRICITY",
  Internet = "INTERNET",
  Other = "OTHER",
}