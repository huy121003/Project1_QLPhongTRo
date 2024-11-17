import AccountPage from "../pages/Admin/AccountPages/AccountPage";
import ContractPage from "../pages/Admin/ContractPages/ContractPage";
import DashboardPage from "../pages/Admin/DashboardPages/DashboardPage";
import ElectricPage from "../pages/Admin/ElectricPages/ElectricPage";

import InvoicePage from "../pages/Admin/InvoicePages/InvoicePage";
import RolePage from "../pages/Admin/RolePages/RolePage";
import RoomPage from "../pages/Admin/RoomPages/RoomPage";
import ServicePage from "../pages/Admin/ServicePages/ServicePage";
import WaterPage from "../pages/Admin/WaterPages/WaterPage";
import ContractUserPage from "../pages/User/ContractUserPage/ContractUserPage";
import DashboardUserPage from "../pages/User/DasboardUserPage/DasboardUserPage";
import InvoiceUserPage from "../pages/User/InvoiceUserPage/InvoiceUserPage";
import PaymentFailed from "../pages/User/InvoiceUserPage/PaymentFailed";
import PaymentSuccessful from "../pages/User/InvoiceUserPage/PaymentSuccessful";
import PaymentHistoryUserPage from "../pages/User/PaymentHistoryUserPage/PaymentHistoryUserPage";
import ServiceUserPage from "../pages/User/ServiceUserPage/ServiceUserPage";

interface Routers {
    path: string;
    component: any;
    isShowNav?: boolean;
    icon?: string;
    label?: string;
}
const homeAdminRouters: Routers[] = [
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
        path: "contract",
        component: ContractPage,
        isShowNav: true,
        icon: "fa-file-contract",
        label: "Contract",
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

export const homeUserRouters: Routers[] = [
    {
        path: "dashboardUser",
        component: DashboardUserPage,
        isShowNav: true,
        icon: "fa-chart-simple",
        label: "Dashboard",
    },
    {
        path: "contractUser",
        component: ContractUserPage,
        isShowNav: true,
        icon: "fa-solid fa-file-contract",
        label: "Contract",
    },
    {
        path: "serviceUser",
        component: ServiceUserPage,
        isShowNav: true,
        icon: "fa-brands fa-servicestack",
        label: "Service",
    },
  
    {
        path: "invoiceUser",
        component: InvoiceUserPage,
        isShowNav: true,
        icon: "fa-solid fa-file-invoice-dollar",
        label: "Pay",
    },
    {
        path: "paymentHistory",
        component: PaymentHistoryUserPage,
        isShowNav: true,
        icon: "fa-solid fa-money-check-dollar",
        label: "Payment history",
    },
    // {
    //     path: "paymentSuccessful",
    //     component: PaymentSuccessful,
    //     isShowNav: true,
    //     icon: "fa-solid fa-money-check-dollar",
    //     label: "Payment Successful",
    // },
    // {
    //     path: "paymentFailed",
    //     component: PaymentFailed,
    //     isShowNav: true,
    //     icon: "fa-solid fa-money-check-dollar",
    //     label: "Payment Failed",
    // },
];

export default homeAdminRouters;
