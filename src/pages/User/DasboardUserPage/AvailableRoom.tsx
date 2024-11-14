import { useEffect, useState } from "react";
import { fetchRoomApi } from "../../../api/roomApis";
import { message } from "antd";
import RoomModel from "../../../models/RoomModel";

export default function AvailableRoom() {
    const [rooms, setRooms] = useState<RoomModel[]>([]);

    useEffect(() => {
        const getRoom = async () => {
            const response = await fetchRoomApi(
                "pageSize=1000&currentPage=1&status=AVAILABLE"
            );

            if (response.data) {
                setRooms(response.data.result);
            } else {
                message.error(response.message);
            }
        };
        getRoom();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-5 mb-5 overflow-y-auto h-[370px] custom-scrollbar">
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
