import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Menu, message, notification } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { resizeWidth } from "@utils/resize";
import { IAccount } from "interfaces";
import { useTheme } from "contexts/ThemeContext";
import authApi from "api/authApi/authApi";
import NavMenu from "./child-components/NavMenu";
import DrawerMenu from "./child-components/DrawerMenu";
import { logoutAction } from "redux/slice/auth/authSlice";
import accountApi from "api/accountApi/accountApi";
import ChangePassword from "@pages/AuthPages/ChangePassword";
import EditAccountModal from "@pages/Admin/AccountPages/modal/EditAccountModal";
function HomeLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const width = resizeWidth();
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [openRegisterService, setOpenRegisterService] =
    useState<boolean>(false);
  const [account, setAccount] = useState<IAccount>();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  // const [totalRegisterService, setTotalRegisterService] = useState<number>(0);

  const user = useAppSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-black";
  const toggleNav = () => {
   
    width >= 780 ? setIsNavOpen((prev) => !prev) : setOpenDrawer(true);
  };


  
  const handleLogout = async () => {
    const res = await authApi.apiLogout();
    if (res?.data) {
      dispatch(logoutAction());
      navigate("/login");
      message.success("Logged out successfully");
    }
  };

  const handleGetUser = async () => {
    const res = await accountApi.fetchAccountByIdApi(user?._id);
    if (res.data) {
      setAccount(res.data);
      setOpenEditAccount(true);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChangePassword = () => setOpenChangePassword(true);

  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={handleGetUser}>
        <p className={` flex items-center`}>
          Update Profile
          <i className="fa fa-user m-3" />
        </p>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleChangePassword}>
        <p className={` $  flex items-center`}>
          Change Password
          <i className="fa fa-key m-3" />
        </p>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <p className={`   flex items-center`}>
          Logout
          <i className="fa fa-sign-out m-3" />
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {width >= 780 ? (
        <NavMenu
          isNavOpen={isNavOpen}
          //  setIsNavOpen={setIsNavOpen}
        />
      ) : (
        <DrawerMenu
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          textColor={textColor}
          bgColor={bgColor}
        />
      )}

      <div
        className={`flex-1 transition-all duration-300 
     ${bgColor} ${textColor} 
        `}
      >
        <div
          className={`flex items-center text-black h-16 px-5 justify-between 
      ${theme === "light" ? "bg-white" : "bg-gray-800 "} ${textColor} 
          `}
        >
          <div className="flex hover:text-slate-300" onClick={toggleNav}>
            <i className="fa fa-bars text-2xl cursor-pointer font-bold" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <i
              className={`fa-solid  text-2xl cursor-pointer hover:opacity-80 ${textColor} ${
                theme === "light" ? "fa-sun " : " fa-moon"
              } `}
              onClick={toggleTheme}
            />
     
            <Dropdown overlay={menu} trigger={["hover"]}>
              <div className="flex justify-center items-center hover:text-blue-500">
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                ) : (
                  <i className="fa fa-user-circle text-2xl mr-2" />
                )}
                <p>{user?.name}</p>
                <i className="fa-solid fa-angle-down ml-1" />
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="flex-1 flex-row overflow-y-auto overflow-x-auto max-h-[calc(100vh-4rem)] max-w-[100vw] p-2">
          <Outlet />
        </div>
      </div>

      <ChangePassword
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
      {account && (
        <EditAccountModal
          openEditAccount={openEditAccount}
          setOpenEditAccount={setOpenEditAccount}
          record={account}
          isChangeRole={true}
        />
      )}
    </div>
  );
}

export default HomeLayout;
