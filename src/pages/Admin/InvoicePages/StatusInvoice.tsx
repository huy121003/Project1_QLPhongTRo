import React from "react";
import { InvoiceStatus } from "../../../models/InvoiceModal";
interface Props {
  status: InvoiceStatus | "";
  setStatus: (value: InvoiceStatus | "") => void;
}
const StatusInvoice: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <div className="bg-white p-4 rounded-lg m-2 flex justify-between items-center  flex-1 gap-3 ">
      <div
        className={` p-4 border-2 rounded-2xl  ${
          status === ""
            ? "border-green-400 text-green-400"
            : "border-gray-400 text-gray-400"
        } mr-2 flex-1 text-center  font-bold`}
        onClick={() => setStatus("")}
      >
        All Status
      </div>
      <div
        className={` p-4 border-2 rounded-2xl  ${
          status === InvoiceStatus.UNPAID
            ? "border-green-400 text-green-400"
            : "border-gray-400 text-gray-400"
        } mr-2 flex-1 text-center  font-bold`}
        onClick={() => setStatus(InvoiceStatus.UNPAID)}
      >
        {InvoiceStatus.UNPAID}
      </div>
      <div
        className={` p-4 border-2 rounded-2xl  ${
          status === InvoiceStatus.PAID
            ? "border-green-400 text-green-400"
            : "border-gray-400 text-gray-400"
        } mr-2 flex-1 text-center  font-bold`}
        onClick={() => setStatus(InvoiceStatus.PAID)}
      >
        {InvoiceStatus.PAID}
      </div>
    </div>
  );
};

export default StatusInvoice;
