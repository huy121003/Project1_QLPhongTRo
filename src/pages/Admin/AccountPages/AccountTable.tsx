import React, { useState } from "react";
import AccountModel, { Gender } from "../../../models/AccountModel";
import { ColumnSelector, DeleteModal } from "../../../components";
import { Button } from "antd";
import TableComponent from "../../../components/TableComponent";
interface Props {
  accounts: AccountModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteAccount: (record: AccountModel) => Promise<void>;
  setOpenEditAccount: (value: boolean) => void;
  setOpenDetailAccount: (value: boolean) => void;
  setRecord: (value: AccountModel) => void;
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
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: AccountModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailAccount(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    { title: "UserName", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "IdCard", dataIndex: "idCard", key: "idCard" },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday: string) => new Date(birthday).toLocaleDateString(),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (role: string) => (
        <p
          className={`border ${
            role === "SUPER ADMIN"
              ? "border-red-600 bg-red-200 text-red-600"
              : role === "NORMAL USER"
              ? "border-green-600 bg-green-200 text-green-600"
              : "border-blue-600 bg-blue-200 text-blue-600"
          } text-center rounded border-2 w-[120px] p-2`}
        >
          {role}
        </p>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) =>
        gender === Gender.Male ? (
          <p className="text-green-600 font-bold ">{gender}</p>
        ) : gender === Gender.Female ? (
          <p className=" text-pink-600 font-bold ">{gender}</p>
        ) : (
          <p className="  text-purple-600 font-bold ">{gender}</p>
        ),
    },
    {
      title: "Create at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: AccountModel) =>
        record.email === "admin@gmail.com" ? null : (
          <div className="gap-2 flex">
            <Button
              icon={
                <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
              }
              onClick={() => {
                setOpenEditAccount(true), setRecord(record);
              }}
            />

            <DeleteModal
              onConfirm={(record) => onDeleteAccount(record)} // Pass the delete function
              record={record} // Pass the record to delete
            />
          </div>
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
        data={accounts}
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

export default AccountTable;
