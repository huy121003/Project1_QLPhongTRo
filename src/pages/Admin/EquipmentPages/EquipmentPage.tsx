import { Radio, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../../components"; // Change to CustomModal
import {
  deleteEquipmentApi,
  fetchEquipmentApi,
} from "../../../services/eqiupmentApi";
import SearchFilters from "../../../components/SearchFilter";
import AddEquipmentModal from "./AddEquipmentModal";
import EditEquipmentModal from "./EditEquipmentModal";
import { EquipmentModel, EquipmentStatus } from "../../../models/EquipmentModel";
import DetailEquipment from "./DetailEquipment";

function EquipmentPage() {
  //contract list
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);
  //state for modal
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddEquipment, setOpenAddEquipment] = useState(false);
  const [openEditEquipment, setOpenEditEquipment] = useState(false);
  const [openDetailEquipment, setOpenDetailEquipment] = useState(false);
  //state for loading
  const [isLoading, setIsLoading] = useState(false);
  //state for record
  const [record, setRecord] = useState<any>(null); // New state for the record to delete
  //state for pagination
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  //columns
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: EquipmentModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailEquipment(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{price.toLocaleString()} đ</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === EquipmentStatus.New ? (
          <p className="text-orange-600 font-bold">{EquipmentStatus.New}</p>
        ) : status === EquipmentStatus.Old ? (
          <p className="text-purple-600 font-bold">{EquipmentStatus.Old}</p>
        ) : status === EquipmentStatus.Broken ? (
          <p className="text-blue-600 font-bold">{EquipmentStatus.Broken}</p>
        ) : (
          <p className="text-pink-600 font-bold">{EquipmentStatus.Repairing}</p>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: EquipmentModel) => (
        <ActionButton
          item={record}
          onEdit={() => onEditEquipment(record)}
          onDelete={() => {
            setRecord(record);
            setOpenDelete(true);
          }}
        />
      ),
    },
  ];
  //state for visible columns
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  //state for sorted
  const [sorted, setSorted] = useState<string>("");
  //state for search params
  const [searchParams, setSearchParams] = useState({
    name: "",
    price: null,
  });
  // Fetch equipments function
  useEffect(() => {
    const getEquipment = async () => {
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
      const res = await fetchEquipmentApi(query);
      setIsLoading(false);
      if (res.data.result) {
        setEquipments(res.data.result);

        setTotal(res.data.meta.totalDocument);
        //   console.log("pagi",paginate);
      } else {
        message.error(res.message);
      }
    };
    getEquipment();
  }, [
    current,
    pageSize,
    sorted,
    searchParams,
    openAddEquipment,
    openEditEquipment,
    openDelete,
  ]);
  const onChange = (pagination: any) => {
    if (pagination.current !== current && pagination) {
      // paginate hiện tại =prev
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    //console.log("fdfd",pagination);
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
  };
  const onEditEquipment = (record: EquipmentModel) => {
    setOpenEditEquipment(true);
    setRecord(record);
  };
  const onDeleteEquipment = async (record: EquipmentModel) => {
    const response = await deleteEquipmentApi(record._id);
    if (response.statusCode === 200) {
      message.success("Delete Equipment successfully");
    } else {
      message.error(response.message);
    }
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "Name", field: "name", type: "text" },
            { label: "Price", field: "price", type: "text" },
            {
              label: "Status",
              field: "status",
              type: "select",
              options: [
                { value: "", label: "All Status" },
                { value: EquipmentStatus.New, label: EquipmentStatus.New },
                { value: EquipmentStatus.Old, label: EquipmentStatus.Old },
                {
                  value: EquipmentStatus.Broken,
                  label: EquipmentStatus.Broken,
                },
                {
                  value: EquipmentStatus.Repairing,
                  label: EquipmentStatus.Repairing,
                },
              ],
            },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="name" className="font-bold">
                By Name
              </Radio>
              <Radio value="price" className="font-bold">
                By Price Increase
              </Radio>
              <Radio value="-price" className="font-bold">
                By Price Decrease
              </Radio>
              <Radio value="status" className="font-bold">
                By Status
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
            onClick={() => setOpenAddEquipment(true)}
            label="Add Equipment"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <Table
            loading={isLoading}
            columns={columns.filter((column) =>
              visibleColumns.includes(column.key)
            )}
            dataSource={equipments}
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
      <AddEquipmentModal
        openAddEquipment={openAddEquipment}
        setOpenAddEquipment={setOpenAddEquipment}
      />

      <EditEquipmentModal
        openEditEquipment={openEditEquipment}
        setOpenEditEquipment={setOpenEditEquipment}
        record={record}
      />
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        onConfirm={() => onDeleteEquipment(record)}
        record={record}
      />
      <DetailEquipment
        openDetailEquipment={openDetailEquipment}
        setOpenDetailEquipment={setOpenDetailEquipment}
        record={record}
      />
    </>
  );
}

export default EquipmentPage;
