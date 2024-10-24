import React, { useEffect, useState } from "react";
import { Radio, Space, Table, message } from "antd";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components";
import SearchFilters from "../../components/SearchFilter";
import { deleteServiceApi, fetchServiceApi } from "../../services/serviceApi";
import { ServiceModel, ServiceType } from "../../models/ServiceModel";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<any>(null);
  const [recordToEdit, setRecordToEdit] = useState<ServiceModel | null>(null);

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: ServiceType) => (
        <p className={`font-bold ${type === ServiceType.Water ? "text-blue-600" : type === ServiceType.Electricity ? "text-yellow-600" : type === ServiceType.Internet ? "text-green-600" : "text-gray-600"}`}>
          {type}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ServiceModel) => (
        <ActionButton
          item={record}
          onEdit={() => {
            setRecordToEdit(record);
            setOpenEditService(true);
          }}
          onDelete={() => {
            setRecordToDelete(record);
            setOpenDelete(true);
          }}
        />
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((column) => column.dataIndex));
  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    serviceName: "",
    type: "",
    price: "",
  });

  useEffect(() => {
    const getService = async () => {
      const queryParams: Record<string, any> = {
        currentPage: current,
        pageSize: pageSize,
        sort: sorted,
      };
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams[key] = `/${value}/i`;
      });

      const query = new URLSearchParams(queryParams).toString();
      setIsLoading(true);

      const res = await fetchServiceApi(query);
      setIsLoading(false);
      if (res.data.result) {
        setServices(res.data.result);
        setTotal(res.data.meta.totalDocument);
      } else {
        message.error(res.message);
      }
    };
    getService();
  }, [current, pageSize, sorted, searchParams, openAddService, openDelete, openEditService]);

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

  const onDeleteService = async (record: any) => {
    const res = await deleteServiceApi(record._id);
    if (res.statusCode === 200) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "Service Name", field: "serviceName", type: "text" },
            {
              label: "Type",
              field: "type",
              type: "select",
              options: [
                { value: "", label: "All Types" },
                { value: ServiceType.Water, label: ServiceType.Water },
                { value: ServiceType.Electricity, label: ServiceType.Electricity },
                { value: ServiceType.Internet, label: ServiceType.Internet },
                { value: ServiceType.Other, label: ServiceType.Other },
              ],
            },
            { label: "Price", field: "price", type: "text" },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="serviceName" className="font-bold">
                By Service Name
              </Radio>
              <Radio value="type" className="font-bold">
                By Type
              </Radio>
              <Radio value="price" className="font-bold">
                By Price Increase
              </Radio>
              <Radio value="-price" className="font-bold">
                By Price Decrease
              </Radio>
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
          <AddButton onClick={() => setOpenAddService(true)} label="Add Service" />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <Table
            loading={isLoading}
            dataSource={services}
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
      </div>

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={onDeleteService}
        record={recordToDelete}
      />
      <AddServiceModal
        openAddService={openAddService}
        setOpenAddService={setOpenAddService}
      />
      <EditServiceModal
        openEditService={openEditService}
        setOpenEditService={setOpenEditService}
        service={recordToEdit}
      />
    </>
  );
}

export default ServicePage;