import { useState } from "react";
import AvailableService from "./AvailableService";
import ServiceRoom from "./ServiceRoom";
import { ServiceModel } from "../../../models/ServiceModel";
import { fetchRoomApi } from "../../../api/roomApis";

export default function ServiceUserPage() {
    const [serviceRooms, setServiceRooms] = useState<ServiceModel[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null); // Thêm state cho roomId
    const refreshServices = async () => {
        // Hàm này sẽ lấy lại danh sách dịch vụ của phòng
        if (roomId) {
            const res2 = await fetchRoomApi(`_id=${roomId}&populate=services`);
            if (res2.data) {
                setServiceRooms(res2.data.result[0].services);
            }
        }
    };
    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a
                            href="/tai-chinh"
                            className=" hover:underline font-semibold"
                        >
                            Service
                        </a>
                    </li>
                </ol>
            </div>
            <ServiceRoom
                setServiceRooms={setServiceRooms}
                serviceRooms={serviceRooms}
                setRoomId={setRoomId} // Truyền hàm để cập nhật roomId
            />

            <AvailableService registeredServices={serviceRooms} roomId={roomId} refreshServices={refreshServices}/>
        </div>
    );
}
