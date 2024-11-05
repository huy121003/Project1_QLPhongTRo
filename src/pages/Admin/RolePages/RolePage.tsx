import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components";
import { RoleModel } from "../../../models/RoleModel";
import { deleteRoleApi, fecthRoleApi } from "../../../api/roleApi";
import DetailRole from "./DetailRole";
import AddRoleModel from "./AddRoleModel";
import EditRoleModal from "./EditRoleModal";
import RoleFilters from "./RoleFilters";
import RoleTable from "./RoleTable";
import ExportToExcel from "./ExportToExcel";
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
      message.success("Role deleted");
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
      />
      <div className="bg-white p-2 rounded-lg m-2 justify-between flex items-center">
        <div></div>

        <div className="flex items-center">
          <ExportToExcel roles={roles} />
          <AddButton onClick={() => setOpenAddRole(true)} label="Add Role" />
        </div>
      </div>

      <DetailRole
        openDetailRole={openDetailRole}
        setOpenDetailRole={setOpenDetailRole}
        record={record}
      />
      <RoleTable
        roles={roles}
        onDeleteRole={onDeleteRole}
        setOpenDetailRole={setOpenDetailRole}
        setOpenEditRole={setOpenEditRole}
        setRecord={setRecord}
        isLoading={isLoading}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
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
