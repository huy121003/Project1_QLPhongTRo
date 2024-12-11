import { IService } from "interfaces";
import { useState } from "react";

import RoomContract from "./child-components/RoomContract";

import ServiceRoomTable from "./child-components/ServiceRoomTable";

export default function ServiceUserPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  return (
    <div className="bg-[#e0f5e4] text-black h-full flex flex-col">
      {/* Hiển thị thông tin phòng đã chọn */}
      <RoomContract
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
      />
      <ServiceRoomTable selectedRoomId={selectedRoomId} />
    </div>
  );
}
