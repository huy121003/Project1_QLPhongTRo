import React, { useEffect, useState } from "react";
import { invoiceApi } from "../../../api";
import { InvoiceStatus } from "../../../enums";
import { notification } from "antd";
import { useTheme } from "../../../contexts/ThemeContext";

interface Props {
  selectMonth: number | null;
  year: number | null;
}
const InvoiceAmount: React.FC<Props> = ({ selectMonth, year }) => {
  const [total, setTotal] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const bgC = isLightTheme ? "bg-white" : "bg-gray-800";

  // số lương hóa đơn
  useEffect(() => {
    let month = "";
    const getTotal = async () => {
      if (selectMonth === null || year === null) month = "";
      else month = `${selectMonth}-${year}`;

      const res = await invoiceApi.fetchInvoiceApi(
        `month=${month}&pageSize=99999&currentPage=1`
      );
      if (res.data) {
        setTotal(res.data.meta.totalDocument);
        const totalPaid = res.data.result.filter(
          (invoice: any) => invoice.status === InvoiceStatus.PAID
        ).length;
        const totalUnpaid = res.data.result.filter(
          (invoice: any) => invoice.status === InvoiceStatus.UNPAID
        ).length;
        setTotalPaid(totalPaid);
        setTotalUnpaid(totalUnpaid);
      } else {
        notification.error({
          message: "Error",
          description: res.message,
        });
      }
    };
    getTotal();
  }, [selectMonth, year]);

  return (
    <>
      <div
        className={`flex justify-between p-4 ${bgC} shadow-lg rounded-lg flex-1`}
      >
        {/* Tổng hóa đơn */}
        <div className="flex flex-col flex-1 justify-center items-center gap-1">
          <span className="text-lg flex items-center gap-2">
            <i className="text-blue-500 fas fa-file-invoice-dollar"></i>
            Total invoices
          </span>
          <span className="xl:text-6xl text-2xl font-bold text-blue-600">
            {total}
          </span>
        </div>

        {/* Tổng đã thanh toán */}
        <div className="flex flex-col flex-1 justify-center items-center gap-1">
          <span className="text-lg flex items-center gap-2">
            <i className="text-green-500 fas fa-check-circle"></i>
            Total paid
          </span>
          <span className="xl:text-6xl text-2xl font-bold text-green-600">
            {totalPaid}
          </span>
        </div>

        {/* Tổng chưa thanh toán */}
        <div className="flex flex-col flex-1 justify-center items-center gap-1">
          <span className="text-lg flex items-center gap-2">
            <i className="text-red-500 fas fa-times-circle"></i>
            Total unpaid
          </span>
          <span className="xl:text-6xl text-2xl font-bold text-red-600">
            {totalUnpaid}
          </span>
        </div>
      </div>
    </>
  );
};

export default InvoiceAmount;
