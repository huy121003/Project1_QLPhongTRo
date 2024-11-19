import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hook";
import { IContract, IRegisterService, IService } from "../../../interfaces";
import {
    contractApi,
    registerServiceAPI,
    roomApi,
    serviceApi,
} from "../../../api";

export default function ServiceRoom({
    setServiceRooms,
    serviceRooms,
    selectedRoomId,
    setSelectedRoomId,
}: {
    setServiceRooms: any;
    serviceRooms: any;
    selectedRoomId: any;
    setSelectedRoomId: any;
}) {
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contracts, setContracts] = useState<IContract[]>([]);
    const [statusRegister, setStatusRegister] = useState<IRegisterService[]>(
        []
    );
    useEffect(() => {
        const getContracts = async () => {
            const res = await contractApi.fetchContractApi(
                `tenant._id=${iduser}`
            );
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
        };
        getContracts();
    }, [iduser, setSelectedRoomId, selectedRoomId]);
    useEffect(() => {
        // Only fetch room data when contract is available
        const fetchRoomData = async () => {
            // if (contract && contract[0].room) {
            const res2 = await roomApi.fetchRoomApi(
                `_id=${selectedRoomId}&populate=services`
            );
            if (res2.data) {
                const servicedata = res2.data.result[0].services;
                setServiceRooms(servicedata);

                servicedata.map(async (unregisterService: IService) => {
                    const registingService =
                        await registerServiceAPI.fetchRegisterServiceApi(
                            `user=${iduser}&service=${unregisterService._id}&room=${selectedRoomId}&type=false`
                        );

                    if (
                        registingService.data.result.length === 0 ||
                        registingService.data.result[0].status === "SUCCESS"
                    )
                        return;
                    if (
                        registingService.data.result.length > 0 ||
                        registingService.data.result[0].status !== "SUCCESS"
                    ) {
                        setStatusRegister(
                            (prevStatusRegister: IRegisterService[]) => [
                                ...prevStatusRegister, // Sao chép mảng cũ
                                registingService.data.result[0], // Thêm phần tử mới
                            ]
                        );
                    }
                });
            }
        };
        fetchRoomData();
    }, [selectedRoomId, setServiceRooms]); // Runs when contract changes

    const handleDeleteService = async (
        idService: string,
        serviceType: string
    ) => {
        // Kiểm tra nếu dịch vụ không phải là ELECTRICITY hoặc WATER
        if (serviceType !== "ELECTRICITY" && serviceType !== "WATER") {
            const res = await registerServiceAPI.postRegisterServiceApi(
                idService,
                iduser,
                selectedRoomId,
                false,
                false
            );
            // Có thể thêm xử lý khi xóa thành công
        } else {
            // Nếu dịch vụ là WATER hoặc ELECTRICITY, không thực hiện xóa
            console.log("Cannot delete WATER or ELECTRICITY services.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 m-0 mb-5 sm:m-5 ">
            <h2 className="text-2xl font-semibold mb-4">Current Services</h2>
            {/* Danh sách các phòng */}
            <div className="flex flex-row gap-4 pb-5  text-xl font-semibold">
                {contracts.map((contract, index) => (
                    <button
                        key={contract._id}
                        className={`px-4 py-2 rounded-lg shadow font-normal text-base ${
                            selectedRoomId === contract.room._id
                                ? "bg-green-300 text-[#2b6534] cursor-pointer font-semibold"
                                : "bg-green-100 hover:bg-green-200"
                        }`}
                        onClick={() => setSelectedRoomId(contract.room._id)}
                    >
                        Phòng {contract.room.roomName}
                    </button>
                ))}
            </div>

            <table className="w-full border text-center border-collapse">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r text-lg">
                            Service Name
                        </th>
                        <th className="py-2 px-4 border-r text-lg">Price</th>
                        <th className="py-2 px-4 border-r text-lg">
                            Description
                        </th>
                        <th className="py-2 px-4 text-lg">
                            Cancel registration
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRooms.map((service: IService, index: number) => {
                        const registerService = statusRegister.find(
                            (registerService: IRegisterService) =>
                                registerService.service._id === service._id
                        );
                        return (
                            <tr key={index} className="border-b text-lg">
                                <td className="py-2 px-4 border-r">
                                    {service.serviceName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                        " đ"}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.description}
                                </td>
                                <td className="py-2 px-4">
                                    {registerService &&
                                    registerService.room._id ===
                                        selectedRoomId ? (
                                        // Tìm thấy dịch vụ đã đăng ký, kiểm tra status
                                        registerService.status === "PENDING" ? (
                                            <button className=" text-lg bg-yellow-300 px-3 py-2 rounded-md text-[#2b6534]">
                                                Pending...
                                            </button>
                                        ) : (
                                            <div className="text-orange-500 text-lg">
                                                Approved
                                            </div>
                                        )
                                    ) : (
                                        service.type !== "ELECTRICITY" &&
                                        service.type !== "WATER" && (
                                            <i
                                                className="fa-solid fa-trash text-xl text-red-600 transition-all duration-300 transform hover:text-red-500 hover:scale-110 active:text-red-900 active:scale-95 cursor-pointer"
                                                onClick={() =>
                                                    handleDeleteService(
                                                        service._id,
                                                        service.type
                                                    )
                                                }
                                            ></i>
                                        )
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
