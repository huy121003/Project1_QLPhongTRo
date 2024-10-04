import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import { useEffect } from "react";

function AppRoutes() {
  const navigate = useNavigate();

  // useEffect để kiểm tra token nếu cần
  // const [checkToken, setCheckToken] = useState(true);
  // useEffect(() => {
  //   if (!checkToken) {
  //     navigate("/login");
  //   } else {
  //     setCheckToken(true);
  //   }
  // }, [checkToken, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeLayout>
            <DashboardPage />
          </HomeLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<HomePage />} errorElement={<NotFoundPage />} /> {/* Sửa lại cú pháp */}
      <Route path="*" element={<NotFoundPage />} /> {/* Route cho 404 */}
    </Routes>
  );
}

export default AppRoutes;
