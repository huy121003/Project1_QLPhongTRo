import AccountPage from "@pages/Admin/AccountPages";
import ContractPage from "@pages/Admin/ContractPages";
import DashboardPage from "@pages/Admin/DashboardPages";
import ElectricPage from "@pages/Admin/ElectricPages";
import InvoicePage from "@pages/Admin/InvoicePages";
import PermissionPage from "@pages/Admin/PermissionPages";
import RequestContractPage from "@pages/Admin/RequestContractPages";
import RequestServicePage from "@pages/Admin/RequestServicePages";
import RolePage from "@pages/Admin/RolePages";
import RoomPage from "@pages/Admin/RoomPages";
import ServicePage from "@pages/Admin/ServicePages";
import StatisticalInvoicePage from "@pages/Admin/StatisticalPages";
import StatisticalRoomPage from "@pages/Admin/StatisticalRoomPage";
import WaterPage from "@pages/Admin/WaterPages";
import { IRouter } from "interfaces";
import ContractLayout from "layouts/ContractLayout";
import ServiceLayout from "layouts/ServiceLayout";
import StatisticalLayout from "layouts/StatisticalLayout";

const homeAdminRouters: IRouter[] = [
  {
    path: "dashboard",
    component: DashboardPage,
    isShowNav: true,
    icon: "fa-solid fa-chart-pie", // Icon biểu đồ hình tròn cho Dashboard
    label: "Dashboard",
  },
  {
    path: "room",
    component: RoomPage,
    isShowNav: true,
    icon: "fa-solid fa-door-open", // Icon cửa mở cho Room
    label: "Room",
  },
  {
    path: "service",
    component: ServiceLayout,
    isShowNav: true,
    icon: "fa-solid fa-bell", // Icon chuông dịch vụ cho Service
    label: "Service",
    children: [
      {
        path: "serviceList",
        component: ServicePage,
        isShowNav: true,
        icon: "fa-solid fa-th-list", // Icon danh sách cho Service List
        label: "Service List",
      },
      {
        path: "requestService",
        component: RequestServicePage,
        isShowNav: true,
        icon: "fa-solid fa-file-signature", // Icon ký hiệu tài liệu cho Request Service
        label: "Request Service",
      },
    ],
  },
  {
    path: "electricity",
    component: ElectricPage,
    isShowNav: true,
    icon: "fa-solid fa-bolt", // Icon tia sét giữ nguyên
    label: "Electricity",
  },
  {
    path: "water",
    component: WaterPage,
    isShowNav: true,
    icon: "fa-solid fa-tint", // Icon giọt nước cho Water
    label: "Water",
  },
  {
    path: "invoice",
    component: InvoicePage,
    isShowNav: true,
    icon: "fa-solid fa-file-invoice-dollar", // Icon hóa đơn tiền cho Invoice
    label: "Invoice",
  },
  {
    path: "statistical",
    component: StatisticalLayout,
    isShowNav: true,
    icon: "fa-solid fa-chart-bar", // Icon biểu đồ cột cho Statistical
    label: "Statistical",
    children: [
      {
        path: "statisticalInvoice",
        component: StatisticalInvoicePage,
        isShowNav: true,
        icon: "fa-solid fa-file-invoice-dollar", // Icon hóa đơn tiền cho Statistical Invoice
        label: "Statistical Invoice",
      },
      {
        path: "statisticalRoom",
        component: StatisticalRoomPage,
        isShowNav: true,
        icon: "fa-solid fa-door-open", // Icon cửa mở cho Statistical Room
        label: "Statistical Room",
      },
    ],
  },
  {
    // path: "contract",
    // component: ContractLayout,
    // isShowNav: true,
    // icon: "fa-solid fa-file-contract", // Icon hợp đồng cho Contract Layout
    // label: "Contract",
    // children: [
    //  {
    path: "contractList",
    component: ContractPage,
    isShowNav: true,
    icon: "fa-solid fa-folder", // Icon thư mục cho Contract List
    label: "Contract List",
    //},
    //   {
    //     path: "requestContract",
    //     component: RequestContractPage,
    //     isShowNav: true,
    //     icon: "fa-solid fa-file-signature", // Icon ký hiệu tài liệu cho Request Contract
    //     label: "Request Contract",
    //   },
    // ],
  },
  {
    path: "account",
    component: AccountPage,
    isShowNav: true,
    icon: "fa-solid fa-user", // Icon người dùng đơn giản cho Account
    label: "Account",
  },
  {
    path: "role",
    component: RolePage,
    isShowNav: true,
    icon: "fa-solid fa-key", // Icon chìa khóa cho Role
    label: "Role",
  },
  {
    path: "permission",
    component: PermissionPage,
    isShowNav: true,
    icon: "fa-solid fa-lock-open", // Icon khóa mở cho Permission
    label: "Permission",
  },
];

export default homeAdminRouters;
