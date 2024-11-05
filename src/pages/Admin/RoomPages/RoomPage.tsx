import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components";
import RoomModel from "../../../models/RoomModel";
import { deleteRoomApi, fetchRoomApi } from "../../../api/roomApis";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";
import DetailRoom from "./DetailRoom";
import RoomFilters from "./RoomFilters";
import RoomTable from "./RoomTable";
import ExportToExcel from "./ExportToExcel";
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
        />
        <div className="bg-white p-2 rounded-lg m-2 justify-between flex items-center">
          <div></div>
          <div className="flex items-center">
            <ExportToExcel rooms={rooms} />
            <AddButton onClick={() => setOpenAddRoom(true)} label="Add Room" />
          </div>
        </div>
        <RoomTable
          rooms={rooms}
          onDeleteRoom={onDeleteRoom}
          setOpenDetailRoom={setOpenDetailRoom}
          setOpenEditRoom={setOpenEditRoom}
          setRecord={setRecord}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
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
