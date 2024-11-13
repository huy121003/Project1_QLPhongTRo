import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import homeAdminRouters from "../../routers";
import { resizeWidth } from "../../utils/resize";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { accountApi, authtApi } from "../../api";
import { logoutAction } from "../../redux/slice/auth/authSlice";
import { Dropdown, Menu, message } from "antd";
import ChangePassword from "../../pages/AuthPages/ChangePassword";
import { IAccount } from "../../interfaces";
import EditAccountModal from "../../pages/Admin/AccountPages/EditAccountModal";
function HomeLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const width = resizeWidth();
  const [selected, setSelected] = useState<string>(
    /* localStorage.getItem("selected") ||*/ "Dashboard"
  );
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [account, setAccount] = useState<IAccount>();
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
  const handleGetUser = async () => {
    const res = await accountApi.fetchAccountByIdApi(user?._id);
    if (res.data) {
      setAccount(res.data);
      setOpenEditAccount(true);
    } else {
      message.error("Something went wrong");
    }
  };
  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };
  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={handleGetUser}>
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
    <div className="flex h-screen overflow-hidden ">
      <nav
        className={`flex flex-col  items-center  h-full shadow-lg transition-all duration-300  ${
          width <= 680
            ? isNavOpen
              ? "w-16 px-1"
              : "w-0"
            : isNavOpen
            ? " px-1 w-[250px]"
            : "w-16"
        } `}
      >
        <div
          className={`flex  h-[100px]  border-b-2 border-gray-200 w-full   `}
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
                selected === item.label ? "text-blue-700 font-bold" : ""
              }`}
              onClick={() => setSelected(item.label ?? "Dashboard")}
            >
              <i className={`fa ${item.icon} text-2xl `} />
              {width > 680 && isNavOpen ? (
                <p className="ml-4 text-lg text-center">{item.label}</p>
              ) : null}
            </Link>
          ))}
      </nav>

      <div className="flex-1  transition-all duration-300 bg-gray-100 ">
        <div className="flex items-center  text-black h-16 px-5 justify-between bg-white">
          <div className="flex hover:text-slate-300" onClick={toggleNav}>
            <i className="fa fa-bars text-2xl cursor-pointer font-bold" />
            <h2 className="ml-4 text-2xl font-bold">{selected}</h2>
          </div>

          <Dropdown overlay={menu} trigger={["hover"]}>
            <div className="flex justify-center items-center hover:text-blue-500">
              <i className="fa-solid fa-user-circle text-3xl mr-3"></i>
              <p className=""> {user?.name}</p>
              <i className="fa-solid fa-angle-down ml-1"></i>
            </div>
          </Dropdown>
        </div>
        <div
          className="flex-1 flex-row overflow-y-auto overflow-x-auto 
          max-h-[calc(100vh-4rem)] max-w-[100vw]"
        >
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
    </div>
  );
}

export default HomeLayout;
