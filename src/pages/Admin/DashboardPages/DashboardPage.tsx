
import { resizeWidth } from "../../../utils/resize";
import RoomStatusBar from "./RoomStatusBar";
import AvailableRoom from "./AvailableRoom";

function DashboardPage() {
  const width = resizeWidth();

  return (
    <>
      <div className={`flex-1 ${width > 1024 ? "flex" : ""}  `}>
        <RoomStatusBar />
        <AvailableRoom />
      </div>
    </>
  );
}

export default DashboardPage;
