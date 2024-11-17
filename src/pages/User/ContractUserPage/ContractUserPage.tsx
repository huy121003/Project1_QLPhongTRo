import React, { useEffect, useState } from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { contractApi } from "../../../api";

import { IContract } from "../../../interfaces";
import { useAppSelector } from "../../../redux/hook";
import { Alert, notification } from "antd";
import ContractExtension from "./ContractExtesion";

export default function ContractUserPage() {
  const iduser = useAppSelector((state) => state.auth.user._id);
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [openContractIndex, setOpenContractIndex] = useState<number>(0); // Mặc định mở hợp đồng đầu tiên
  const [isRenewable, setIsRenewable] = useState<boolean[]>([]); // Theo dõi trạng thái nút gia hạn từng hợp đồng
  const [openAddContract, setOpenAddContract] = useState(false);
  useEffect(() => {
    const getContracts = async () => {
      const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
      if (res.data) {
        const allContracts = res.data.result;
        // Lọc chỉ lấy hợp đồng có status "active"
        const activeContracts = allContracts.filter(
          (contract: IContract) => contract.status === "ACTIVE"
        );

        console.log(activeContracts);
        setContracts(activeContracts);

        // Tính toán trạng thái gia hạn cho từng hợp đồng
        const renewableStates = activeContracts.map((contract: IContract) => {
          const today = new Date();
          const endDate = new Date(contract.endDate);
          const diffTime = endDate.getTime() - today.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return 1 <= 30; // Hợp đồng sắp hết hạn (trong vòng 30 ngày)
        });
        setIsRenewable(renewableStates);

        // Nếu không có hợp đồng, đặt openContractIndex về -1
        if (activeContracts.length === 0) {
          setOpenContractIndex(-1);
        }
      }
    };
    getContracts();
  }, [iduser]);

  const toggleContract = (index: number) => {
    setOpenContractIndex(index);
  };

  const handleExtension = (contractId: string) => {
    console.log(`Gia hạn hợp đồng ${contractId}`);
    // Thêm logic xử lý gia hạn hợp đồng tại đây
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
    <div className="bg-[#e0f5e4] text-[#2b6534] h-screen flex flex-col">
      {/* Danh sách các phòng */}
      <div className="h-14 flex flex-row flex-shrink-0 items-center px-4  gap-4 text-xl font-semibold  sticky top-0 z-50 border-b-2 border-gray-300 bg-white">
        {contracts.map((contract, index) => (
          <span
            key={contract._id}
            // className="flex justify-between cursor-pointer"
            className={`p-2 rounded-lg text-xl font-medium ${
              openContractIndex === index
                ? " text-[#49cb5e] underline "
                : " hover:text-[#49cb5e]"
            }`}
            onClick={() => toggleContract(index)}
          >
            Room {contract.room.roomName}
          </span>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 m-5 overflow-y-auto h-[670px] ">
        {contracts.map((contract, index) => (
          <div
            key={index}
            className=" mb-3 bg-[#fffad3] rounded-lg shadow-md p-5 "
          >
            <div
              className="   flex justify-between cursor-pointer"
              onClick={() => toggleContract(index)}
            >
              <h2 className="text-2xl font-semibold">Contract {index + 1}</h2>
              {openContractIndex === index ? (
                <IoMdArrowDropup className="h-8" size={24} />
              ) : (
                <IoMdArrowDropdown className="h-8" size={24} />
              )}
            </div>
            {openContractIndex === index && (
              <div className="">
                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                  <h2 className="text-2xl font-semibold mb-4">
                    Contract Information
                  </h2>
                  <p className="text-lg">
                    Start Date:{" "}
                    {new Date(contract.startDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-lg">
                    End Date:{" "}
                    {new Date(contract.endDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-lg">Status: {contract.status}</p>
                </div>
                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                  {" "}
                  <h2 className="text-2xl font-semibold mb-4">
                    Landlord Information
                  </h2>
                  <p className="text-lg">Name: {contract.innkeeper.name}</p>
                  {/* fix cứng */}
                  <p className="text-lg">Address: Số 7, Quan trung</p>
                  <p className="text-lg">Phone: 0343310165</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-[#e0f5e4] px-4 pb-4">
        <button
          className={`text-xl text-green-100 p-4 rounded-xl ${
            isRenewable[openContractIndex]
              ? "bg-[#259729] hover:bg-[#36c53b]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isRenewable[openContractIndex]} // Vô hiệu nút nếu chưa hết hạn
          onClick={() => {
            handleExtension(contracts[openContractIndex]._id);
            setOpenAddContract(true);
          }}
        >
          Contract extension
        </button>
      </div>
      <ContractExtension
        openAddContract={openAddContract}
        setOpenAddContract={setOpenAddContract}
        contractextension={contracts[openContractIndex]}
      />
    </div>
  );
}
