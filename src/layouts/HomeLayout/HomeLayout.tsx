import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { resizeWidth } from "../../utils/resize";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { accountApi, authtApi, registerServiceAPI } from "../../api";
import { logoutAction } from "../../redux/slice/auth/authSlice";
import { Badge, Dropdown, Menu, message, notification } from "antd";
import ChangePassword from "../../pages/AuthPages/ChangePassword";
import { IAccount } from "../../interfaces";
import EditAccountModal from "../../pages/Admin/AccountPages/EditAccountModal";
import { homeAdminRouters } from "../../routers";
import NotificationModal from "../../pages/Admin/HandleNotificationPages/NotificationModal";
import { RegisterServiceStatus } from "../../enums";
import { useTheme } from "../../contexts/ThemeContext";

function HomeLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const width = resizeWidth();
  const [selected, setSelected] = useState<string>("Dashboard");
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [openRegisterService, setOpenRegisterService] =
    useState<boolean>(false);
  const [account, setAccount] = useState<IAccount>();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);
  const [totalRegisterService, setTotalRegisterService] = useState<number>(0);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({}); // Trạng thái menu con

  const user = useAppSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-black";
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  useEffect(() => {
    setInterval(async () => {
      const res = await registerServiceAPI.fetchRegisterServiceApi(
        `status=${RegisterServiceStatus.PENDING}`
      );
      if (res.data) {
        setTotalRegisterService(res.data.result.length);
      }
    }, 10000);
  }, []);

  const handleLogout = async () => {
    const res = await authtApi.apiLogout();
    if (res?.data) {
      dispatch(logoutAction());
      navigate("/");
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

  const handleSelectNotification = (notificationId: string) => {
    // Cập nhật menu chính khi thông báo được chọn
    setSelected("Register Service"); // Cập nhật menu chính (hoặc chọn một menu tương ứng với thông báo)

    // Cập nhật trạng thái submenu
    setExpandedMenus((prev) => ({
      ...prev,
      "Register Service": true, // Ví dụ, mở submenu "Register Service"
    }));
  };

  const renderMenuChild = (route: any) => {
    const isExpanded = expandedMenus[route.label] || false; // Kiểm tra xem submenu có mở hay không

    return route.children ? (
      <div key={route.label} className="flex flex-col w-full">
        <div
          className={`flex items-center  py-2 mt-2 px-4 cursor-pointer  w-full
        
            `}
          onClick={() =>
            setExpandedMenus((prev) => ({
              ...prev,
              [route.label]: !isExpanded, // Toggle mở/đóng submenu
            }))
          }
        >
          <i className={`fa ${route.icon} text-2xl`} />
          {width > 680 && isNavOpen && (
            <>
              <p className="ml-4 text-lg">{route.label}</p>
              <i
                className={`fa fa-chevron-${
                  isExpanded ? "up" : "down"
                } ml-auto`}
              />
            </>
          )}
        </div>

        {isExpanded && (
          <div className="pl-6">
            {route.children.map((child: any) => (
              <Link
                key={child.path}
                to={`/admin/${route.path}/${child.path}`}
                className={`flex  flex-row items-center  rounded-md my-1 py-1 transition-colors duration-300 
                 
              ${textColor} 
                `}
                onClick={() => setSelected(child.label ?? route.label)}
              >
                <p
                  className={`${
                    selected === child.label ? "text-blue-700 font-bold" : ""
                  } flex`}
                >
                  <i className={`fa ${child.icon} text-sm`} />
                  {width > 680 && isNavOpen && (
                    <p className="ml-4 text-sm">{child.label}</p>
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    ) : (
      <Link
        to={route.path}
        key={route.label}
        className={`flex flex-row items-center  rounded-md my-1 px-4 py-1 w-full transition-colors duration-300 
        ${textColor} 
        `}
        onClick={() => setSelected(route.label ?? "Dashboard")}
      >
        <p
          className={`${
            selected === route.label ? "text-blue-700 font-bold" : ""
          } flex`}
        >
          <i className={`fa ${route.icon} text-2xl`} />
          {width > 680 && isNavOpen && (
            <p className="ml-4 text-lg">{route.label}</p>
          )}
        </p>
      </Link>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <nav
        className={`flex flex-col items-center h-full shadow-lg transition-all duration-300 ${
          width <= 680
            ? isNavOpen
              ? "w-16 px-1"
              : "w-0"
            : isNavOpen
            ? "px-1 w-[200px]"
            : "w-16"
        }
      ${bgColor} ${textColor} 
        `}
      >
        <div className="border-b-2 w-full justify-center items-center flex">
          <img
            src="https://avatars3.githubusercontent.com/u/12101536?s=400&v=4"
            alt="logo"
            className={`${
              width >= 780 ? "w-16 h-16" : "w-12 h-12"
            } rounded-full my-4`}
          />
          {isNavOpen && width > 680 && (
            <span className="text-2xl font-bold text-center">For Admin</span>
          )}
        </div>

        {homeAdminRouters
          .filter((item) => item.label !== undefined)
          .map((item) => renderMenuChild(item))}
      </nav>

      <div
        className={`flex-1 transition-all duration-300 
     ${bgColor} ${textColor} 
        `}
      >
        <div
          className={`flex items-center text-black h-16 px-5 justify-between 
      ${bgColor} ${textColor} 
          `}
        >
          <div className="flex hover:text-slate-300" onClick={toggleNav}>
            <i className="fa fa-bars text-2xl cursor-pointer font-bold" />
            <h2 className="ml-4 text-2xl font-bold">{selected}</h2>
          </div>
          <div className="flex justify-center items-center">
            <i
              className={`fa-solid  text-2xl cursor-pointer hover:opacity-80 ${textColor} ${
                theme === "light" ? "fa-sun " : " fa-moon"
              } `}
              onClick={toggleTheme}
            />
            <div className="mx-4">
              <Badge
                count={totalRegisterService}
                onClick={() => setOpenRegisterService(true)}
              >
                <i className="fa fa-bell text-2xl cursor-pointer text-red-600" />
              </Badge>
            </div>
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

        <div className="flex-1 flex-row overflow-y-auto overflow-x-auto max-h-[calc(100vh-4rem)] max-w-[100vw]">
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
        />
      )}
      <NotificationModal
        open={openRegisterService}
        setOpen={setOpenRegisterService}
        onSelectNotification={(id: string) => handleSelectNotification(id)} // Truyền hàm cập nhật menu
      />
    </div>
  );
}

export default HomeLayout;
