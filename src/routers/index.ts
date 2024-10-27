import AccountPage from "../pages/Admin/AccountPages/AccountPage";
import ContractPage from "../pages/Admin/ContractPages/ContractPage";
import DashboardPage from "../pages/Admin/DashboardPages/DashboardPage";
import EquipmentPage from "../pages/Admin/EquipmentPages/EquipmentPage";
import InvoicePage from "../pages/Admin/InvoicePages/InvoicePage";
import RolePage from "../pages/Admin/RolePages/RolePage";
import RoomPage from "../pages/Admin/RoomPages/RoomPage";
import ServicePage from "../pages/Admin/ServicePages/ServicePage";








interface Routers{
    path: string;
    component: any;
    isShowNav: boolean;
    icon?: string;
    label?: string;
}
const   homeAdminRouters:Routers[] = [

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
    path: "service",
    component: ServicePage,
    isShowNav: true,
    icon: "fa-cubes",
    label: "Service",
  },

  {
    path: "invoice",
    component: InvoicePage,
    isShowNav: true,
    icon: "fa-money-bill",
    label: "Invoice",
  }, 
  {
    path: "contract",
    component: ContractPage,
    isShowNav: true,
    icon: "fa-file-contract",
    label: "Contract",
  },
  {
    path:"account",
    component: AccountPage,
    isShowNav:true,
    icon:"fa-solid fa-user-lock",
    label:"Account"
  },
  {
    path:"equipment",
    component: EquipmentPage,
    isShowNav:true,
    icon:"fa-solid fa-tools",
    label:"Equipment"
  },
  {
    path:"role",
    component:RolePage,
    isShowNav:true,
    icon:"fa-solid fa-dice-five",
    label:"Role"
  },
  
  
];

// const homeUserRouters:Routers[] = [
//   {
//   }
// ]
export default homeAdminRouters;