import { Routes, Route } from "react-router-dom";

import HomeScreen from "../pages/home/HomeScreen";
import RoomScreen from "../pages/room/RoomScreen";
import ElectricScreen from "../pages/electric/ElectricScreen";
import WaterScreen from "../pages/water/WaterScreen";
import ServiceScreen from "../pages/service/ServiceScreen";
import StaffScreen from "../pages/staff/StaffScreen";
import InvoiceScreen from "../pages/invoice/InvoiceScreen";
import SettingScreen from "../pages/Setting/SettingScreen";


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/room/index" element={<RoomScreen />} />
      <Route path="/electric/index" element={<ElectricScreen />} />
      <Route path="/water/index" element={<WaterScreen />} />
      <Route path="/service/index" element={<ServiceScreen />} />
      <Route path="/staff/index" element={<StaffScreen />} />
      <Route path="/invoice/index" element={<InvoiceScreen />} />
      <Route path="/setting/index" element={<SettingScreen />} />
   
    </Routes>
  );
};

export default MainRouter;
