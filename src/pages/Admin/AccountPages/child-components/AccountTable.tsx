import { useState } from "react";
import { Button } from "antd";
import { IAccount } from "interfaces";
import DeleteModal from "@components/DeleteModal";
import ColumnSelector from "@components/ColumnSelector";
import TableComponent from "@components/TableComponent";
import roleColor from "constants/roleColor";
interface Props {
  accounts: IAccount[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteAccount: (record: IAccount) => Promise<void>;
  setOpenEditAccount: (value: boolean) => void;
  setOpenDetailAccount: (value: boolean) => void;
  setRecord: (value: IAccount) => void;
}
const AccountTable: React.FC<Props> = ({
  accounts,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  onDeleteAccount,
  setOpenDetailAccount,
  setOpenEditAccount,
  setRecord,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: IAccount) => (
        <div className="flex flex-1 items-center gap-2">
          {record?.avatar ? (
            <img
              src={record?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-lg"
            />
          ) : (
            <i className={`fa-solid fa-user-circle text-4xl `} />
          )}
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: any) => (
        <p className={`font-medium ${roleColor(role?.name)}`}>{role?.name}</p>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <div
          className={`font-bold px-2 py-1
        ${isActive ? "0 text-green-600" : "text-red-700"}
        `}
        >
          <i
            className={`fa-solid fa-${
              isActive ? "smile-wink" : "sad-cry"
            } mr-2`}
          ></i>
          {isActive ? "ACTIVE" : "INACTIVE"}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IAccount) => (
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setOpenDetailAccount(true);
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
          {record.email === "admin@gmail.com" ? null : (
            <div className="flex gap-2">
              <Button
                icon={
                  <i
                    className="fa-solid fa-pen-to-square text-xl
                  text-green-600
                  "
                  />
                }
                onClick={() => {
                  setOpenEditAccount(true);
                  setRecord(record);
                }}
                className="transition"
              ></Button>
              <DeleteModal
                onConfirm={(record) => onDeleteAccount(record)}
                record={record}
              />
            </div>
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
        data={accounts}
        isLoading={isLoading}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};
export default AccountTable;
