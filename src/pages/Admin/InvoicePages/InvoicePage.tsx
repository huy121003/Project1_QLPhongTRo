import { Button, message, notification } from "antd";
import { useEffect, useState } from "react";
import DetailInvoice from "./DetailInvoice";
import ChoosenRoom from "./ChoosenRoom";
import StatusInvoice from "./StatusInvoice";
import ExportToExcel from "./ExportToExcel";
import InvoiceCard from "./InvoiceCard";
import { IInvoice } from "../../../interfaces";
import { InvoiceStatus } from "../../../enums";
import { invoiceApi } from "../../../api";
import { YearMonthSelector } from "../../../components";
import PaymentConfirm from "./PaymentConfirm";
const InvoicePage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [status, setStatus] = useState<InvoiceStatus | "">("");
  const [openDetailInvoice, setOpenDetailInvoice] = useState(false);
  const [openPaymentConfirm, setOpenPaymentConfirm] = useState(false);
  const [choosenRoom, setChooenRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
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
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    if (pageSize) setPageSize(pageSize);
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
          <div className="bg-white  rounded-lg shadow-lg border border-gray-200 justify-end flex-1 items-center cursor flex">
            <Button
              size="large"
              onClick={() => setOpenPaymentConfirm(true)}
              className="m-2 py-6 px-2 bg-purple-600 text-white"
            >
              <i className="fa-solid fa-credit-card"></i>
              Payment Confirm
            </Button>

            <ExportToExcel invoices={invoices} />
          </div>
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
      <PaymentConfirm
        open={openPaymentConfirm}
        setOpen={setOpenPaymentConfirm}
      />
    </>
  );
};

export default InvoicePage;
