import React, { useState } from "react";
import ContractModel, { ContractStatus } from "../../../models/ContractModel";
import { Button, Popconfirm } from "antd";
import { getContractStatusColor } from "../../../utils/getMethodColor";
import TableComponent from "../../../components/TableComponent";
import { ColumnSelector } from "../../../components";
interface Props {
  contracts: ContractModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  setOpenDetailContract: (value: boolean) => void;
  setRecord: (value: ContractModel) => void;
  handleCancelContract: (id: string, roomId: string) => void;
}

const ContractTable: React.FC<Props> = ({
  contracts,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  setOpenDetailContract,
  setRecord,
  handleCancelContract,
}) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: ContractModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailContract(true);
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
      title: "Innkeeper",
      dataIndex: "innkeeper",
      key: "innkeeper",
      render: (innkeeper: any) => <p>{innkeeper.name}</p>,
    },

    {
      title: "Deposit Amount",
      dataIndex: "depositAmount",
      key: "depositAmount",
      render: (depositAmount: number) => (
        <span>{depositAmount.toLocaleString()} đ</span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <p className={`${getContractStatusColor(status)} font-bold`}>
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ContractModel) => (
        <div>
          {record.status !== ContractStatus.CANCELED &&
            record.status !== ContractStatus.EXPIRED && (
              <Popconfirm
                title="Cancel a contract"
                description="Are you sure you will cancel this contract?"
                // onCancel={() => message.error("Click on No")}
                onConfirm={() =>
                  handleCancelContract(record._id, record.room._id)
                }
                okText="YES"
                cancelText="No"
                placement="leftBottom"
              >
                <Button
                  icon={
                    <i className="fa-solid fa-house-circle-xmark text-red-600 text-xl"></i>
                  }
                />
              </Popconfirm>
            )}
        </div>
      ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );

  return (
    <div>
      <div className="bg-white p-2 rounded-lg m-4">
        <div>
          <ColumnSelector
            columns={columns}
            visibleColumns={visibleColumns}
            onChangeVisibleColumns={setVisibleColumns}
          />
        </div>
        <TableComponent
          data={contracts}
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
  );
};

export default ContractTable;
