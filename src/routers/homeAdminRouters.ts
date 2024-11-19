import { IRouter } from "../interfaces";
import ContractLayout from "../layouts/ContractLayout/ContractLayout";
import ServiceLayout from "../layouts/ServiceLayout/ServiceLayout";
import AccountPage from "../pages/Admin/AccountPages/AccountPage";
import ContractPage from "../pages/Admin/ContractPages/ContractPage";
import ExtendContractPage from "../pages/Admin/ContractPages/ExtendContractPage";
import DashboardPage from "../pages/Admin/DashboardPages/DashboardPage";
import ElectricPage from "../pages/Admin/ElectricPages/ElectricPage";
import InvoicePage from "../pages/Admin/InvoicePages/InvoicePage";
import RolePage from "../pages/Admin/RolePages/RolePage";
import RoomPage from "../pages/Admin/RoomPages/RoomPage";
import RequestServicePage from "../pages/Admin/RequestServicePages/RequestServicePage";
import ServicePage from "../pages/Admin/ServicePages/ServicePage";
import StatisticalPage from "../pages/Admin/StatisticalPages/StatisticalPage";
import WaterPage from "../pages/Admin/WaterPages/WaterPage";

const homeAdminRouters: IRouter[] = [
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
    component: ServiceLayout,
    isShowNav: true,
    icon: "fa-cubes", // Thay đổi icon chính cho Service
    label: "Service",
    children: [
      {
        path: "serviceList",
        component: ServicePage,
        isShowNav: true,
        icon: "fa-list", // Icon khác cho danh sách dịch vụ
        label: "Service List",
      },
      {
        path: "requestService",
        component: RequestServicePage,
        isShowNav: true,
        icon: "fa-clipboard-list", // Icon khác cho đăng ký dịch vụ
        label: "Request Service",
      },
    ],
  },

  {
    path: "electricity",
    component: ElectricPage,
    isShowNav: true,
    icon: "fa-bolt",
    label: "Electricity",
  },
  {
    path: "Water",
    component: WaterPage,
    isShowNav: true,
    icon: "fa-water",
    label: "Water",
  },
  {
    path: "invoice",
    component: InvoicePage,
    isShowNav: true,
    icon: "fa-money-bill",
    label: "Invoice",
  },
  {
    path: "statistical",
    component: StatisticalPage,
    isShowNav: true,
    icon: "fa-chart-line",
    label: "Statistical",
  },
  {
    path: "contract",
    component: ContractLayout,
    isShowNav: true,
    icon: "fa-folder-open", // Thay đổi icon cho Contract Layout
    label: "Contract",
    children: [
      {
        path: "contractList",
        component: ContractPage,
        isShowNav: true,
        icon: "fa-handshake", // Icon khác cho Contract List
        label: "Contract List",
      },
      {
        path: "extendContract",
        component: ExtendContractPage,
        isShowNav: true,
        icon: "fa-file-signature", // Icon khác cho Extend Contract
        label: "Extend Contract",
      },
    ],
  },

  {
    path: "account",
    component: AccountPage,
    isShowNav: true,
    icon: "fa-solid fa-user-lock",
    label: "Account",
  },

  {
    path: "role",
    component: RolePage,
    isShowNav: true,
    icon: "fa-solid fa-dice-five",
    label: "Role",
  },
];

export default homeAdminRouters;
