import { useState } from "react";
import { Button, Pagination, Popconfirm, Spin } from "antd";
import { IInvoice } from "interfaces";
import { InvoiceStatus } from "enums";
import invoiceStatusColor from "constants/invoiceStatusColor";
import DeleteModal from "@components/DeleteModal";
import ColumnSelector from "@components/ColumnSelector";
import TableComponent from "@components/TableComponent";

interface Props {
  invoices: IInvoice[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onPaymentConfirm: (record: IInvoice) => Promise<void>;
  setOpenDetailInvoice: (value: boolean) => void;
  setRecord: (value: IInvoice) => void;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteInvoice: (record: IInvoice) => Promise<void>;
}
const InvoiceTable: React.FC<Props> = ({
  invoices,
  isLoading,
  current,
  pageSize,
  total,
  onPaymentConfirm,
  setOpenDetailInvoice,
  setRecord,
  onChange,
  onDeleteInvoice,
}) => {
  const columns = [
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (tenant: any) => <p>{tenant.name}</p>,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room: any) => <p>{room.roomName}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => <p>{description}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => <p>{amount.toLocaleString()} đ</p>,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (month: string) => <p>{month}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: InvoiceStatus) => (
        <p className={`font-bold px-2 py-1 ${invoiceStatusColor(status)}`}>
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IInvoice) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setOpenDetailInvoice(true);
              setRecord(record);
            }}
            icon={
              <i
                className="fa-solid fa-eye text-xl
              text-blue-500
              "
              />
            }
          ></Button>
          <DeleteModal onConfirm={onDeleteInvoice} record={record} />

          {record.status === InvoiceStatus.UNPAID && (
            <Popconfirm
              title="Payment Confirmation"
              description="Are you sure you want to confirm the payment?"
              onConfirm={async () => await onPaymentConfirm(record)}
              okText="Yes"
              cancelText="No"
              placement="leftBottom"
            >
              <Button
                icon={<i className="fa-solid fa-check text-green-500 "></i>}
              >
                <p className="text-green-500 font-bold">Confirm</p>
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
      width: 150,
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  return (
    <div className={` p-2 rounded-lg m-2 `}>
      <div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
      </div>
      <TableComponent
        columns={columns}
        data={invoices}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </div>
  );
};
export default InvoiceTable;
