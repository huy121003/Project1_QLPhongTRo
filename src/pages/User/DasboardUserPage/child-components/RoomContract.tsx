import { useEffect, useState } from "react";
import { Card, notification, Result, Skeleton } from "antd";
import CountUp from "react-countup";
import { IContract, IRoom } from "interfaces";
import { useAppSelector } from "redux/hook";
import roomApi from "api/roomApi/roomApi";
import contractApi from "api/contractApi/contractApi";
import invoiceApi from "api/invoiceApi/invoiceApi";
import { InvoiceStatus } from "enums";
import DetailRoom from "@pages/Admin/RoomPages/drawer/DetailRoom";

export default function RoomContract() {
  const [rooms, setRoom] = useState<IRoom>();
  const [roomInfor, setRoomInfor] = useState<IRoom>();
  const [total, setTotal] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const userId = useAppSelector((state) => state.auth.user._id);
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const fetchRoom = async () => {
    try {
      const room = await roomApi.fetchRoomByIdApi(selectedRoomId);
      if (room) {
        setRoomInfor(room.data);
      }
    } catch (e) {}
  };

  const openDetailRoom = (roomId: string) => {
    setOpenDetail(true);
    setSelectedRoomId(roomId);
    fetchRoom();
  };
  useEffect(() => {
    const getContracts = async () => {
      const res = await contractApi.fetchContractApi(`tenant._id=${userId}`);
      if (res.data) {
        const allContracts = res.data.result;
        // Lọc chỉ lấy hợp đồng có status "active"
        const activeContracts = allContracts.filter(
          (contract: IContract) => contract.status === "ACTIVE"
        );

        setContracts(activeContracts);

        // Nếu chưa có phòng được chọn, mặc định chọn phòng đầu tiên
        if (activeContracts.length > 0 && !selectedRoomId) {
          setSelectedRoomId(activeContracts[0].room._id);
        }
      }

      console.log("alo", rooms);
    };
    getContracts();
    const getTotal = async () => {
      const res = await invoiceApi.fetchInvoiceApi(
        `tenant._id=${userId}&pageSize=99999&currentPage=1`
      );
      if (res.data) {
        setTotal(res.data.meta.totalDocument);
        const totalPaid = res.data.result.filter(
          (invoice: any) => invoice.status === InvoiceStatus.PAID
        ).length;
        const totalUnpaid = res.data.result.filter(
          (invoice: any) => invoice.status === InvoiceStatus.UNPAID
        ).length;
        setTotalPaid(totalPaid);
        setTotalUnpaid(totalUnpaid);
      } else {
        notification.error({
          message: "Error",
          description: res.message,
        });
      }
    };
    getTotal();
  }, [userId, selectedRoomId]);

  useEffect(() => {
    // Only fetch room data when contract is available
    const fetchRoomData = async () => {
      // if (contract && contract[0].room) {
      if (selectedRoomId) {
        const res2 = await roomApi.fetchRoomByIdApi(selectedRoomId);
        if (res2.data) {
          const roomData = res2.data;
          setRoom(roomData);
        }
      }
      // }
    };

    fetchRoomData();
  }, [selectedRoomId]); // Runs when contract changes

  return (
    <div className="bg-white rounded-lg shadow-md p-3 mx-0  sm:mx-5 mb-5 sm:mt-5 flex justify-center gap-3">
      <div className="right-content w-1/2 flex gap-1  ">
        <Card className="w-1/3 bg-blue-100 shadow-md  ">
          <div className="flex flex-col flex-1 justify-center items-center p-4 rounded-lg bg-blue-100 min-w-full">
            <span className="text-lg flex items-center gap-2 text-blue-600 whitespace-nowrap   ">
              <i className="fas fa-file-invoice-dollar"></i>
              Total Invoices
            </span>

            <CountUp
              className="xl:text-6xl text-2xl font-bold text-blue-700 text-center"
              start={0}
              end={total}
              duration={1.5}
              separator=","
            />
          </div>
        </Card>
        <Card className="w-1/3 bg-green-200  shadow-md  ">
          <div className="flex flex-col flex-1 justify-center items-center p-4 rounded-lg">
            <span className="text-lg flex items-center gap-2 text-green-700 justify-center whitespace-nowrap">
              <i className="fas fa-check-circle"></i>
              Total Paid
            </span>
            <CountUp
              className="xl:text-6xl text-2xl font-bold text-green-700 text-center"
              start={0}
              end={totalPaid}
              duration={1.5}
              separator=","
            />
          </div>
        </Card>
        <Card className="w-1/3 bg-red-100  shadow-md  ">
          <div className="flex flex-col flex-1 justify-center items-center p-4 rounded-lg  ">
            <span className="text-lg flex items-center gap-2 text-red-600 justify-center whitespace-nowrap">
              <i className="fas fa-times-circle"></i>
              Total Unpaid
            </span>
            <CountUp
              className="xl:text-6xl text-2xl font-bold text-red-700 text-center"
              start={0}
              end={totalUnpaid}
              duration={1.5}
              separator=","
            />
          </div>
        </Card>
      </div>
      <div className="left-content w-1/2">
        <div className="text-center font-semibold text-xl italic ">
          CURRENTLY RENTING
        </div>
        <div className="flex flex-row gap-4 text-xl font-semibold px-2 py-2 ">
          {contracts !== null ? (
            contracts.map((contract) => (
              <button
                key={contract._id}
                className={`
                                px-4 py-2 rounded-lg shadow-md font-normal text-base
                                bg-[#1677ff] text-white cursor-pointer font-semibold
                                hover:bg-[#4096ff] 
                            `}
                onClick={() => {
                  openDetailRoom(contract.room._id);
                }}
              >
                Room {contract.room.roomName}
              </button>
            ))
          ) : (
            <Result title="Your operation has been executed" />
          )}
        </div>
      </div>

      <DetailRoom
        record={roomInfor}
        openDetailRoom={openDetail}
        setOpenDetailRoom={setOpenDetail}
      />
    </div>
  );
}
