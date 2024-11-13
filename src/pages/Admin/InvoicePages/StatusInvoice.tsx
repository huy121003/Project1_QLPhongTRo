import React from "react";
import { InvoiceStatus } from "../../../enums";

interface Props {
  status: InvoiceStatus | "";
  setStatus: (value: InvoiceStatus | "") => void;
}
const StatusInvoice: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <div className=" px-2 pt-2 rounded-lg mt-2 flex justify-between items-center  flex-1 text-xl ">
      <div
        className={` p-4 border-t-4 rounded-t-2xl  bg-white ${
          status === ""
            ? "border-blue-600 text-blue-600"
            : "border-gray-400 text-gray-400"
        }  flex-1 text-center  font-bold`}
        onClick={() => setStatus("")}
      >
        All
      </div>
      <div
        className={` p-4 border-t-4 rounded-t-2xl bg-white  ${
          status === InvoiceStatus.PAID
            ? "border-green-600 text-green-600"
            : "border-gray-400 text-gray-400"
        }  flex-1 text-center  font-bold`}
        onClick={() => setStatus(InvoiceStatus.PAID)}
      >
        {InvoiceStatus.PAID}
      </div>
      <div
        className={` p-4 border-t-4 rounded-t-2xl bg-white  ${
          status === InvoiceStatus.UNPAID
            ? "border-red-600 text-red-600"
            : "border-gray-400 text-gray-400"
        }  flex-1 text-center  font-bold`}
        onClick={() => setStatus(InvoiceStatus.UNPAID)}
      >
        {InvoiceStatus.UNPAID}
      </div>
    </div>
  );
};

export default StatusInvoice;
