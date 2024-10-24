import { Radio, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  ColumnSelector,
  DeleteModal,
} from "../../components";
import SearchFilters from "../../components/SearchFilter";
import RoomModel, { RoomStatus, RoomType } from "../../models/RoomModel";
import { deleteRoomApi, fetchRoomApi } from "../../services/roomApis";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";

function RoomPage() {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openEditRoom, setOpenEditRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // For delete confirmation
  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Room Name", dataIndex: "roomName", key: "roomName" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) =>
        type === RoomType.Single ? (
          <p className="text-orange-600 font-bold">{RoomType.Single}</p>
        ) : type === RoomType.Double ? (
          <p className="text-purple-600 font-bold">{RoomType.Double}</p>
        ) : type === RoomType.Quad ? (
          <p className="text-blue-600 font-bold">{RoomType.Quad}</p>
        ) : (
          <p className="text-pink-600 font-bold">{RoomType.Studio}</p>
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{price.toLocaleString()} đ</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === RoomStatus.Available ? (
          <p className="rounded border-2 border-yellow-600 p-2 w-[100px] text-center text-yellow-600 bg-yellow-200">
            {status}
          </p>
        ) : (
          <p className="rounded border-2 border-green-600 p-2 w-[100px] text-center text-green-600 bg-green-200">
            {status}
          </p>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: RoomModel) => (
        <ActionButton
          item={record}
          onEdit={() => onEditRoom(record)} // For editing
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
    roomName: "",
    type: "",
    price: "",
    status: "",
  });

  // Fetch rooms function
  useEffect(() => {
    const getRoom = async () => {
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

      const res = await fetchRoomApi(query);
      console.log(res);
      setIsLoading(false);
      if (res.data.result) {
        setRooms(res.data.result);
        setTotal(res.data.meta.totalDocument);
      } else {
        message.error(res.message);
      }
    };
    getRoom();
  }, [current, pageSize, sorted, searchParams, openAddRoom, openDelete, openEditRoom]);

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
  
  const onDeleteRoom = async (record: any) => {
    const res = await deleteRoomApi(record._id);
    if (res.statusCode === 200) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };
  const onEditRoom = (record: any) => {
    setOpenEditRoom(true);
    setRecord(record);
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <SearchFilters
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          fields={[
            { label: "Room Name", field: "roomName", type: "text" },
            {
              label: "Type",
              field: "type",
              type: "select",
              options: [
                { value: "", label: "All Type" },
                { value: RoomType.Single, label: RoomType.Single },
                { value: RoomType.Double, label: RoomType.Double },
                { value: RoomType.Quad, label: RoomType.Quad },
                { value: RoomType.Studio, label: RoomType.Studio },
              ],
            },
            { label: "Price", field: "price", type: "text" },
            {
              label: "Status",
              field: "status",
              type: "select",
              options: [
                { value: "", label: "All Status" },
                { value: RoomStatus.Available, label: RoomStatus.Available },
                { value: RoomStatus.Occupied, label: RoomStatus.Occupied },
              ],
            },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="roomName" className="font-medium">
                By Room Name
              </Radio>
              <Radio value="type" className="font-medium">
                By Type
              </Radio>
              <Radio value="price" className="font-medium">
                By Price Increase
              </Radio>
              <Radio value="-price" className="font-medium">
                By Price Decrease
              </Radio>
              <Radio value="status" className="font-medium">
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
          <AddButton onClick={() => setOpenAddRoom(true)} label="Add Room"  />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <Table
            loading={isLoading}
            dataSource={rooms}
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
        onConfirm={onDeleteRoom}
        record={record}
      />
      <AddRoomModal openAddRoom={openAddRoom} setOpenAddRoom={setOpenAddRoom} />
      <EditRoomModal
        openEditRoom={openEditRoom}
        setOpenEditRoom={setOpenEditRoom}
        record={record}
      />
    </>
  );
}

export default RoomPage;
