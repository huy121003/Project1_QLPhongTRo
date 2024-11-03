import { Button, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { ColumnSelector, DeleteModal } from "../../../components"; // Change to CustomModal
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";

import {
  deleteInvoiceApi,
  fetchInvoiceApi,
  patchInvoiceStatusApi,
} from "../../../services/invoiceApi";

import DetailInvoice from "./DetailInvoice";
//import AddInvoiceModal from "./AddInvoiceModal";

import TableComponent from "../../../components/TableComponent";
import { getInvoiceStatusColor } from "../../../utils/getMethodColor";
import YearMonthSelector from "../../../components/YearMonthSelector ";

import ChoosenRoom from "./ChoosenRoom";

import StatusInvoice from "./StatusInvoice";

import ExportToExcel from "./ExportToExcel";

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
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: InvoiceModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailInvoice(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room: any) => <p>{room.roomName}</p>,
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (tenant: any) => <p>{tenant.name}</p>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <p className={`${getInvoiceStatusColor(status)} font-bold`}>{status}</p>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (service: any) => <p>{service.name}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "month",
      dataIndex: "month",
      key: "month",
      render: (month: string) => <p>{month}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: InvoiceModel) => (
        <>
          <div className="flex-1 justify-center items-center">
            {record.status === InvoiceStatus.UNPAID && (
              <Popconfirm
                className="mr-2"
                title="Payment confirmed "
                description="Are you sure to confirm payment?"
                // onCancel={() => message.error("Click on No")}
                onConfirm={async () => {
                  await onPaymentConfirm(record);
                }}
                okText="YES"
                cancelText="No"
                placement="leftBottom"
              >
                <Button
                  icon={
                    <i className="fa-solid fa-check text-xl text-green-600"></i>
                  }
                />
              </Popconfirm>
            )}
            <DeleteModal onConfirm={onDeleteInvoice} record={record} />
          </div>
        </>
      ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );

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
        <div className="bg-white p-2 rounded-lg m-2 justify-between items-center flex">
          <div>
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChangeVisibleColumns={setVisibleColumns}
            />
          </div>
          <ExportToExcel invoices={invoices} />
        </div>
        <TableComponent
          data={invoices}
          columns={columns}
          visibleColumns={visibleColumns}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={(pagination) => {
            setCurrent(pagination.current);
            setPageSize(pagination.pageSize);
          }}
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
