import { IService } from "interfaces";
import { useState } from "react";
import ServiceRoom from "./child-components/ServiceRoom";
import AvailableService from "./child-components/AvailableService";

export default function ServiceUserPage() {
    const [serviceRooms, setServiceRooms] = useState<IService[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

    return (
        <div className="bg-[#e0f5e4] text-black h-full flex flex-col">
            {/* Hiển thị thông tin phòng đã chọn */}

            <ServiceRoom
                setServiceRooms={setServiceRooms}
                serviceRooms={serviceRooms}
                selectedRoomId={selectedRoomId}
                setSelectedRoomId={setSelectedRoomId}
            />

            <AvailableService
                registeredServices={serviceRooms}
                selectedRoomId={selectedRoomId}
            />
        </div>
    );
}
