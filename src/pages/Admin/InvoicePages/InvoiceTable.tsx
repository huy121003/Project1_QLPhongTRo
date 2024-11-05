import React, { useState } from "react";
import { ColumnSelector, DeleteModal } from "../../../components";
import { Button, Popconfirm } from "antd";
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";
import { getInvoiceStatusColor } from "../../../utils/getMethodColor";
import TableComponent from "../../../components/TableComponent";
interface Props {
  invoices: InvoiceModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onPaymentConfirm: (record: InvoiceModel) => Promise<void>;
  setOpenDetailInvoice: (value: boolean) => void;
  setRecord: (value: InvoiceModel) => void;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteInvoice: (record: InvoiceModel) => Promise<void>;
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
      title: "Month",
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

  return (
    <div className="bg-white p-2 rounded-lg m-4">
      <div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
      </div>
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
  );
};
export default InvoiceTable;
