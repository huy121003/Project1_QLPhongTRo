import { RequestContractStatus, RoomType,  } from "../enums";

interface IRequestContract {
  _id: string;
  user: {
    _id: string;
    email: string;
    name: string;
    phone: string;
    idCard: string;
    birthday: Date;
    avatar: string;
  };
  room: {
    _id: string;
    roomName: string;
    type: RoomType;
  };
  status: RequestContractStatus;
  type: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    _id: string;
    email: string;
    name: string;
  };
  updatedBy: {
    _id: string;
    email: string;
    name: string;
  };
}
export default IRequestContract;
