import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { AddButton, ColumnSelector, DeleteModal } from "../../../components";

import { RoleModel } from "../../../models/RoleModel";
import { deleteRoleApi, fecthRoleApi } from "../../../services/roleApi";

import DetailRole from "./DetailRole";
import AddRoleModel from "./AddRoleModel";
import EditRoleModal from "./EditRoleModal";
import RoleFilters from "./RoleFilters";
import TableComponent from "../../../components/TableComponent";
import { getRoleColor } from "../../../utils/getMethodColor";
function RolePage() {
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

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
            getRoleColor(name) as string
          } text-center rounded border-2 w-[120px] p-2`}
        >
          {name}
        </p>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },

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
          <div className="gap-2 flex">
            <Button
              icon={
                <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
              }
              onClick={() => {
                setOpenEditRole(true), setRecord(record);
              }}
            />

            <DeleteModal
              onConfirm={onDeleteRole} // Pass the delete function
              record={record} // Pass the record to delete
            />
          </div>
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
  useEffect(() => {
    getRoles();
  }, [current, pageSize, sorted, searchParams, openAddRole, openEditRole]);
  const onChange = (pagination: any) => {
    if (pagination.current !== current) setCurrent(pagination.current);
    if (pagination.pageSize !== pageSize) {
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
  const onDeleteRole = async (record: any) => {
    const response = await deleteRoleApi(record._id);
    if (response.data) {
      message.success(response.message);
      getRoles();
    } else {
      message.error(response.message);
    }
  };

  return (
    <div className="justify-end p-2 w-full">
      <RoleFilters
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
        <AddButton onClick={() => setOpenAddRole(true)} label="Add Role" />
      </div>
      <div className="bg-white p-2 rounded-lg m-2">
        <TableComponent
          data={roles}
          columns={columns}
          visibleColumns={visibleColumns}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
        />
      </div>
      <DetailRole
        openDetailRole={openDetailRole}
        setOpenDetailRole={setOpenDetailRole}
        record={record}
      />
      <AddRoleModel openAddRole={openAddRole} setOpenAddRole={setOpenAddRole} />

      <EditRoleModal
        openEditRole={openEditRole}
        setOpenEditRole={setOpenEditRole}
        record={record}
      />
    </div>
  );
}

export default RolePage;
