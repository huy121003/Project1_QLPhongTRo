import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { AddButton, ColumnSelector, DeleteModal } from "../../../components";

import RoomModel from "../../../models/RoomModel";
import { deleteRoomApi, fetchRoomApi } from "../../../services/roomApis";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";
import DetailRoom from "./DetailRoom";
import RoomFilters from "./RoomFilters";
import TableComponent from "../../../components/TableComponent";
import {
  getRoomStatusColor,
  getRoomTypeColor,
} from "../../../utils/getMethodColor";

function RoomPage() {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openEditRoom, setOpenEditRoom] = useState(false);
  const [openDetailRoom, setOpenDetailRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // For delete confirmation
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: RoomModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailRoom(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    { title: "Room Name", dataIndex: "roomName", key: "roomName" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <p className={`${getRoomTypeColor(type) as string} font-bold`}>
          {type}
        </p>
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
      render: (status: string) => (
        <p className={`${getRoomStatusColor(status) as string} font-bold`}>
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: RoomModel) => (
        <div className="gap-2 flex">
          <Button
            icon={
              <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
            }
            onClick={() => {
              setOpenEditRoom(true), setRecord(record);
            }}
          />

          <DeleteModal
            onConfirm={onDeleteRoom} // Pass the delete function
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
    roomName: "",
    type: "",
    price: "",
    status: "",
  });
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
    
    setIsLoading(false);
    if (res.data.result) {
      setRooms(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else {
      message.error(res.message);
    }
  };
  // Fetch rooms function
  useEffect(() => {
    getRoom();
  }, [current, pageSize, sorted, searchParams, openAddRoom, openEditRoom]);

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

  const onDeleteRoom = async (record: any) => {
    const res = await deleteRoomApi(record._id);
    if (res.statusCode === 200) {
      message.success("Room deleted");
      getRoom();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <div className="justify-end p-2 w-full">
        <RoomFilters
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
          <AddButton onClick={() => setOpenAddRoom(true)} label="Add Room" />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <TableComponent
            data={rooms}
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

      <AddRoomModal openAddRoom={openAddRoom} setOpenAddRoom={setOpenAddRoom} />
      <EditRoomModal
        openEditRoom={openEditRoom}
        setOpenEditRoom={setOpenEditRoom}
        record={record}
      />
      <DetailRoom
        openDetailRoom={openDetailRoom}
        setOpenDetailRoom={setOpenDetailRoom}
        record={record}
      />
    </>
  );
}

export default RoomPage;
