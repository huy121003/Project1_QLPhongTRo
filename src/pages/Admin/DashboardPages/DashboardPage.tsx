import RoomStatusBar from "./RoomStatusBar";
import AvailableRoom from "./AvailableRoom";
import MonthlyRevenueChart from "../StatisticalPages/MonthlyRevenueChart ";

function DashboardPage() {
  return (
    <>
      <div className={`flex-1 xl:flex  `}>
        <RoomStatusBar />
        <AvailableRoom />
      </div>
      {/* <div className="flex-1 xl:flex  ">
        <MonthlyRevenueChart />
      </div> */}
    </>
  );
}

export default DashboardPage;
