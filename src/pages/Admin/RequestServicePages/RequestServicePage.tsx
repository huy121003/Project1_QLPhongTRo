import React, { useEffect } from "react";
import { RegisterServiceStatus } from "../../../enums";
import RegisterServiceFilter from "./RequestServiceFilter";
import { registerServiceAPI } from "../../../api";
import { message, notification } from "antd";
import { IRegisterService } from "../../../interfaces";
import RequestServiceTable from "./RequestServiceTable";
function RequestServicePage() {
  const [registerService, setRegisterService] = React.useState<
    IRegisterService[]
  >([]);
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({
    status: "",
    type: "",
  });
  const [sorted, setSorted] = React.useState<string>("");
  const getRegisterService = async () => {
    const queryParams: Record<string, any> = {
      currentPage: currentPage,
      pageSize: pageSize,
      // status: status,
      sort: sorted,
    };
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `${value}`;
      }
    });
    const query = new URLSearchParams(queryParams).toString();
    setLoading(true);
    const res = await registerServiceAPI.fetchRegisterServiceApi(query);
    if (res.data) {
      setRegisterService(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
    setLoading(false);
  };
  const deleteRegisterService = async (id: string) => {
    const res = await registerServiceAPI.deleteRegisterServiceApi(id);
    if (res.statusCode === 200) {
      message.success("Delete register service successfully");
      getRegisterService();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
  useEffect(() => {
    getRegisterService();
  }, [currentPage, pageSize, searchParams, sorted]);
  const onChange = (pagination: any) => {
    if (pagination.current !== currentPage && pagination) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  const handleApprove = async (id: string, type: boolean) => {
    const res = await registerServiceAPI.patchRegisterServiceApi(
      id,
      RegisterServiceStatus.APPROVED
    );
    if (res.statusCode === 200) {
      if (type) {
        message.success("Service cancellation approved successfully");
      } else {
        message.success("Service registration approved successfully");
      }
      getRegisterService();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      {" "}
      <h1 className="text-2xl font-bold m-2">Request Service</h1>
      <div className="m-2">
        <RegisterServiceFilter
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          searchParams={searchParams}
          sorted={sorted}
        />
        <RequestServiceTable
          registerService={registerService}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={onChange}
          onApprove={handleApprove}
          loading={loading}
          onDelete={deleteRegisterService}
        />
      </div>
    </>
  );
}

export default RequestServicePage;
