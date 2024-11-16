import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { resizeWidth } from "../../../utils/resize";
import { IRoom } from "../../../interfaces";
import { roomApi } from "../../../api";
import { RoomStatus } from "../../../enums";

function RoomStatusBar() {
  const width = resizeWidth();
  const [occupiedRooms, setOccupiedRooms] = useState<IRoom[]>([]);
  const [availableRooms, setAvailableRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(false);
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
        // message.error(res.message);
      }
      setLoading(false);
    };
    getStateRooms();
  }, []);
  return (
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
                    color: "#f7b924",
                  },
                  {
                    id: 1,
                    value: availableRooms.length,
                    label: RoomStatus.Available,
                    color: "#10da31",
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
  );
}

export default RoomStatusBar;
