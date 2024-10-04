import { Table, Dropdown, Button, Input, Menu } from "antd";

import TenantModel from "../../models/TenantModel";
import React from "react";

import AddTenantModal from "./AddTenantModal";

import EditTenantModal from "./EditTenantModal";
import {
  CustomSort,
  ColumnSelector,
  AddButton,
  ActionButton,
  DeleteModal,
} from "../../components/index";
import SearchDropdown from "../../components/SearchDropdown";

const { Search } = Input;
const column=[
  { label: "ID", key: "TenantId" },
  { label: "Name", key: "TenantName" },
  { label: "Email", key: "TenantEmail" },
  { label: "Phone", key: "TenantPhone" },
  { label: "Address", key: "TenantAddress" },
  { label: "CCCD", key: "TenantCCCD" },
  { label: "Birthday", key: "TenantBirthDay" },
  { label: "Job", key: "TenantJob" },
  { label: "Action", key: "action" },
]
const tenantRows: TenantModel[] = [
  {
    TenantId: "1",
    TenantName: "Tenant 1",
    TenantPhone: "0123456789",
    TenantEmail: "abc1@gmail.com",
    TenantAddress: "Address 1",
    TenantCCCD: "CCCD1",
    TenantBirthDay: "2001/01/01",
    TenantJob: "Job 1",
  },
  {
    TenantId: "2",
    TenantName: "Tenant 2",
    TenantPhone: "0123456789",
    TenantEmail: "",
    TenantAddress: "Address 2",
    TenantCCCD: "CCCD2",
    TenantBirthDay: "2002/02/02",
    TenantJob: "Job 2",
  },
  {
    TenantId: "3",
    TenantName: "Tenant 3",
    TenantPhone: "0123456789",
    TenantEmail: " fefe",
    TenantAddress: "Address 3",
    TenantCCCD: "CCCD3",
    TenantBirthDay: "2000/09/11",
    TenantJob: "Job 3",
  },
];

function TenantPage() {
  const [filteredTenants, setFilteredTenants] = React.useState(tenantRows);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddTenant, setOpenAddTenant] = React.useState(false);
  const [openUpdateTenant, setOpenUpdateTenant] = React.useState(false);
  const [selectedTenant, setSelectedTenant] =
    React.useState<TenantModel | null>(null);

  // Trạng thái quản lý các cột hiển thị
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([
    "TenantId",
    "TenantName",
    "TenantEmail",
    "TenantPhone",
    "action",
  ]);

  const handleSort = (key: string) => {
    const sortedTenants = [...filteredTenants].sort((a, b) => {
      if (key === "name") {
        return a.TenantName.localeCompare(b.TenantName);
      }
      if (key === "birthday") {
        return (
          new Date(a.TenantBirthDay).getTime() -
          new Date(b.TenantBirthDay).getTime()
        );
      }
      return 0;
    });
    setFilteredTenants(sortedTenants);
  };

  const handleSearch = (value: string, criteria: string) => {
    const filtered = tenantRows.filter((tenant) => {
      if (criteria === "name") {
        return tenant.TenantName.toLowerCase().includes(value.toLowerCase());
      } else if (criteria === "email") {
        return tenant.TenantEmail.toLowerCase().includes(value.toLowerCase());
      } else if (criteria === "phone") {
        return tenant.TenantPhone.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setFilteredTenants(filtered);
  };
  

  const onEditTenant = (tenant: TenantModel) => {
    setSelectedTenant(tenant);
    setOpenUpdateTenant(true);
  };

  return (
    <>
      <div className="md:flex justify-end bg-white p-2 w-full">
        <div className="flex">
          <CustomSort
            columns={[
              { label: "Name", key: "name" },
              { label: "Birthday", key: "birthday" },
            ]}
            onSort={handleSort}
          />
          <SearchDropdown
        criteriaOptions={[
          { label: "By name", value: "name" },
          { label: "By email", value: "email" },
          { label: "By phone", value: "phone" },
        ]}
        onSearch={handleSearch}
        placeholder="Input..."
      />
        </div>
        <ColumnSelector
          columns={column}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
        <AddButton onClick={() => setOpenAddTenant(true)} label="Add tenant" />
        {/* Sử dụng ColumnSelector */}
      </div>

      <div className="bg-white p-2 rounded-lg m-1">
        <Table
       className="text-xl"
          columns={[
            { title: "ID", dataIndex: "TenantId", key: "id" },
            { title: "Name", dataIndex: "TenantName", key: "name" },
            { title: "Email", dataIndex: "TenantEmail", key: "email" },
            { title: "Phone", dataIndex: "TenantPhone", key: "phone" },
            {
              title: "Address",
              dataIndex: "TenantAddress",
              key: "address",
            },

            { title: "CCCD", dataIndex: "TenantCCCD", key: "cccd" },
            {
              title: "Birthday",
              dataIndex: "TenantBirthDay",
              key: "birthday",
            },
            { title: "Job", dataIndex: "TenantJob", key: "job" },
            {
              title: "Action",
              dataIndex: "action",
              key: "x",
              render: (_: any, record: TenantModel) => (
                <ActionButton
                  item={record}
                  onEdit={onEditTenant}
                  onDelete={() => setOpenDelete(true)}
                />
              ),
            },
          ].filter((column) => visibleColumns.includes(column.dataIndex || ""))}
          dataSource={filteredTenants}
        />
      </div>

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={() => {
          /* Add your confirm logic here */
        }}
      />
      <AddTenantModal
        openAddTenant={openAddTenant}
        setOpenAddTenant={setOpenAddTenant}
      />
      <EditTenantModal
        openEditTenant={openUpdateTenant}
        setOpenEditTenant={setOpenUpdateTenant}
        selectedTenant={selectedTenant}
      />
    </>
  );
}

export default TenantPage;
