import DashboardPage from "../pages/Dashboard/DashboardPage";

import RoomPage from "../pages/Room/RoomPage";
import ElectricPage from "../pages/Electric/ElectricPage";
import WaterPage from "../pages/Water/WaterPage";
import ServicePage from "../pages/Service/ServicePage";
import StaffPage from "../pages/Staff/StaffPage";
import InvoicePage from "../pages/Invoice/InvoicePage";
import SettingPage from "../pages/Setting/SettingPage";

import TenantPage from "../pages/Tenant/TenantPage";
import ContractPage from "../pages/Contract/ContractPage";
import ReceiptPage from "../pages/Receipt/ReceiptPage";
import AccountPage from "../pages/Account/AccountPage";





interface Routers{
    path: string;
    component: any;
    isShowNav: boolean;
    icon?: string;
    label?: string;
}
const   homeRouters:Routers[] = [

  {
    path: "dashboard",
    component: DashboardPage,
    isShowNav: true,
    icon: "fa-chart-simple",
    label: "Dashboard",
  },
  {
    path: "room",
    component: RoomPage,
    isShowNav: true,
    icon: "fa-bed",
    label: "Room",
  },
  {
    path: "electric",
    component: ElectricPage,
    isShowNav: true,
    icon: "fa-bolt",
    label: "Electric",
  },
  {
    path: "water",
    component: WaterPage,
    isShowNav: true,
    icon: "fa-shower",
    label: "Water",
  },
  {
    path: "service",
    component: ServicePage,
    isShowNav: true,
    icon: "fa-cubes",
    label: "Service",
  },
  {
    path: "staff",
    component: StaffPage,
    isShowNav: true,
    icon: "fa-user-tie",
    label: "Staff",
  },
  {
    path: "invoice",
    component: InvoicePage,
    isShowNav: true,
    icon: "fa-money-bill",
    label: "Invoice",
  },
  {
    path: "setting",
    component: SettingPage,
    isShowNav: true,
    icon: "fa-gears",
    label: "Setting",
  },

  {
    path: "tenant",
    component: TenantPage,
    isShowNav: true,
    icon: "fa-users",
    label: "Tenant",
  },

  {
    path: "contract",
    component: ContractPage,
    isShowNav: true,
    icon: "fa-file-contract",
    label: "Contract",
  },
  {
    path: "receipt",
    component: ReceiptPage,
    isShowNav: true,
    icon: "fa-file-invoice",
    label: "Receipt",
  },
  {
    path:"account",
    component: AccountPage,
    isShowNav:true,
    icon:"fa-solid fa-user-lock",
    label:"Account"
  }
  
];

export default homeRouters;