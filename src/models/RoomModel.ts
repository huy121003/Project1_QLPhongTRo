interface RoomModel {
  _id: string;
  roomName: string;
  area: number;
  type: RoomType;
  status: RoomStatus;
  price: number;
  description: string;
  services: any[];
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
export default RoomModel;

export enum RoomType {

    Single = "SINGLE",
    Double = "DOUBLE",
    Quad = "QUAD",
    Studio = "STUDIO",
}

export enum RoomStatus {
  Occupied = "OCCUPIED", // Phòng đã được thuê
  Available = "AVAILABLE", // Phòng còn trống

}
