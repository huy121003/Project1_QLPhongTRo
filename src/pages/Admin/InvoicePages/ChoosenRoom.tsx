import React, { useState, useEffect } from "react";
import { fetchRoomApi } from "../../../services/roomApis";
import RoomModel from "../../../models/RoomModel";
import { message } from "antd";

interface Props {
  choosenRoom: string;
  setChooenRoom: (value: string) => void;
}

const ChoosenRoom: React.FC<Props> = ({ choosenRoom, setChooenRoom }) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [rooms, setRooms] = useState<RoomModel[]>([]);

  const getRoom = async () => {
    try {
      const res = await fetchRoomApi(
        `currentPage=${current}&pageSize=${pageSize}`
      );
      if (res.data) {
        setRooms(res.data.result);
        setTotal(res.data.meta.totalPage);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Failed to fetch rooms.");
    }
  };

  useEffect(() => {
    getRoom();
  }, [current, pageSize]);

  return (
    <div className="bg-white p-4 rounded-lg m-2 flex justify-between items-center">
      <div
        className={`flex p-4 border-2 rounded-2xl cursor-pointer ${
          choosenRoom === ""
            ? "border-green-400 text-green-400"
            : "border-gray-400 text-gray-400"
        } mr-2`}
        onClick={() => setChooenRoom("")}
      >
        All Rooms
      </div>
      <div className="flex-1 flex items-center">
        <button
          onClick={() => current > 1 && setCurrent(current - 1)}
          className="text-blue-500 font-bold mr-2 hover:text-blue-300 w-12 h-12 flex justify-center items-center"
        >
          <i className="fas fa-chevron-left text-2xl"></i>
        </button>
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`flex flex-1 p-4 border-2 rounded-2xl cursor-pointer text-center justify-center items-center ${
              choosenRoom === room._id
                ? "border-green-400 text-green-400"
                : "border-gray-400 text-gray-400"
            } mr-2`}
            onClick={() => setChooenRoom(room._id)}
          >
            {room.roomName}
          </div>
        ))}
        <button
          onClick={() => current < total && setCurrent(current + 1)}
          className="text-blue-500 font-bold ml-2 hover:text-blue-300 w-12 h-12 flex justify-center items-center"
        >
          <i className="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default ChoosenRoom;
