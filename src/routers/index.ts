import DashboardPage from "../pages/DashboardPages/DashboardPage";

import RoomPage from "../pages/RoomPages/RoomPage";


import ServicePage from "../pages/ServicePages/ServicePage";

import InvoicePage from "../pages/InvoicePages/InvoicePage";


import ContractPage from "../pages/ContractPages/ContractPage";

import AccountPage from "../pages/AccountPages/AccountPage";
import EquipmentPage from "../pages/EquipmentPages/EquipmentPage";
import RolePage from "../pages/RolePages/RolePage";
import PermissionPage from "../pages/PermissionPages/PermissionPage";





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
  {
    path:"permission",
    component:PermissionPage,
    isShowNav:true,
    icon:"fa-solid fa-key",
    label:"Permission"
  }
  
];

export default homeRouters;