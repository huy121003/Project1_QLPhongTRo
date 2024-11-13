import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";
import DetailRoom from "./DetailRoom";
import RoomFilters from "./RoomFilters";
import ExportToExcel from "./ExportToExcel";
import RoomCard from "./RoomCard";
import { IRoom } from "../../../interfaces";
import { roomApi } from "../../../api";
function RoomPage() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openEditRoom, setOpenEditRoom] = useState(false);
  const [openDetailRoom, setOpenDetailRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null); // For delete confirmation
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
    const res = await roomApi.fetchRoomApi(query);
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
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    if (pageSize) setPageSize(pageSize);
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
    const res = await roomApi.deleteRoomApi(record._id);
    if (res.statusCode === 200) {
      message.success("Room deleted");
      getRoom();
      setCurrent(1);
    } else {
      message.error(res.message);
    }
  };
  return (
    <>
      <div className="justify-end  flex-1">
        <RoomFilters
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          sorted={sorted}
        />
        <div className="bg-white p-2 r rounded-lg shadow-lg border border-gray-200 mx-2 justify-between flex items-center">
          <div></div>
          <div className="flex items-center">
            <ExportToExcel rooms={rooms} />
            <AddButton onClick={() => setOpenAddRoom(true)} label="Add Room" />
          </div>
        </div>
        <RoomCard
          rooms={rooms}
          onDeleteRoom={onDeleteRoom}
          setOpenDetailRoom={setOpenDetailRoom}
          setOpenEditRoom={setOpenEditRoom}
          setRecord={setRecord}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={handlePaginationChange}
        />
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
