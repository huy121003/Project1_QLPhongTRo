import { Button, message } from "antd";
import { useEffect, useState } from "react";
import {
 
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../../components"; // Change to CustomModal

import { deleteAcountApi, fecthAccountApi } from "../../../services/accountApi";
import AddAccountModal from "./AddAccountModal";
import AccountModel, { Gender } from "../../../models/AccountModel";
import EditAccountModal from "./EditAccountModal";
import DetailAccount from "./DetailAccount";
import AccountFilters from "./AccountFilter";
import TableComponent from "../../../components/TableComponent";
function AccountPage() {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
 
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [openDetailAccount, setOpenDetailAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // New state for the record to delete
  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
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
              onConfirm={onDeleteAccount} // Pass the delete function
              record={record} // Pass the record to delete
            />
          </div>
        ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );

  // Fetch accounts function
  const getAccount = async () => {
    const queryParams: Record<string, any> = {
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
      const formattedAccounts = res.data.result.map(
        (account: AccountModel) => ({
          ...account,
          roleName: account.role?.name || "Unknown Role",
        })
      );

      setAccounts(formattedAccounts);
      setTotal(res.data.meta.total);

      // message.success()
    } else message.error(res.message);
  };
  useEffect(() => {
    getAccount();
  }, [
    current,
    pageSize,
    sorted,
    searchParams,
    openAddAccount,
    openEditAccount,
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

  const onDeleteAccount = async (record: any) => {
    const res = await deleteAcountApi(record._id);
    if (res.statusCode === 200) {
      message.success(res.message);
      getAccount();
    } else message.error(res.message);
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <AccountFilters
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          sorted={sorted}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          visibleColumns={visibleColumns}
        />
        <div className="bg-white p-2 rounded-lg m-2 justify-between flex">
          <div>
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChangeVisibleColumns={setVisibleColumns}
            />
          </div>
          <AddButton
            onClick={() => setOpenAddAccount(true)}
            label="Add Account"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
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
      </div>

      <AddAccountModal
        openAddAccount={openAddAccount}
        setOpenAddAccount={setOpenAddAccount}
      />
      <EditAccountModal
        openEditAccount={openEditAccount}
        setOpenEditAccount={setOpenEditAccount}
        record={record}
      />
      <DetailAccount
        openDetailAccount={openDetailAccount}
        setOpenDetailAccount={setOpenDetailAccount}
        record={record}
      />
    </>
  );
}

export default AccountPage;
