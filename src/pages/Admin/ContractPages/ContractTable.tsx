import { useState } from "react";
import {
  ColumnSelector,
  DeleteModal,
  TableComponent,
} from "../../../components";
import { IContract, IRoom } from "../../../interfaces";
import { ContractStatus } from "../../../enums";
import { useTheme } from "../../../contexts/ThemeContext";
import { getContractStatusColor } from "../../../utils/getMethodColor";
import { Button, Popconfirm } from "antd";
import downloadContractPDF from "../../../utils/generateContractPDF";
interface Props {
  contracts: IContract[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  setOpenDetailContract: (value: boolean) => void;
  setRecord: (value: IContract) => void;
  handleCancelContract: (id: string, roomId: string) => void;
  onDelete: (record: IContract) => Promise<void>;
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
  onDelete,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";

  const columns = [
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (_: any, record: IContract) => record?.room?.roomName,
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (_: any, record: IContract) => record?.tenant?.name,
    },
    {
      title: "Deposit Amount",
      dataIndex: "depositAmount",
      key: "depositAmount",
      render: (_: any, record: IContract) => (
        <p>{record?.depositAmount.toLocaleString()}đ</p>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: string) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`font-bold px-2 py-1 ${getContractStatusColor(status)}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IContract) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setOpenDetailContract(true);
              setRecord(record);
            }}
            icon={
              <i
                className="fa-solid fa-eye text-xl
              text-blue-500
              "
              />
            }
          >
            Detail
          </Button>
          <Button
            icon={<i className="fa-solid fa-print text-orange-600 text-xl"></i>}
            onClick={() => {
              if (record) downloadContractPDF(record);
            }}
          >
            Print
          </Button>
          {record?.status === ContractStatus.ACTIVE && (
            <Popconfirm
              title="Cancel Contract"
              description="Are you sure you want to cancel this contract?"
              onConfirm={() =>
                handleCancelContract(record._id, record?.room?._id)
              }
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                icon={
                  <i
                    className="fa-solid fa-house-circle-xmark
                          text-red-600
                             "
                  ></i>
                }
                className=" transition"
              >
                Cancel
              </Button>
            </Popconfirm>
          )}
          {record?.status !== ContractStatus.ACTIVE && (
            <DeleteModal
              onConfirm={(record) => onDelete(record)}
              record={record}
            />
          )}
        </div>
      ),
      width: 100,
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
        data={contracts}
        isLoading={isLoading}
        onChange={onChange}
        current={current}
        pageSize={pageSize}
        total={total}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};
export default ContractTable;