import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { message, Table } from "antd";

import { resizeWidth } from "../../utils/resize";
import { useEffect, useState } from "react";
import { fetchRoomApi } from "../../services/roomApis";
import RoomModel, { RoomStatus, RoomType } from "../../models/RoomModel";
import axios from "axios";

function DashboardPage() {
  const [rooms, setRooms] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
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
  ];
  console.log("admin", axios.defaults.headers);
  useEffect(() => {
    const getStateRooms = async () => {
      setLoading(true);
      const res = await fetchRoomApi("currentPage=1&pageSize=99999");

      if (res.data) {
        setOccupiedRooms(
          res.data.result.filter(
            (room: RoomModel) => room.status === RoomStatus.Occupied
          )
        );
        setAvailableRooms(
          res.data.result.filter(
            (room: RoomModel) => room.status === RoomStatus.Available
          )
        );
      } else {
        // message.error(res.message);
      }
    };
    const getRooms = async () => {
      const res = await fetchRoomApi(
        `currentPage=${currentPage}&pageSize=${pageSize}&status=${RoomStatus.Available}`
      );

      if (res.data) {
        setRooms(res.data.result);
        setTotal(res.data.meta.totalDocument);
      } else {
        message.error(res.message);
      }
    };

    getStateRooms();
    getRooms();

    setLoading(false);
  }, [currentPage, pageSize]);
  const onChange = (pagination: any) => {
    if (pagination.current !== currentPage && pagination) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
    //console.log("fdfd",pagination);
  };
  const width = resizeWidth();

  return (
    <>
      <div className={`flex-1 ${width > 1024 ? "flex" : ""}  `}>
        <div className={`bg-white p-2 rounded-lg m-1 flex-1 flex-col flex `}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">Room status</Typography>
            </Box>
            <Box flexGrow={1}>
              <PieChart
                loading={loading}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: occupiedRooms.length,
                        label: RoomStatus.Occupied,
                        color: "#10da31",
                      },
                      {
                        id: 1,
                        value: availableRooms.length,
                        label: RoomStatus.Available,
                        color: "#f7b924",
                      },
                    ],
                  },
                ]}
                width={width <= 680 ? 380 : width >= 1024 ? 650 : 500}
                height={width <= 680 ? 160 : width >= 1024 ? 450 : 250}
              />
            </Box>
          </Stack>
        </div>
        <div className="bg-white p-2 rounded-lg m-1 flex-1   ">
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">List of available rooms</Typography>
            </Box>
            <Box flexGrow={1}>
              <Table
                loading={loading}
                className="flex-1 "
                columns={columns}
                dataSource={rooms}
                onChange={onChange}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: total,
                  // showSizeChanger: true,
                  // pageSizeOptions: [5, 10, 20, 50, 100, 200],
                }}
              />
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
