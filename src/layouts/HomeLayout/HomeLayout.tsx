import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import homeRouters from "../../routers";
import { resizeWidth } from "../../utils/resize";
import { useAppDispatch } from "../../redux/hook";


interface Props {
  children: React.ReactNode;
}

function HomeLayout({ children }: Props) {
  //const dispatch = useAppDispatch();
  const width = resizeWidth();
  const [selected, setSelected] = useState<string>(
    localStorage.getItem("selected") || "Dashboard"
  );
  const [isNavOpen, setIsNavOpen] = useState<boolean>(
    localStorage.getItem("isNavOpen") === "true" || true
  );

  // Lưu trữ state vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("selected", selected);
    localStorage.setItem("isNavOpen", String(isNavOpen));
  }, [selected, isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  const handleLogout = () => {
    //dispatch(logout());
  };

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
        {homeRouters
          .filter((item) => item.label !== undefined)
          .map((item) => (
            <Link
              to={item.path}
              key={item.label}
              className={`flex flex-row items-center text-black rounded-md my-1 px-4 py-2 w-full transition-colors duration-300  ${
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
        <div className="flex-1" />
        <div
          // to="/login"
          onClick={handleLogout}
          className="flex flex-row items-center bg-white text-black rounded-md px-4 py-2 w-full"
        >
          <i className="fa fa-sign-out text-2xl" />
          {width > 680 && isNavOpen ? (
            <p className="ml-4 text-lg">Log out</p>
          ) : null}
        </div>
      </nav>

      <div className="flex-1 bg-gray-100 transition-all duration-300">
        <div className="flex items-center bg-white text-black h-16 px-5">
          <i
            className="fa fa-bars text-2xl cursor-pointer"
            onClick={toggleNav}
          />
          <h2 className="ml-4 text-2xl">{selected}</h2>
        </div>
        <div
          className="flex-1 flex-row overflow-y-auto "
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
