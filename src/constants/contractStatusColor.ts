import { ContractStatus } from "enums";

 const contractStatusColor = (status: ContractStatus) => {
   switch (status) {
     case ContractStatus.ACTIVE:
       return "text-green-600 ";
     case ContractStatus.CANCELED:
       return "text-red-600 ";
     case ContractStatus.EXPIRED:
       return "text-orange-600 ";
   }
 };
 export default contractStatusColor;
