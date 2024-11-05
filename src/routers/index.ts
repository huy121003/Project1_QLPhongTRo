import AccountPage from "../pages/Admin/AccountPages/AccountPage";
import ContractPage from "../pages/Admin/ContractPages/ContractPage";
import DashboardPage from "../pages/Admin/DashboardPages/DashboardPage";
import EquipmentPage from "../pages/Admin/EquipmentPages/EquipmentPage";
import InvoicePage from "../pages/Admin/InvoicePages/InvoicePage";
import RolePage from "../pages/Admin/RolePages/RolePage";
import RoomPage from "../pages/Admin/RoomPages/RoomPage";
import ServicePage from "../pages/Admin/ServicePages/ServicePage";

import DasboardUserPage from "../pages/User/DasboardUserPage/DasboardUserPage";
import ContractUserPage from "../pages/User/ContractUserPage/ContractUserPage";
import InvoiceUserPage from "../pages/User/InvoiceUserPage/InvoiceUserPage";
import ProfilePage from "../pages/User/ProfilePage/ProfilePage";
import ServiceUserPage from "../pages/User/ServiceUserPage/ServiceUserPage";

interface Routers {
    path: string;
    // component: any;
    component: React.ComponentType;
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
        path: "equipment",
        component: EquipmentPage,
        isShowNav: true,
        icon: "fa-solid fa-tools",
        label: "Equipment",
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
    // {
    //     path: "dasboarduser",
    //     component: DasboardUserPage,
    //     label: "Dashboard",
    // },
    // {
    //     path: "contractuser",
    //     component: ContractUserPage,
    //     label: "Contract",
    // },
    // {
    //     path: "serviceuser",
    //     component: ServiceUserPage,
    //     label: "Service",
    // },
];
export default homeAdminRouters;
