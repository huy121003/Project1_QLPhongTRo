import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { IContract, IRoom } from "../../../interfaces";
import { contractApi, roomApi } from "../../../api";


export default function RoomContract() {
    // Get user ID
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contract, setContract] = useState<IContract[]>([]);
    const [rooms, setRoom] = useState<IRoom>();
    useEffect(() => {
        const getContract = async () => {
            const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
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
                const res2 = await roomApi.fetchRoomByIdApi(contract[0].room._id);
                if (res2.data) {
                    const roomData = res2.data;
                    setRoom(roomData);
                }
                console.log(res2);
            }
        };

        fetchRoomData();
    }, [contract]); // Runs when contract changes

    return (
        <div className="bg-white rounded-lg shadow-md p-6 m-5">
            <h2 className="text-3xl font-semibold mb-4">Room Information</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="text-lg ">
                    <p className=" py-2 ">
                        Room Name: <span className="">{rooms?.roomName}</span>
                    </p>
                    <p className=" py-2 ">
                        Room Type: <span className="">{rooms?.type}</span>
                    </p>
                    <p className=" py-2 ">
                        Room Price: <span className="">{rooms?.price}</span>
                    </p>
                    <p className=" py-2 ">
                        Room Description:{" "}
                        <span className="">{rooms?.description}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}