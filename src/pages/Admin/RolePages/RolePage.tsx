import { Radio, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../../components";
import SearchFilters from "../../../components/SearchFilter";

import { RoleModel } from "../../../models/RoleModel";
import { deleteRoleApi, fecthRoleApi } from "../../../services/roleApi";

import DetailRole from "./DetailRole";
import AddRoleModel from "./AddRoleModel";
import EditRoleModal from "./EditRoleModal";
function RolePage() {
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [openDetailRole, setOpenDetailRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // For delete confirmation
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: RoleModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailRole(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <p
          className={`border ${
            name === "SUPER ADMIN"
              ? "border-red-600 bg-red-200 text-red-600"
              : name === "NORMAL USER"
              ? "border-green-600 bg-green-200 text-green-600"
              : "border-blue-600 bg-blue-200 text-blue-600"
          } text-center rounded border-2 w-[120px] p-2`}
        >
          {name}
        </p>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    // { title: "Permissions", dataIndex: "permissions", key: "permissions" , render: (permissions: string[]) => (
    //    permissions.map((permission) => <p key={permission}>{permission}</p>)
    //   )},
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) =>
        record.name === "SUPER ADMIN" ||
        record.name === "NORMAL USER" ? null : (
          <ActionButton
            item={record}
            onEdit={() => {
              setOpenEditRole(true), setRecord(record);
            }}
            onDelete={() => {
              setOpenDelete(true);
              setRecord(record);
            }}
          />
        ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    name: "",
  });
  useEffect(() => {
    const getRoles = async () => {
      const queryParams: Record<string, any> = {
        current: current,
        pageSize: pageSize,
        sort: sorted,
      };
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams[key] = `/${value}/i`;
      });
      const query = new URLSearchParams(queryParams).toString();
      setIsLoading(true);
      const response = await fecthRoleApi(query);
      setIsLoading(false);
      if (response.data.result) {
        setRoles(response.data.result);
        setTotal(response.data.meta.total);
      } else {
        message.error(response.message);
      }
    };
    getRoles();
  }, [
    current,
    pageSize,
    sorted,
    searchParams,
    openAddRole,
    openDelete,
    openEditRole,
  ]);
  const onChange = (pagination: any) => {
    if (pagination.current !== current) setCurrent(pagination.current);
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
  };
  const onDeleteRole = async (record: any) => {
    const response = await deleteRoleApi(record._id);
    if (response.data) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <div className="justify-end p-2 w-full">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[{ label: "Role Name", field: "name", type: "text" }]}
      />
      <div className="bg-white p-2 rounded-lg m-2">
        <h2 className="font-bold text-xl my-3">Sort by</h2>
        <Radio.Group onChange={handleSortChange} value={sorted}>
          <Space direction="horizontal">
            <Radio value="name">Role Name</Radio>
            <Radio value="createdAt">Created At</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="bg-white p-2 rounded-lg m-2 justify-between flex">
        <div>
          <ColumnSelector
            columns={columns}
            visibleColumns={visibleColumns}
            onChangeVisibleColumns={setVisibleColumns}
          />
        </div>
        <AddButton onClick={() => setOpenAddRole(true)} label="Add Role" />
      </div>
      <div className="bg-white p-2 rounded-lg m-2">
        <Table
          loading={isLoading}
          dataSource={roles}
          columns={columns.filter((column) =>
            visibleColumns.includes(column.dataIndex)
          )}
          onChange={onChange}
          pagination={{
            current: current,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100, 200],
          }}
        />
      </div>
      <DetailRole
        openDetailRole={openDetailRole}
        setOpenDetailRole={setOpenDetailRole}
        record={record}
      />
      <AddRoleModel openAddRole={openAddRole} setOpenAddRole={setOpenAddRole} />
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={onDeleteRole}
        record={record}
      />
      <EditRoleModal openEditRole={openEditRole} setOpenEditRole={setOpenEditRole} record={record} />
    </div>
  );
}

export default RolePage;
