import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaFileContractSolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaServicestack } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { SidebarUser } from "../../components";
import { authtApi } from "../../api";
import { logoutAction } from "../../redux/slice/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Menu, message } from "antd";

import { homeUserRouters } from "../../routers";
import { resizeWidth } from "../../utils/resize";
import ChangePassword from "../../pages/AuthPages/ChangePassword";
import logo from "../../access/Images/logo2.png";

function UserLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const width = resizeWidth();
  const [selected, setSelected] = useState<string>(
    /* localStorage.getItem("selected") ||*/ "Dashboard"
  );
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(
    /*localStorage.getItem("isNavOpen") === "true" ||*/ true
  );
  const user = useAppSelector((state) => state.auth.user);
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const handleLogout = async () => {
    const res = await authtApi.apiLogout();
    if (res && res.data) {
      dispatch(logoutAction());
      navigate("/");
      message.success("Success logout");
    }
  };
  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={() => setOpenEditAccount(true)}>
        Update Profile
        <i className="fa fa-user m-3" />
      </Menu.Item>
      <Menu.Item key="1" onClick={handleChangePassword}>
        Change password
        <i className="fa fa-key m-3" />
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
        <i className="fa fa-sign-out  m-3" />
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="flex h-screen overflow-hidden bg-[#083b10] ">
      <nav
        className={`flex flex-col  items-center  h-full shadow-lg transition-all duration-300  text-[#7e881d]  ${
          width <= 1024
            ? isNavOpen
              ? "w-[50px] "
              : "w-0"
            : isNavOpen
            ? " px-1 w-[240px]"
            : "w-16"
        } `}
      >
        <div
          className={`flex flex-row justify-center items-center gap-2 border-b border-gray-400 w-full h-[130px] pb-2`}
        >
          {width > 1024 && isNavOpen ? (
            <img src={logo} alt="" className="object-cover w-44" />
          ) : null}
          <div className="flex " onClick={toggleNav}>
            <i
              className={`fa fa-bars text-2xl cursor-pointer font-bold text-[#7e881d] hover:text-[#ffd13b]  ${
                !isNavOpen && "text-[#ffd13b] font-bold"
              }`}
            />
          </div>
        </div>
        {homeUserRouters
          .filter((item) => item.label !== undefined)
          .map((item) => (
            <Link
              to={item.path}
              key={item.label}
              className={`flex hover:text-[#ffd13b] flex-row items-center rounded-md my-3 px-4 py-2 w-full transition-colors duration-300  ${
                selected === item.label ? "text-[#ffd13b] font-bold" : ""
              }`}
              onClick={() => setSelected(item.label ?? "Dashboard")}
            >
              <i className={`fa ${item.icon} text-2xl `} />
              {width > 680 && isNavOpen ? (
                <p className="ml-4 text-xl text-center font-semibold">
                  {item.label}
                </p>
              ) : null}
            </Link>
          ))}
      </nav>

      <div className="flex-1 transition-all duration-300 bg-[#083b10] ">
        <div className="flex items-center  text-[#ffd13b] h-16 px-5 justify-between bg-[#083b10] ">
          <div className="flex hover:text-slate-300" onClick={toggleNav}>
            <h2 className="ml-2 text-2xl font-bold ">{selected}</h2>
          </div>
          <Dropdown overlay={menu} trigger={["hover"]}>
            <div className="flex justify-center items-center hover:text-[#86f63b] pr-10 sm:pr-0">
              <p className="text-lg"> {user?.name}</p>
              <i className="fa-solid fa-angle-down ml-1"></i>
            </div>
          </Dropdown>
        </div>
        <div
          className="flex-1 flex-row overflow-y-scroll rounded-tl-lg rounded-bl-lg "
          style={{
            maxHeight: "calc(100vh - 4rem)",
            maxWidth: "100vw",
          }}
        >
          <Outlet />
        </div>
      </div>
      <ChangePassword
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />

      {/* Modal cho Profile */}
      {/* <Modal
                title=""
                visible={openProfileModal}
                onCancel={() => setOpenProfileModal(false)}
                footer={null}
            >
                <ProfilePage /> */}

      {/* <EditAccountModal
     openEditAccount={openEditAccount}
     setOpenEditAccount={setOpenEditAccount}
     record={user}
     /> */}
    </div>
  );
}

export default UserLayout;
