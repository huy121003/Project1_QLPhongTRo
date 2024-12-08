import { RequestContractStatus, RoomType } from "../enums";
import IContract from "./IContract";

interface IRequestContract {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  contract: IContract;
  status: RequestContractStatus;
  type: boolean;
  amount: number;
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
