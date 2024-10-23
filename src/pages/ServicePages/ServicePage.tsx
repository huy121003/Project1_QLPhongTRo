import { Radio, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components";
import {
  deleteServiceApi,
  fetchServicesApi,
} from "../../services/ServiceApi";
import SearchFilters from "../../components/SearchFilter";
import AddServiceModal from "./AddServiceModal";
import ServiceModel from "../../models/ServiceModel";

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<any>(null);

  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "Room Number", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "WiFi Fee", dataIndex: "wifiFee", key: "wifiFee" },
    { title: "Parking Fee", dataIndex: "parkingFee", key: "parkingFee" },
    { title: "Elevator Fee", dataIndex: "elevatorFee", key: "elevatorFee" },
    { title: "Cleaning Fee", dataIndex: "cleaningFee", key: "cleaningFee" },
    { title: "Laundry Fee", dataIndex: "laundryFee", key: "laundryFee" },
    {
      title: "Total Fee",
      key: "totalFee",
      render: (record: ServiceModel) => (
        <span>
          {(
            record.wifiFee +
            record.parkingFee +
            record.elevatorFee +
            record.cleaningFee +
            record.laundryFee
          ).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ServiceModel) => (
        <ActionButton
          item={record}
          onEdit={() => onEditService(record)}
          onDelete={() => {
            setRecordToDelete(record);
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
    roomNumber: "",
  });

  useEffect(() => {
    const getServices = async () => {
      const queryParams: Record<string, any> = {
        current: current,
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

      const res = await fetchServicesApi(query);
      setIsLoading(false);
      if (res.data.result) {
        setServices(res.data.result);
        setTotal(res.data.meta.total);
      } else message.error(res.message);
    };
    getServices();
  }, [current, pageSize, sorted, searchParams, openAddService, openDelete]);

  const onChange = (pagination: any) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
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

  const onEditService = (service: any) => {
    // Logic xử lý chỉnh sửa dịch vụ
  };

  const onDeleteService = async (record: any) => {
    const res = await deleteServiceApi(record._id);
    if (res.statusCode === 200) {
      message.success(res.message);
    } else message.error(res.message);
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "Room Number", field: "roomNumber", type: "text" },
          ]}
        />

        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="roomNumber" className="font-bold">
                By Room Number
              </Radio>
              <Radio value="wifiFee" className="font-bold">
                By WiFi Fee
              </Radio>
              <Radio value="totalFee" className="font-bold">
                By Total Fee
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
            loading={isLoading}
            dataSource={services}
            columns={columns.filter((column) =>
              visibleColumns.includes(column.dataIndex)
            )}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
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
        record={recordToDelete}
      />
      <AddServiceModal
        openAddService={openAddService}
        setOpenAddService={setOpenAddService}
      />
    </>
  );
}

export default ServicePage;