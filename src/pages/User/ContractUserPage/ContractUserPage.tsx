
import { Button, Flex, notification, Result, Skeleton } from "antd";
import contractApi from "api/contractApi/contractApi";
import roomApi from "api/roomApi/roomApi";
import dayjs from "dayjs";
import { IContract, IRoom } from "interfaces";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/hook";
import RentalContract from "./child-components/RentalContract";

export default function ContractUserPage() {
  const iduser = useAppSelector((state) => state.auth.user._id);
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [room, setRoom] = useState<IRoom>();
  const [openContractIndex, setOpenContractIndex] = useState<number>(0); // Mặc định mở hợp đồng đầu tiên
  const [isRenewable, setIsRenewable] = useState<boolean[]>([]); // Theo dõi trạng thái nút gia hạn từng hợp đồng
  const [openAddContract, setOpenAddContract] = useState(false);
  const [contractDetail, setContractDetail] = useState<IContract>();
  const [isExtend, setIsExtend] = useState<boolean>(true);

  useEffect(() => {
    const getContracts = async () => {
      const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
      if (res.data) {
        const allContracts = res.data.result;
        // Lọc chỉ lấy hợp đồng có status "active"
        const activeContracts = allContracts.filter(
          (contract: IContract) => contract.status === "ACTIVE"
        );
        // console.log(activeContracts);

        setContracts(activeContracts);
        setContractDetail(activeContracts[0]);
        const roomContract = await roomApi.fetchRoomByIdApi(
          activeContracts[openContractIndex].room._id
        );
        if (roomContract) {
          setRoom(roomContract.data);
        }
        // Tính toán trạng thái gia hạn cho từng hợp đồng
        const renewableStates = activeContracts.map((contract: IContract) => {
          const today = new Date();
          const endDate = new Date(contract.endDate);
          const diffTime = endDate.getTime() - today.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return diffDays <= 30; // Hợp đồng sắp hết hạn (trong vòng 30 ngày)
        });
        setIsRenewable(renewableStates);
        // Nếu không có hợp đồng, đặt openContractIndex về -1
        if (activeContracts.length === 0) {
          setOpenContractIndex(-1);
        }
      }
    };
    getContracts();
  }, [iduser, openContractIndex]);

  const toggleContract = (index: number) => {
    setOpenContractIndex(index);
  };
  const handleExtension = (contractId: string) => {
    console.log(`Gia hạn hợp đồng ${contractId}`);
    // Thêm logic xử lý gia hạn hợp đồng tại đây
  };

  const openContractDetail = (contract: IContract) => {
    setContractDetail(contract);
    const today = dayjs();
    if (today.add(1, "month").isAfter(contract.endDate) === true) {
      setIsExtend(false);
    }
  };

  // Hiển thị thông báo hợp đồng sắp hết hạn
  useEffect(() => {
    if (contracts.length > 0 && isRenewable[openContractIndex]) {
      notification.open({
        message: "Contract Renewal Reminder",
        description: `The contract for room ${
          contracts[openContractIndex]?.room.roomName
        } is about to expire on ${new Date(
          contracts[openContractIndex]?.endDate
        ).toLocaleDateString("en-GB")}. Please renew to avoid interruption.`,
        placement: "topRight",
        duration: 5, // Thời gian hiển thị (5 giây)
        className: "bg-yellow-100 text-yellow-700", // Tuỳ chỉnh style nếu cần
      });
    }
  }, [openContractIndex, contracts, isRenewable]);
  return (
    <div className="bg-[#e0f5e4] text-black h-screen flex flex-col mr-10">
      <div>
        <div className="h-14 flex flex-row flex-shrink-0 items-center px-4  gap-4 text-xl font-semibold  sticky top-0 z-50 border-b-2 border-gray-300 bg-[#e0f5e4]">
          {contracts.map((contract) => (
            <button
              key={contract._id}
              className={`
                                px-4 py-2 rounded-lg shadow-md font-normal text-base
                                bg-[#1677ff] text-white cursor-pointer font-semibold
                                hover:bg-[#4096ff] 
                            `}
              onClick={() => {
                openContractDetail(contract);
              }}
            >
              Room {contract.room.roomName}
            </button>
          ))}
        </div>

        {contractDetail ? (
          <RentalContract contract={contractDetail} />
        ) : (
          <Skeleton />
        )}
        <div className="py-4 bg-[#e0f5e4] my-2 rounded-lg ">
          <Flex gap="small" wrap className=" my-2 px-6 justify-end">
            <Button className="p-5" color="danger" variant="outlined">
              Cancel Contract
            </Button>
            <Button className="p-5" type="primary" disabled={isExtend}>
              Extend Contract
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}
