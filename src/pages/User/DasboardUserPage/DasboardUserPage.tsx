import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import Carousel from "../../../components/Carousel";
import { useAppSelector } from "../../../redux/hook";
import ContractModel from "../../../models/ContractModel";
import { fetchContractApi } from "../../../api/contractApi";
import { message } from "antd";
import { fetchRoomByIdApi } from "../../../api/roomApis";
import RoomModel from "../../../models/RoomModel";

export default function DashboardUserPage() {
  const idUser = useAppSelector((state) => state.auth.user?._id);

  const [contract, setContract] = useState<ContractModel[]>([]);
  const [room, setRoom] = useState<RoomModel[]>([]);

  useEffect(() => {
    const fetchContractAndRoom = async () => {
      try {
        // Lấy thông tin hợp đồng dựa trên idUser
        const contractResponse = await fetchContractApi(`tenant._id=${idUser}`);

        if (contractResponse.data.result) {
          const fetchedContract = contractResponse.data.result;
          setContract(fetchedContract);

          // Kiểm tra xem hợp đồng có chứa id phòng không
          const roomId = fetchedContract[0].room?._id;
          if (roomId) {
            // Lấy thông tin phòng dựa trên id phòng
            const roomResponse = await fetchRoomByIdApi(roomId);
            if (roomResponse.data) {
              setRoom(roomResponse.data);
            } else {
              message.error(
                roomResponse.message || "Không tìm thấy dữ liệu phòng"
              );
            }
          }
        } else {
          message.error(contractResponse.message || "Không tìm thấy hợp đồng");
        }
      } catch (error) {
        message.error("Lỗi khi lấy thông tin hợp đồng hoặc phòng");
      }
    };

    if (idUser) {
      fetchContractAndRoom();
    }
  }, [idUser]);

  return (
    <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col box-border ">
      <Breadcrumb />
      <div className="bg-white rounded-lg shadow-md p-6 m-5">
        <h2 className="text-3xl font-semibold mb-4">Thông tin phòng</h2>
        <div className="grid grid-cols-2 gap-10">
          {room.map((item) => (
            <div className="text-lg font-medium">
              <p className="py-2">
                Tên phòng:{" "}
                <span className="font-semibold">{item.roomName}</span>
              </p>
              <p className="py-2">
                Loại phòng: <span className="font-semibold">{item.type}</span>
              </p>
              <p className="py-2">
                Giá phòng: <span className="font-semibold">{item.price}</span>
              </p>
              <p className="py-2">
                Mô tả phòng:{" "}
                <span className="font-semibold">{item.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
