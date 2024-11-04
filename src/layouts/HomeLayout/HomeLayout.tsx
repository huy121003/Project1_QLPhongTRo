import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import homeAdminRouters from "../../routers";
import { resizeWidth } from "../../utils/resize";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { apiLogout } from "../../api/authtApi";

import { logoutAction } from "../../redux/slice/auth/authSlice";
import { Dropdown, Menu, message } from "antd";

import ChangePassword from "../../pages/AuthPages/ChangePassword";
import axios from "axios";

function HomeLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const width = resizeWidth();
  const [selected, setSelected] = useState<string>(
    /* localStorage.getItem("selected") ||*/ "Dashboard"
  );
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(
    /*localStorage.getItem("isNavOpen") === "true" ||*/ true
  );
  const user = useAppSelector((state) => state.auth.user);
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const handleLogout = async () => {
    const res = await apiLogout();
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
  const menu = (
    <Menu>
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
    <div className="flex h-screen overflow-hidden">
      <nav
        className={`flex flex-col  items-center bg-white h-full shadow-lg transition-all duration-300 ${
          width <= 680
            ? isNavOpen
              ? "w-16 px-1"
              : "w-0"
            : isNavOpen
            ? "w-40 px-1"
            : "w-16"
        } `}
      >
        <div
          className={`flex flex-row items-center text-black rounded-md my-1 px-4 py-2 w-full transition-colors duration-300 `}
        >
          {/* <i className="fa-solid fa-house-user text-3xl"></i> */}
        </div>
        {homeAdminRouters
          .filter((item) => item.label !== undefined)
          .map((item) => (
            <Link
              to={item.path}
              key={item.label}
              className={`flex hover:bg-gray-300 flex-row items-center text-black rounded-md my-3 px-4 py-2 w-full transition-colors duration-300  ${
                selected === item.label ? "text-blue-700" : ""
              }`}
              onClick={() => setSelected(item.label ?? "Dashboard")}
            >
              <i className={`fa ${item.icon} text-2xl `} />
              {width > 680 && isNavOpen ? (
                <p className="ml-4 text-lg">{item.label}</p>
              ) : null}
            </Link>
          ))}
      </nav>

      <div className="flex-1 bg-gray-100 transition-all duration-300">
        <div className="flex items-center  text-black h-16 px-5 justify-between">
          <div className="flex">
            <i
              className="fa fa-bars text-2xl cursor-pointer"
              onClick={toggleNav}
            />
            <h2 className="ml-4 text-2xl">{selected}</h2>
          </div>

          <Dropdown overlay={menu} trigger={["hover"]}>
            <div className="flex justify-center items-center hover:text-blue-500">
              <p className=""> {user?.name}</p>
              <i className="fa-solid fa-angle-down ml-1"></i>
            </div>
          </Dropdown>
        </div>
        <div
          className="flex-1 flex-row overflow-y-auto overflow-x-auto "
          style={{ maxHeight: "calc(100vh - 4rem)", maxWidth: "100vw" }}
        >
          <Outlet />
        </div>
      </div>
      <ChangePassword
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
    </div>
  );
}

export default HomeLayout;
