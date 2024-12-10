import { RoomType } from "enums";

const roomTypeColor = (type: RoomType) => {
  switch (type) {
    case RoomType.Single:
      return "orange-600 ";
    case RoomType.Double:
      return "purple-600 ";
    case RoomType.Quad:
      return "blue-600 ";
    case RoomType.Studio:
      return "pink-600 ";
  }
};
export default roomTypeColor;
