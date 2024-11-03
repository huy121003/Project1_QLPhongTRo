import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { AddButton, ColumnSelector, DeleteModal } from "../../../components";

import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

import {
  deleteServiceApi,
  fetchServiceApi,
} from "../../../services/serviceApi";

import { ServiceModel } from "../../../models/ServiceModel";

import DetailService from "./DetailService";
import ServiceFilters from "./ServiceFilters";
import TableComponent from "../../../components/TableComponent";
import { getServiceTypeColor } from "../../../utils/getMethodColor";

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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: ServiceModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailService(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    { title: "Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{price.toLocaleString()} đ</p>,
    },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <p className={`${getServiceTypeColor(type)} font-bold`}>{type}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ServiceModel) => (
        <div className="gap-2 flex">
          <Button
            icon={
              <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
            }
            onClick={() => {
              setOpenEditService(true), setRecord(record);
            }}
          />

          <DeleteModal
            onConfirm={onDeleteService} // Pass the delete function
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
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <ServiceFilters
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
            onClick={() => setOpenAddService(true)}
            label="Add Service"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <TableComponent
            data={services}
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

      <AddServiceModal
        openAddService={openAddService}
        setOpenAddService={setOpenAddService}
      />
      <EditServiceModal
        openEditService={openEditService}
        setOpenEditService={setOpenEditService}
        record={record}
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
