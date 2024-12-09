import { RoomStatus } from "enums";

const roomStatusColor = (status: RoomStatus) => {
  switch (status) {
    case RoomStatus.Available:
      return "text-green-600 ";
    case RoomStatus.Occupied:
      return "text-yellow-600 ";
  }
};
export default roomStatusColor;
