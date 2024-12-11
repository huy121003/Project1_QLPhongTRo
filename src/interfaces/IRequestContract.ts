import { RequestContractStatus } from "enums";
import IContract from "./IContract";

interface IRequestContract {
  _id: string;

  contract: IContract;
  status: RequestContractStatus;
  description: string;
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
