import { message } from "antd";
import { useEffect, useState } from "react";
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";
import {
  deleteInvoiceApi,
  fetchInvoiceApi,
  patchInvoiceStatusApi,
} from "../../../api/invoiceApi";
import DetailInvoice from "./DetailInvoice";
// import YearMonthSelector from "../../../components/YearMonthSelector ";
import ChoosenRoom from "./ChoosenRoom";
import StatusInvoice from "./StatusInvoice";
import ExportToExcel from "./ExportToExcel";
import InvoiceTable from "./InvoiceTable";
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
    const res = await deleteInvoiceApi(record._id);
    if (res.data) {
      message.success("Invoice deleted");
      getInvoices();
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
      <div className="justify-end p-2 w-full">
        <YearMonthSelector
          selectedMonth={selectedMonth}
          year={year}
          setYear={setYear}
          setSelectedMonth={setSelectedMonth}
        />
        <ChoosenRoom choosenRoom={choosenRoom} setChooenRoom={setChooenRoom} />
        <StatusInvoice status={status} setStatus={setStatus} />
        <div className="bg-white p-2 rounded-lg  justify-between items-center flex">
          <div></div>
          <ExportToExcel invoices={invoices} />
        </div>
        <InvoiceTable
          invoices={invoices}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
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
