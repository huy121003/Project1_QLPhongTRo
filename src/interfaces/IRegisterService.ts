import { RegisterServiceStatus } from "../enums";

interface IRegisterService {
  _id: string;
  service: string;
  user: string;
  room: string;
  status: RegisterServiceStatus;
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
export default IRegisterService;
