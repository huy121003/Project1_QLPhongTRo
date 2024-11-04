import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components"; // Change to CustomModal

import { deleteAcountApi, fecthAccountApi } from "../../../api/accountApi";
import AddAccountModal from "./AddAccountModal";
import AccountModel from "../../../models/AccountModel";
import EditAccountModal from "./EditAccountModal";
import DetailAccount from "./DetailAccount";
import AccountFilters from "./AccountFilter";

import ExportToExcel from "./ExportToExcel";
import { fecthRoleApi } from "../../../api/roleApi";
import AccountTable from "./AccountTable";
function AccountPage() {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [roles, setRoles] = useState<any[]>([]);
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

  const getRole = async () => {
    const res = await fecthRoleApi("current=1&pageSize=99900");
    if (res.data.result) {
      setRoles(res.data.result);
    }
  };
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
        if (key === "role") {
          queryParams[key] = value;
        } else queryParams[key] = `/${value}/i`;
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
    } else message.error(res.message);
  };
  useEffect(() => {
    getAccount();
    getRole();
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
      message.success("Account deleted");
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
          roles={roles}
        />
        <div className="bg-white p-2 rounded-lg mx-4 justify-between items-center flex">
          <div></div>
          <div className="flex justify-center items-center">
            <ExportToExcel accounts={accounts} />
            <AddButton
              onClick={() => setOpenAddAccount(true)}
              label="Add Account"
            />
          </div>
        </div>
        <AccountTable
          accounts={accounts}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
          onDeleteAccount={onDeleteAccount}
          setOpenEditAccount={setOpenEditAccount}
          setOpenDetailAccount={setOpenDetailAccount}
          setRecord={setRecord}
        />
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
