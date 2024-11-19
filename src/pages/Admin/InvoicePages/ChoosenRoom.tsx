import React, { useState, useEffect } from "react";
import { message, notification } from "antd";
import { IRoom } from "../../../interfaces";
import { roomApi } from "../../../api";
import { resizeWidth } from "../../../utils/resize";
import { useTheme } from "../../../contexts/ThemeContext";

interface Props {
  choosenRoom: string;
  setChooenRoom: (value: string) => void;
}

const ChoosenRoom: React.FC<Props> = ({ choosenRoom, setChooenRoom }) => {
  const witdh = resizeWidth();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  useEffect(() => {
    setPageSize(witdh < 900 ? 5 : 10);
  }, [witdh]);
  const getRoom = async () => {
    const res = await roomApi.fetchRoomApi(
      `currentPage=${current}&pageSize=${pageSize}`
    );
    if (res.data) {
      setRooms(res.data.result);
      setTotal(res.data.meta.totalPage);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  useEffect(() => {
    getRoom();
  }, [current, pageSize]);
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  return (
    <div
      className={` p-4  rounded-lg shadow-lg border border-gray-200 m-2 flex justify-between items-center
 ${bgColor} ${textColor}
    `}
    >
      <div
        className={`flex py-4 px-4 border-2 rounded-2xl cursor-pointer ${
          choosenRoom === "" ? "border-blue-600 text-blue-600" : ""
        } mr-2`}
        onClick={() => setChooenRoom("")}
      >
        All
      </div>
      <div className="flex-1 flex items-center">
        <button
          onClick={() => current > 1 && setCurrent(current - 1)}
          className="text-blue-500 font-bold mr-2 hover:text-blue-300  flex justify-center items-center"
        >
          <i className="fas fa-chevron-left text-2xl"></i>
        </button>
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`flex flex-1 py-4 border-2 rounded-2xl cursor-pointer text-center justify-center items-center ${
              choosenRoom === room._id
                ? "border-blue-600 text-blue-600"
                : "border-gray-400 text-gray-400"
            } mx-1`}
            onClick={() => setChooenRoom(room._id)}
          >
            {room.roomName}
          </div>
        ))}
        <button
          onClick={() => current < total && setCurrent(current + 1)}
          className="text-blue-500 font-bold ml-2 hover:text-blue-300  flex justify-center items-center"
        >
          <i className="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default ChoosenRoom;
