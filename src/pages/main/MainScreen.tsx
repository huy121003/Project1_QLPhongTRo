import { useState } from "react";
import "./MainScreen.css";
import { Link, useNavigate } from "react-router-dom";
import MainRouter from "../../routers/MainRouter";

enum NavItem {
  Home = "Home",
  Room = "Room",
  Electric = "Electric",
  Water = "Water",
  Services = "Services",
  Staff = "Staff",
  Invoice = "Invoice",
  Setting = "Setting",
  Logout = "Logout",
}

const navItems = [
  { icon: "fa-home", label: NavItem.Home, path: "/" },
  { icon: "fa-bed", label: NavItem.Room, path: "/room/index" },
  { icon: "fa-bolt", label: NavItem.Electric, path: "/electric/index" },
  { icon: "fa-shower", label: NavItem.Water, path: "/water/index" },
  { icon: "fa-cubes", label: NavItem.Services, path: "/service/index" },
  { icon: "fa-users", label: NavItem.Staff, path: "/staff/index" },
  { icon: "fa-money-bill", label: NavItem.Invoice, path: "/invoice/index" },
  { icon: "fa-gears", label: NavItem.Setting, path: "/setting/index" },
];

function MainScreen() {
  
  const [selected, setSelected] = useState<NavItem>(NavItem.Home);
  const [isNavOpen, setIsNavOpen] = useState(false);




  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="main">
      <nav className={`nav__container ${isNavOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`nav__item ${
              selected === item.label ? "nav__item--active" : ""
            }`}
            onClick={() => setSelected(item.label)}
          >
            <i className={`fa ${item.icon}`} />
            {!isNavOpen && <p>{item.label}</p>} {/* Hiển thị tên khi nav mở */}
          </Link>
        ))}
        <div className="nav__spacer" />
        <Link to="/auth/login" className="nav__item">
          <i className="fa fa-sign-out" />
          {!isNavOpen && <p>{NavItem.Logout}</p>}
          {/* Hiển thị tên logout khi nav mở */}
        </Link>
      </nav>

      <div className="main__content">
        <div className="main__menu">
          <i className="fa fa-bars" onClick={toggleNav} /> {/* Nút toggle */}
          <h2>{selected}</h2>
        </div>
        <div className="main__body">
          <MainRouter />
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
