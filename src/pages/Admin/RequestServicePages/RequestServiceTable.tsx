import React, { useState } from "react";
import { IRegisterService } from "../../../interfaces";
import { useTheme } from "../../../contexts/ThemeContext";
import { RegisterServiceStatus } from "../../../enums";
import { Button, Pagination, Popconfirm, Spin } from "antd";
import dayjs from "dayjs";
import { ColumnSelector, TableComponent } from "../../../components";
import { getRequestServiceStatusColor } from "../../../utils/getMethodColor";
interface Props {
  registerService: IRegisterService[];
  total: number;
  currentPage: number;
  pageSize: number;
  onChange: (page: number, pageSize?: number) => void;
  onApprove: (id: string, type: boolean) => void;
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}
const RequestServiceTable: React.FC<Props> = ({
  registerService,
  total,
  currentPage,
  pageSize,
  onChange,
  onApprove,
  loading: isLoading,
  onDelete,
}) => {
  const columns = [
    {
      title: "Tenant",
      dataIndex: "user",
      key: "user",
      render: (_: any, record: IRegisterService) => record?.user?.name,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (_: any, record: IRegisterService) => record?.room?.roomName,
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_: any, record: IRegisterService) =>
        record?.service?.serviceName,
    },
    {
      title: "Implementation Date",
      dataIndex: "implementationDate",
      key: "implementationDate",
      render: (_: any, record: IRegisterService) =>
        dayjs(record?.implementationDate).format("DD/MM/YYYY"),
    },
    {
      title: "Request ",
      dataIndex: "type",
      key: "type",
      render: (_: any, record: IRegisterService) => (
        <p
          className={`${
            record?.type ? "text-green-500 font-bold" : "text-red-500 font-bold"
          }`}
        >
          {record?.type ? "REGISTER" : "UNREGISTER"}
        </p>
      ),
    },
    {
      title: "Excuting Date",
      dataIndex: "executeNow",
      key: "executeNow",
      render: (_: any, record: IRegisterService) => (
        <p>{record?.executeNow ? "Now" : "Next Month"}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: IRegisterService) => (
        <p
          className={`${getRequestServiceStatusColor(
            record?.status
          )} font-bold`}
        >
          {record?.status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IRegisterService) => (
        <div className="flex justify-around">
          {record?.status === RegisterServiceStatus.PENDING && (
            <Popconfirm
              title={
                !record?.type
                  ? "Approve UnRegistration"
                  : "Approve Registration"
              }
              description={`Are you sure you want to approve this ${
                !record?.type ? "unregistration" : "registration"
              }?`}
              onConfirm={() => onApprove(record?._id, record?.type)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                className="mt-4"
                icon={
                  <i className="fa-solid fa-check text-green-500 text-xl font-bold"></i>
                }
              >
                Approve
              </Button>
            </Popconfirm>
          )}
          {/* {service.status === RegisterServiceStatus.SUCCESS && (
                  <DeleteModal
                    onConfirm={() => onDelete(service._id)}
                    record={service}
                  />
                )} */}
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
        data={registerService}
        isLoading={isLoading}
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};
export default RequestServiceTable;
