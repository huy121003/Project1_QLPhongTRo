import { Button, message, notification } from "antd";
import invoiceApi from "api/invoiceApi/invoiceApi";
import { useTheme } from "contexts/ThemeContext";
import { InvoiceStatus } from "enums";
import { IInvoice } from "interfaces";
import { useEffect, useState } from "react";
import InvoiceAmount from "./child-components/InvoiceAmount";
import YearMonthSelector from "@components/YearMonthSelector ";
import ChoosenRoom from "./child-components/ChoosenRoom";
import StatusInvoice from "./child-components/StatusInvoice";
import ExportToExcel from "./child-components/ExportToExcel";
import InvoiceTable from "./child-components/InvoiceTable";
import DetailInvoice from "./drawer/DetailInvoice";

const InvoicePage = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [status, setStatus] = useState<InvoiceStatus | "">("");
  const [openDetailInvoice, setOpenDetailInvoice] = useState(false);
  const [openPaymentConfirm, setOpenPaymentConfirm] = useState(false);
  const [choosenRoom, setChooenRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const getInvoices = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      month: selectedMonth && year ? `${selectedMonth}-${year}` : "",
      "room._id": choosenRoom,
      status: status,
      sort: "-month",
    };
    const query = new URLSearchParams(queryParams).toString();
    setIsLoading(true);
    const res = await invoiceApi.fetchInvoiceApi(query);
    if (res.data) {
      setInvoices(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getInvoices();
  }, [
    current,
    pageSize,
    openDetailInvoice,
    selectedMonth,
    year,
    choosenRoom,
    status,
  ]);
  const onChange = (pagination: any) => {
    if (pagination.current !== current && pagination) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const onDeleteInvoice = async (record: any) => {
    const res = await invoiceApi.deleteInvoiceApi(record._id);
    if (res.data) {
      message.success("Invoice deleted");
      getInvoices();
      setCurrent(1);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
  const onPaymentConfirm = async (record: any) => {
    const res = await invoiceApi.patchInvoiceStatusApi(
      record._id,
      InvoiceStatus.PAID
    );
    if (res.data) {
      message.success("Payment confirmed");
      getInvoices();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  return (
    <>
      <h1 className="text-2xl font-bold m-2">Invoice</h1>
      <div className="justify-end  w-full">
        <div className="flex-1 m-2">
          <InvoiceAmount selectMonth={selectedMonth} year={year} />
        </div>
        <div
          className={` rounded-lg   justify-between items-center mx-2 flex
  ${bgColor} ${textColor} 
          `}
        >
          <div className="flex justify-start">
            <YearMonthSelector
              selectedMonth={selectedMonth}
              year={year}
              setYear={setYear}
              setSelectedMonth={setSelectedMonth}
            />
            <ChoosenRoom
              choosenRoom={choosenRoom}
              setChooenRoom={setChooenRoom}
            />
            <StatusInvoice status={status} setStatus={setStatus} />
          </div>

          <div className="   justify-end flex-1 items-center  flex">
            <ExportToExcel invoices={invoices} />
          </div>
        </div>
        <InvoiceTable
          invoices={invoices}
          onDeleteInvoice={onDeleteInvoice}
          onPaymentConfirm={onPaymentConfirm}
          setOpenDetailInvoice={setOpenDetailInvoice}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
          setRecord={setRecord}
        />
      </div>
      <DetailInvoice
        record={record}
        open={openDetailInvoice}
        setOpen={setOpenDetailInvoice}
      />
    </>
  );
};

export default InvoicePage;
