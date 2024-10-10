import { Radio, Space, Table, Input, Select, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components"; // Change to CustomModal
import TenantModel from "../../models/TenantModel";
import { deleteAcountApi, fecthAccountApi } from "../../services/accountApi";
import SearchFilters from "../../components/SearchFilter";
import AddAccountModal from "./AddAccountModal";

const { Option } = Select;

function AccountPage() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listAccount, setListAccount] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "name",
    "_id",
    "email",
    "roleName",
    "action",
  ]);
  const [sorted, setSorted] = useState<string>("name");
  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
    "role.name": "",
    gender: "",
  });
  const [recordToDelete, setRecordToDelete] = useState<any>(null); // New state for the record to delete

  // Fetch accounts function
  const getAccount = async () => {
    const queryParams: Record<any, any> = {
      current: current,
      pageSize: pageSize,
      populate: "role",
      fields: "role.name",
      sort: sorted,
    };

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `/${value}/i`;
      }
    });

    const query = new URLSearchParams(queryParams).toString();
    setIsLoading(true);

    const res = await fecthAccountApi(query);
    setIsLoading(false);
    if (res.data.result) {
      const formattedAccounts = res.data.result.map((account: any) => ({
        ...account,
        roleName: account.role?.name || "Unknown Role",
        createAt: new Date(account.createdAt).toLocaleDateString("vi-VN"),
      }));
      console.log(formattedAccounts);
      setListAccount(formattedAccounts);
      setTotal(res.data.meta.total);
      // message.success()
    } else message.error(res.message);
  };

  useEffect(() => {
    getAccount();
  }, [current, pageSize, sorted, searchParams]);

  const onChange = (pagination: any) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
    console.log("aaa", e.target.value);
  };

  const onEditTenant = (tenant: TenantModel) => {
    // Logic xử lý chỉnh sửa tenant
  };
  const onDeleteAccount = async (record: any) => {
    const res = await deleteAcountApi(record._id);
    if (res.statusCode === 200) {
      message.success(res.message);
      getAccount();
    } else message.error(res.message);
  };

  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "UserName", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "IdCard", dataIndex: "idCard", key: "idCard" },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (role: string) => (
        <p
          className={`border ${
            role === "SUPER ADMIN"
              ? "border-red-600 bg-red-200 text-red-600"
              : role === "NORMAL USER" &&
                "border-green-600 bg-green-200 text-green-600"
          } text-center rounded-xl w-[120px] p-1`}
        >
          {role}
        </p>
      ),
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Create at", dataIndex: "createAt", key: "createAt" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) =>
        record.email === "admin@gmail.com" ? null : (
          <ActionButton
            item={record}
            onEdit={() => onEditTenant(record)}
            onDelete={() => {
              setRecordToDelete(record); // Set the current record to delete
              setOpenDelete(true);
            }}
          />
        ),
    },
  ];

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "Name", field: "name", type: "text" },
            { label: "Email", field: "email", type: "text" },
            // {
            //   label: "Role",
            //   field: "role.name",
            //   type: "select",
            //   options: [
            //     { value: "", label: "All Role" },
            //     { value: "SUPER ADMIN", label: "Super Admin" },
            //     { value: "NORMAL USER", label: "Normal User" },
            //   ],
            // },
            {
              label: "Gender",
              field: "gender",
              type: "select",
              options: [
                { value: "", label: "All Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ],
            },
          ]}
        />

        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="name">By Name</Radio>
              <Radio value="email">By Email</Radio>
              <Radio value="role">By Role</Radio>
              <Radio value="-createAt">By CreateAt</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="bg-white p-2 rounded-lg m-2 justify-between">
          <ColumnSelector
            columns={columns}
            visibleColumns={visibleColumns}
            onChangeVisibleColumns={setVisibleColumns}
          />
          <AddButton
            onClick={() => setOpenAddAccount(true)}
            label="Add Account"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <Table
            loading={isLoading}
            dataSource={listAccount}
            columns={columns.filter((column) =>
              visibleColumns.includes(column.dataIndex)
            )}
            pagination={{
              current,
              pageSize,
              total,
              onChange,
              showSizeChanger: true,
              pageSizeOptions: [1, 2, 5, 10, 20],
            }}
          />
        </div>
      </div>

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={onDeleteAccount} // Pass the delete function
        record={recordToDelete} // Pass the record to delete
      />
      <AddAccountModal
        openAddAccount={openAddAccount}
        setOpenAddAccount={setOpenAddAccount}
      />
    </>
  );
}

export default AccountPage;
