import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { IContract, IService } from "../../../interfaces";
import { contractApi, roomApi } from "../../../api";


interface Props{
    setServiceRooms: (value: IService[]) => void;
    serviceRooms: IService[];
    setRoomId: (value: string) => void;
}
const  ServiceRoom:React.FC<Props>=({
    setServiceRooms,
    serviceRooms,
    setRoomId,
})=> {
    // Get user ID
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contract, setContract] = useState<IContract[]>([]);
    // const [serviceRooms, setServiceRoom] = useState<ServiceModel[]>([]);
    useEffect(() => {
        const getContract = async () => {
            const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
            if (res.data) {
                const contractData = res.data.result;
                setContract(contractData); // Set contract data
                if (contractData.length > 0) {
                    setRoomId(contractData[0].room._id); // Cập nhật roomId khi có contract
                }
            }
        };
        getContract();
    }, [iduser, setRoomId]);

    useEffect(() => {
        // Only fetch room data when contract is available
        const fetchRoomData = async () => {
            if (contract && contract[0].room) {
                const res2 = await roomApi.fetchRoomApi(
                    `_id=${contract[0].room._id}&populate=services`
                );
                if (res2.data) {
                    const servicedata = res2.data.result[0].services;
                    // setServiceRoom(servicedata);
                    setServiceRooms(servicedata);
                }
                console.log("Test", res2);
            }
        };
        fetchRoomData();
    }, [contract, setServiceRooms]); // Runs when contract changes
    return (
        <div className="bg-white rounded-lg shadow-md p-6 m-5 ">
            <h2 className="text-2xl font-semibold mb-4">Current Services</h2>
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
                                {service.price}
                            </td>
                            <td className="py-2 px-4">{service.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ServiceRoom;