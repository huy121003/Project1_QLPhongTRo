import { Popconfirm, Radio, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { AddButton, ColumnSelector } from "../../../components"; // Change to CustomModal
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";

import {
  deleteInvoiceApi,
  fetchInvoiceApi,
} from "../../../services/invoiceApi";
import SearchFilters from "../../../components/SearchFilter";
import DetailInvoice from "./DetailInvoice";
import AddInvoiceModal from "./AddInvoiceModal";
import moment from "moment";
import TableComponent from "../../../components/TableComponent";
import { getInvoiceStatusColor } from "../../../utils/getMethodColor";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const [openAddInvoice, setOpenAddInvoice] = useState(false);
  const [openDetailInvoice, setOpenDetailInvoice] = useState(false);
  const [openEditInvoice, setOpenEditInvoice] = useState(false);
  
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
      render: (month: string) => <p>{moment(month).format("MM/YYYY")}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record: InvoiceModel) => <></>,
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    "room.roomName": "",
    "tenant.name": "",
    status: "",
    phone: "",
    "service.name": "",
    month: "",
  });
  const getInvoices = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      sort: sorted,
    };
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `/${value}/i`;
      }
    });
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
    sorted,
    searchParams,
    openAddInvoice,
  
    openEditInvoice,
    openDetailInvoice,
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
  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
    setCurrent(1);
  };
  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
    setCurrent(1);
  };
  const onDeleteInvoice = async (record: any) => {
    const res = await deleteInvoiceApi(record._id);
    if (res.data) {
      message.success(res.message);
      getInvoices();
    } else message.error(res.message);
  };
  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            {
              label: "Room",
              field: "room.roomName",
              type: "text",
            },
            {
              label: "Tenant",
              field: "tenant.name",
              type: "text",
            },
            {
              label: "Status",
              field: "status",
              type: "select",
              options: [
                { label: "All Status", value: "" },
                { label: "PAID", value: InvoiceStatus.PAID },
                { label: "UNPAID", value: InvoiceStatus.UNPAID },
              ],
            },
            {
              label: "Service",
              field: "service.name",
              type: "text",
            },
            {
              label: "Month",
              field: "month",
              type: "date",
            },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="room.roomName" className="font-bold">
                By Room Name
              </Radio>
              <Radio value="tenant.name" className="font-bold">
                By Tenant Name
              </Radio>
              <Radio value="status" className="font-bold">
                By Status
              </Radio>
              <Radio value="service.name" className="font-bold">
                By Service
              </Radio>
              <Radio value="month" className="font-bold">
                By Month
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="bg-white p-2 rounded-lg m-2 justify-between flex">
          <div>
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChangeVisibleColumns={setVisibleColumns}
            />
          </div>
          <AddButton
            onClick={() => setOpenAddInvoice(true)}
            label="Add Invoice"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <TableComponent
            data={invoices}
            columns={columns}
            visibleColumns={visibleColumns}
            isLoading={isLoading}
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
          />
        </div>
      </div>
      <DetailInvoice
        open={openDetailInvoice}
        setOpen={setOpenDetailInvoice}
        record={record}
      />
      <AddInvoiceModal open={openAddInvoice} setOpen={setOpenAddInvoice} />
    </>
  );
};

export default InvoicePage;
