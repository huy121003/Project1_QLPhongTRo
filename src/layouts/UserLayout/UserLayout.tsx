import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaFileContractSolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaServicestack } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import {SidebarUser} from "../../components";
import DasboardUserPage from "../../pages/User/DasboardUserPage/DasboardUserPage";

import axios from "axios";
import { authtApi } from "../../api";
import { logoutAction } from "../../redux/slice/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import ProfilePage from "../../pages/User/ProfilePage/ProfilePage";
import ChangePassword from "../../pages/AuthPages/ChangePassword";
import ContractUserPage from "../../pages/User/ContractUserPage/ContractUserPage";
import InvoiceUserPage from "../../pages/User/InvoiceUserPage/InvoiceUserPage";
import PaymentHistoryUserPage from "../../pages/User/PaymentHistoryUserPage/PaymentHistoryUserPage";
import ServiceUserPage from "../../pages/User/ServiceUserPage/ServiceUserPage";
import DashboardUserPage from "../../pages/User/DasboardUserPage/DasboardUserPage";
// import PaymentSuccessful from "../../pages/User/InvoiceUserPage/PaymentSuccessful";

function UserLayout() {
    const [openProfile, setOpenProfile] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false); // Thêm state này
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState<string>("Dashboard");
    const [openChangePassword, setOpenChangePassword] =
        useState<boolean>(false);
    const handleLogout = async () => {
        const res = await authtApi.apiLogout();
        if (res && res.data) {
            dispatch(logoutAction());
            delete axios.defaults.headers.common["Authorization"];
            navigate("/");
            message.success("Success logout");
        }
    };
    const handleChangePassword = () => {
        setOpenChangePassword(true);
    };
    return (
        <div className="flex h-screen bg-[#083b10] box-border">
            <SidebarUser.SidebarUser>
                <SidebarUser.SidebarItem
                    icon={<MdOutlineDashboardCustomize size={30} />}
                    text="Dashboard"
                    active={activeItem === "Dashboard"} // Kiểm tra nếu đây là mục đang active
                    onClick={() => setActiveItem("Dashboard")}
                />
                <SidebarUser.SidebarItem
                    icon={<LiaFileContractSolid size={30} />}
                    text="Contract"
                    active={activeItem === "Contract"}
                    onClick={() => setActiveItem("Contract")}
                />
                <SidebarUser.SidebarItem
                    icon={<FaServicestack size={30} />}
                    text="Service"
                    active={activeItem === "Service"}
                    onClick={() => setActiveItem("Service")}
                />
                <SidebarUser.SidebarItem
                    icon={<LiaFileInvoiceDollarSolid size={30} />}
                    text="Finance"
                    active={activeItem === "Finance"}
                    onClick={() => setActiveItem("Finance")}
                >
                    <SidebarUser.SidebarItem
                        icon={<LiaFileInvoiceDollarSolid size={30} />}
                        text="Pay"
                        active={activeItem === "Pay"}
                        onClick={() => setActiveItem("Pay")}
                    />
                    <SidebarUser.SidebarItem
                        icon={<GrOverview size={30} />}
                        text="Payment history"
                        active={activeItem === "Payment history"}
                        onClick={() => setActiveItem("Payment history")}
                    />
                </SidebarUser.SidebarItem>
            </SidebarUser.SidebarUser>

            <div className="flex-grow flex flex-col h-full">
                <div className=" flex bg-[#083b10] h-16 items-center justify-end pr-7">
                    <BsBell className="text-neutral-300" size={20} />
                    <div
                        className="pl-10 relative"
                        onClick={() => setOpenProfile((prev) => !prev)}
                    >
                        <a href="#!" className="flex items-center gap-1">
                            <FaRegUserCircle
                                size={35}
                                className="text-neutral-300"
                            />
                            <span className="pl-4 text-neutral-300">User</span>
                            <RiArrowDropDownLine className="text-neutral-300" />
                        </a>
                    </div>
                    {openProfile && (
                        <div className="flex flex-col absolute top-16 right-6 bg-white text-[#2b6534] w-40 rounded-xl overflow-hidden shadow-xl">
                            <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                            <ul className="flex flex-col">
                                <li
                                    className="p-4 hover:bg-gray-200 transition-colors duration-200 "
                                    onClick={() => setOpenProfileModal(true)}
                                >
                                    Profile
                                </li>
                                <li
                                    className="p-4 hover:bg-gray-200 transition-colors duration-200"
                                    onClick={handleChangePassword}
                                >
                                    Change Password
                                </li>
                                <li
                                    className="p-4 hover:bg-gray-200 transition-colors duration-200"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex-grow  rounded-tl-3xl rounded-bl-3xl overflow-hidden ">
                    {activeItem === "Dashboard" && <DashboardUserPage />}
                    {activeItem === "Contract" && <ContractUserPage />}
                    {activeItem === "Service" && <ServiceUserPage />}
                    {activeItem === "Finance" && <InvoiceUserPage />}
                    {activeItem === "Payment history" && (
                        <PaymentHistoryUserPage />
                    )}
                    {activeItem === "Pay" && <InvoiceUserPage />}
                </div>
            </div>
            <ChangePassword
                open={openChangePassword}
                setOpen={setOpenChangePassword}
            />

            {/* Modal cho Profile */}
            <Modal
                title=""
                visible={openProfileModal}
                onCancel={() => setOpenProfileModal(false)}
                footer={null}
            >
                <ProfilePage />
            </Modal>
        </div>
    );
}

export default UserLayout;