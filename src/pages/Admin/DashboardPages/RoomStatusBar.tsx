import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../contexts/ThemeContext";
import { roomApi } from "../../../api";
import { RoomStatus } from "../../../enums";
import { IRoom } from "../../../interfaces";
import { notification } from "antd";

function RoomStatusBar() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "#000000" : "#FFFFFF";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const [loading, setLoading] = React.useState(false);
  const [occupiedRooms, setOccupiedRooms] = React.useState<IRoom[]>([]);
  const [availableRooms, setAvailableRooms] = React.useState<IRoom[]>([]);
  const width = window.innerWidth;
  useEffect(() => {
    const getStateRooms = async () => {
      setLoading(true);
      const res = await roomApi.fetchRoomApi("currentPage=1&pageSize=99999");

      if (res.data) {
        setOccupiedRooms(
          res.data.result.filter(
            (room: IRoom) => room.status === RoomStatus.Occupied
          )
        );
        setAvailableRooms(
          res.data.result.filter(
            (room: IRoom) => room.status === RoomStatus.Available
          )
        );
      } else {
        notification.error({
          message: "Error",
          description: res.message,
        });
      }
      setLoading(false);
    };
    getStateRooms();
  }, []);

  const data = [
    { name: "Occupied", value: occupiedRooms.length, color: "#f7b924" },
    { name: "Available", value: availableRooms.length, color: "#10da31" },
  ];

  return (
    <div
      className={` p-2 rounded-lg m-1 flex-1 shadow-lg
   ${bgColor} ${textColor}
    ${width > 1280 ? " " : "h-[300px]"}
    `}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RoomStatusBar;
