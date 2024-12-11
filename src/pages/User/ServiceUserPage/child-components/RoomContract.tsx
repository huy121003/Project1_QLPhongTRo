import contractApi from "api/contractApi/contractApi";
import { ContractStatus } from "enums";
import { IRoom } from "interfaces";
import React, { useEffect } from "react";
import { useAppSelector } from "redux/hook";
interface IRoomContract {
  selectedRoomId: string | null;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
}
const RoomContract: React.FC<IRoomContract> = ({
  selectedRoomId,
  setSelectedRoomId,
}) => {
  const [room, setRoom] = React.useState<
    {
      _id: string;
      roomName: string;
    }[]
  >([]);

  const tenantId = useAppSelector((state) => state.auth.user?._id);
  const getContract = async () => {
    const res = await contractApi.fetchContractApi(
      `tenant._id=${tenantId}&pageSize=9999&currentPage=1&status=${ContractStatus.ACTIVE}`
    );

    if (res.statusCode === 200) {
      const room = res.data.result.map((item: any) => {
        return {
          _id: item.room._id,
          roomName: item.room.roomName,
        };
      });

      setRoom(room);
      // Nếu chưa có selectedRoomId, đặt giá trị mặc định là phòng đầu tiên
      if (!selectedRoomId && room.length > 0) {
        setSelectedRoomId(room[0]._id);
      }
    }
  };
  useEffect(() => {
    getContract();
  }, [tenantId, selectedRoomId]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6   flex gap-6">
      {room.map((item, index) => (
        <div
          key={index}
          className={` text-white text-xl px-8 py-2 ${
            selectedRoomId === item._id ? "bg-[#19dd6b] " : "bg-[#797c7e] "
          } p-2 rounded-md cursor-pointer`}
          onClick={() => setSelectedRoomId(item._id)}
        >
          Room {item.roomName}
        </div>
      ))}
    </div>
  );
};

export default RoomContract;
