import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import ContractModel from "../../../models/ContractModel";

import { fetchContractApi } from "../../../api/contractApi";
import { fetchRoomApi } from "../../../api/roomApis";
// import { ServiceModel } from "../../../models/ServiceModel";

export default function ServiceRoom({ setServiceRooms, serviceRooms }) {
    // Get user ID
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contract, setContract] = useState<ContractModel[]>([]);
    // const [serviceRooms, setServiceRoom] = useState<ServiceModel[]>([]);

    useEffect(() => {
        const getContract = async () => {
            const res = await fetchContractApi(`tenant._id=${iduser}`);
            if (res.data) {
                const contractData = res.data.result;
                setContract(contractData); // Set contract data
            }
        };
        getContract();
    }, [iduser]);

    useEffect(() => {
        // Only fetch room data when contract is available
        const fetchRoomData = async () => {
            if (contract && contract[0].room) {
                const res2 = await fetchRoomApi(
                    `_id=${contract[0].room._id}&populate=services`
                );
                if (res2.data) {
                    const servicedata = res2.data.result[0].services;
                    setServiceRooms(servicedata);
                }
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
                    {serviceRooms.map((service, index) => (
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
