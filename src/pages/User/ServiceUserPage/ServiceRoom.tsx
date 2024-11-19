import React, { useEffect, useState } from "react";



import { useAppSelector } from "../../../redux/hook";
import { IContract, IService } from "../../../interfaces";
import { contractApi, roomApi } from "../../../api";


export default function ServiceRoom({ setServiceRooms, serviceRooms } :{
    setServiceRooms: any,
    serviceRooms:any



}) {
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contracts, setContracts] = useState<IContract[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    useEffect(() => {
        const getContracts = async () => {
            const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
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
    }, [iduser, selectedRoomId]);
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
            }
            // }
        };
        fetchRoomData();
    }, [selectedRoomId]); // Runs when contract changes
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
                                ? "bg-green-300 text-white"
                                : "bg-green-100 hover:bg-green-200"
                        }`}
                        onClick={() => setSelectedRoomId(contract.room._id)}
                    >
                        Phòng {contract.room.roomName}
                    </button>
                ))}
            </div>

            <table className="w-full border text-left border-collapse">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r text-lg">
                            Service Name
                        </th>
                        <th className="py-2 px-4 border-r text-lg">Price</th>
                        <th className="py-2 px-4 text-lg">Description</th>
                    </tr>
                </thead>
                <tbody>

                    {serviceRooms.map((service:IService, index:number) => (

                        <tr key={index} className="border-b text-lg">
                            <td className="py-2 px-4 border-r">
                                {service.serviceName}
                            </td>
                            <td className="py-2 px-4 border-r">

                                {service.price.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                    " đ"}
                                
                            </td>
                            <td className="py-2 px-4">{service.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

