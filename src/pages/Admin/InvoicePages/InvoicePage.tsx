import { message } from "antd";
import { useEffect, useState } from "react";
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";
import {
  deleteInvoiceApi,
  fetchInvoiceApi,
  patchInvoiceStatusApi,
} from "../../../api/invoiceApi";
import DetailInvoice from "./DetailInvoice";
import YearMonthSelector from "../../../components/YearMonthSelector ";
import ChoosenRoom from "./ChoosenRoom";
import StatusInvoice from "./StatusInvoice";
import ExportToExcel from "./ExportToExcel";

import InvoiceCard from "./InvoiceCard";
const InvoicePage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const [status, setStatus] = useState<InvoiceStatus | "">("");
  const [openDetailInvoice, setOpenDetailInvoice] = useState(false);
  const [choosenRoom, setChooenRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const getInvoices = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      month: `${selectedMonth}-${year}`,
      "room._id": choosenRoom,
      status: status,
      sort: "month",
    };
    const query = new URLSearchParams(queryParams).toString();
    setIsLoading(true);
    const res = await fetchInvoiceApi(query);
    if (res.data) {
      setInvoices(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else message.error(res.message);
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
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    if (pageSize) setPageSize(pageSize);
  };
  const onDeleteInvoice = async (record: any) => {
    const res = await deleteInvoiceApi(record._id);
    if (res.data) {
      message.success("Invoice deleted");
      getInvoices();
      setCurrent(1);
    } else message.error(res.message);
  };
  const onPaymentConfirm = async (record: any) => {
    const res = await patchInvoiceStatusApi(record._id, InvoiceStatus.PAID);
    if (res.data) {
      message.success("Payment confirmed");
      getInvoices();
    } else message.error(res.message);
  };
  return (
    <>
      <div className="justify-end  w-full">
        <YearMonthSelector
          selectedMonth={selectedMonth}
          year={year}
          setYear={setYear}
          setSelectedMonth={setSelectedMonth}
        />
        <ChoosenRoom choosenRoom={choosenRoom} setChooenRoom={setChooenRoom} />

        <div className="bg-white  rounded-lg  justify-between items-center mx-2 flex">
          <div></div>
          <ExportToExcel invoices={invoices} />
        </div>
        <StatusInvoice status={status} setStatus={setStatus} />
        <InvoiceCard
          invoices={invoices}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={handlePaginationChange}
          onDeleteInvoice={onDeleteInvoice}
          onPaymentConfirm={onPaymentConfirm}
          setRecord={setRecord}
          setOpenDetailInvoice={setOpenDetailInvoice}
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
