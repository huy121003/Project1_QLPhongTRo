import { useState } from "react";
import AvailableService from "./AvailableService";

import ServiceRoom from "./ServiceRoom";
import { IService } from "../../../interfaces";


export default function ServiceUserPage() {
    const [serviceRooms, setServiceRooms] = useState<IService[]>([]);

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-auto flex flex-col">
            {/* Hiển thị thông tin phòng đã chọn */}

            <ServiceRoom
                setServiceRooms={setServiceRooms}
                serviceRooms={serviceRooms}
            />

            <AvailableService registeredServices={serviceRooms} />
        </div>
    );

}
