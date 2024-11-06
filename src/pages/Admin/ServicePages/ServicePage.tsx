import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components";

import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

import { deleteServiceApi, fetchServiceApi } from "../../../api/serviceApi";

import { ServiceModel } from "../../../models/ServiceModel";

import DetailService from "./DetailService";
import ServiceFilters from "./ServiceFilters";

import ServiceTable from "./ServiceTable";
import ExportToExcel from "./ExportToExcel";

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([]);

  const [openAddService, setOpenAddService] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);
  const [openDetailService, setOpenDetailService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // New state for the record to delete
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    serviceName: "",
    price: null,
    unit: "",
  });
  const getService = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      sort: sorted,
    };

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `/${value}/i`;
      }
    });
    const query = new URLSearchParams(queryParams).toString();

    setIsLoading(true);
    const res = await fetchServiceApi(query);
    setIsLoading(false);
    if (res.data.result && res) {
      setServices(res.data.result);

      setTotal(res.data.meta.totalDocument); // Ensure total is set correctly
    } else {
      message.error(res.message);
    }
  };
  // Fetch services function
  useEffect(() => {
    getService();
  }, [
    current,
    pageSize,
    sorted,
    searchParams,
    openAddService,

    openEditService,
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

  const onDeleteService = async (record: any) => {
    const res = await deleteServiceApi(record._id);
    if (res.statusCode === 200) {
      message.success("Service deleted");
      getService();
      setCurrent(1);
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <div className="justify-end  w-full">
        <ServiceFilters
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          sorted={sorted}
        />
        <div className="bg-white mx-2  rounded-lg shadow-lg border border-gray-200 mt-2  justify-between flex items-center">
          <div></div>
          <div className="flex items-center">
            <ExportToExcel services={services} />
            <AddButton
              onClick={() => setOpenAddService(true)}
              label="Add Service"
            />
          </div>
        </div>
        <ServiceTable
          services={services}
          onDeleteService={onDeleteService}
          setOpenDetailService={setOpenDetailService}
          setOpenEditService={setOpenEditService}
          setRecord={setRecord}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
        />
      </div>

      <AddServiceModal
        openAddService={openAddService}
        setOpenAddService={setOpenAddService}
      />
      <EditServiceModal
        openEditService={openEditService}
        setOpenEditService={setOpenEditService}
        service={record}
      />
      <DetailService
        openDetailService={openDetailService}
        setOpenDetailService={setOpenDetailService}
        record={record}
      />
    </>
  );
}

export default ServicePage;
