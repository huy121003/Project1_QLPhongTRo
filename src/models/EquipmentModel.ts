export interface EquipmentModel {
    _id: string,
    name: string,
    status: EquipmentStatus,
    price: string,
    description: string,
   
    }
    export enum EquipmentStatus {
        New = "NEW",
        Old = "OLD",
        Broken = "BROKEN",
        Repairing = "REPAIRING",
      

    }