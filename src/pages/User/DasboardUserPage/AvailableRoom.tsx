import { useEffect, useState } from "react";

import { message, notification } from "antd";
import { IRoom } from "../../../interfaces";
import { roomApi } from "../../../api";


export default function AvailableRoom() {
    const [rooms, setRooms] = useState<IRoom[]>([]);

    useEffect(() => {
        const getRoom = async () => {
            const response = await roomApi.fetchRoomApi(
                "pageSize=1000&currentPage=1&status=AVAILABLE"
            );
            console.log(response);
            if (response.data) {
                setRooms(response.data.result);
            } else {
                notification.error({
                    message: "Error",
                    description: response.message,
                });
              
            }
        };
        getRoom();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-5 mb-5 overflow-y-auto h-[370px]">
            <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
            <table className="w-full border text-left border-collapse">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r">Room Name</th>
                        <th className="py-2 px-4 border-r">Room Price</th>
                        <th className="py-2 px-4 border-r">Room Type</th>
                        <th className="py-2 px-4">Room Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4 border-r">
                                {room.roomName}
                            </td>
                            <td className="py-2 px-4 border-r">{room.price}</td>
                            <td className="py-2 px-4 border-r">{room.type}</td>
                            <td className="py-2 px-4">{room.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}