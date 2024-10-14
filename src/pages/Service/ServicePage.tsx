import { Radio, Space, Table, Input, Select, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components"; // Change to CustomModal
import TenantModel from "../../models/TenantModel";

import SearchFilters from "../../components/SearchFilter";
import { deleteServiceApi, fetchServiceApi } from "../../services/serviceApi";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";

function ServicePage() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listService, setListService] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "serviceName",
    "_id",
    "description",
    "price",
    "unit",
  ]);
  const [sorted, setSorted] = useState<string>("serviceName");
  const [searchParams, setSearchParams] = useState({
    serviceName: "",
    price: null,
  });
  const [record, setRecord] = useState<any>(null); // New state for the record to delete

  // Fetch accounts function
  const getService = async () => {
    const queryParams: Record<any, any> = {
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

    if (res.data.result) {
      const formattedServices = res.data.result.map((service: any) => ({
        ...service,
        // key: service._id
      }));

      setListService(formattedServices);
      setTotal(res.data.meta.totalPage);
    } else message.error(res.message);
  };

  useEffect(() => {
    getService();
  }, [
    current,
    pageSize,
    sorted,
    searchParams,
    openAddService,
    openDelete,
    openEditService,
  ]);

  const onChange = (pagination: any) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      console.log("dddd", pagination.pageSize);
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
      getService();
    } else message.error(res.message);
  };

  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "ServiceName", dataIndex: "serviceName", key: "serviceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <ActionButton
          item={record}
          onEdit={() => {
            setRecord(record); // Set the current record to edit
            setOpenEditService(true);
          }}
          onDelete={() => {
            setRecord(record); // Set the current record to delete
            setOpenDelete(true);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "serviceName", field: "serviceName", type: "text" },
            { label: "price", field: "price", type: "text" },
            { label: "unit", field: "unit", type: "text" },
          ]}
        />

        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="serviceName">By Name</Radio>
              <Radio value="price">By Price Increase</Radio>
              <Radio value="-price">By Price Decrease</Radio>
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
            loading={isLoading}
            dataSource={listService}
            columns={columns.filter((column) =>
              visibleColumns.includes(column.dataIndex)
            )}
            pagination={{
              current,
              pageSize,
              total,
              onChange,
              showSizeChanger: true,
              pageSizeOptions: [1, 2, 5, 10, 20],
            }}
          />
        </div>
      </div>

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={onDeleteService} // Pass the delete function
        record={record} // Pass the record to delete
      />
      <AddServiceModal
        openAddService={openAddService}
        setOpenAddService={setOpenAddService}
      />
      <EditServiceModal
        openEditService={openEditService}
        setOpenEditService={setOpenEditService}
        record={record} // Pass the record to edit
      />
    </>
  );
}

export default ServicePage;
