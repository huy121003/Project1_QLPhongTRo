export interface ServiceModel {
  _id: string;
  serviceName: string;
  description: string;
  price: string;
  unit: string;
  type: ServiceType;
}
export enum ServiceType {
  Water = "WATER",
  Electricity = "ELECTRICITY",
  Internet = "INTERNET",
  Other = "OTHER",
}