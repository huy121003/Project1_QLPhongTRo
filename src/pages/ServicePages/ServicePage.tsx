import { Radio, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components";

import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

import { deleteServiceApi, fetchServiceApi } from "../../services/serviceApi";
import SearchFilters from "../../components/SearchFilter";
import { ServiceModel, ServiceType } from "../../models/ServiceModel";

import DetailService from "./DetailService";

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);
  const [openDetailService, setOpenDetailService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // New state for the record to delete
  const [paginate, setPaginate] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
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
      render: (type: string) =>
        type === ServiceType.Electricity ? (
          <p className="text-orange-600 font-bold">{ServiceType.Electricity}</p>
        ) : type === ServiceType.Water ? (
          <p className="text-purple-600 font-bold">{ServiceType.Water}</p>
        ) : type === ServiceType.Internet ? (
          <p className="text-blue-600 font-bold">{ServiceType.Internet}</p>
        ) : (
          <p className="text-pink-600 font-bold">{ServiceType.Other}</p>
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
            setRecord(record);
            setOpenEditService(true);
          }}
          onDelete={() => {
            setRecord(record);
            setOpenDelete(true);
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
    serviceName: "",
    price: null,
    unit: "",
  });

  // Fetch services function
  useEffect(() => {
    const getService = async () => {
      const queryParams: Record<string, any> = {
        currentPage: paginate.current,
        pageSize: paginate.pageSize,
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
        setPaginate((prev) => ({
          ...prev,
          total: res.data.meta.totalDocument,
        })); // Ensure total is set correctly
      } else {
        message.error(res.message);
      }
    };
    getService();
  }, [
    paginate.current,
    paginate.pageSize,
    sorted,
    searchParams,
    openAddService,
    openDelete,
    openEditService,
  ]);

  const onChange = (pagination: any) => {
    if (pagination.current !== paginate.current && pagination) {
      setPaginate((prev) => ({ ...prev, current: pagination.current }));
    }
    if (pagination.pageSize !== paginate.pageSize && pagination) {
      setPaginate((prev) => ({
        ...prev,
        pageSize: pagination.pageSize,
        current: 1, // Reset to first page when changing page size
      }));
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
            { label: "Price", field: "price", type: "text" },
            { label: "Unit", field: "unit", type: "text" },
            { label: "Type", field: "type", type: "select", options: [
              {value:"",label:"All Type"},
              {value:ServiceType.Electricity,label:ServiceType.Electricity},
              {value:ServiceType.Water,label:ServiceType.Water},
              {value:ServiceType.Internet,label:ServiceType.Internet},
              {value:ServiceType.Other,label:ServiceType.Other},
            ] },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="serviceName" className="font-bold">
                By Name
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
          <AddButton
            onClick={() => setOpenAddService(true)}
            label="Add Service"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <Table
            rowKey="_id"
            loading={isLoading}
            dataSource={services} // Use services from the state
            columns={columns.filter((column) =>
              visibleColumns.includes(column.dataIndex)
            )}
            pagination={{
              current: paginate.current,
              pageSize: paginate.pageSize,
              total: paginate.total,

              showSizeChanger: true,
              pageSizeOptions: [5, 10, 20, 50, 100, 200],
            }}
            onChange={onChange}
          />
        </div>
      </div>

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={onDeleteService}
        record={record}
      />
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
