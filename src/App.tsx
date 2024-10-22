import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { apiFetchUser } from "./services/authtApi";
import { getUserAction } from "./redux/slice/auth/authSlice";

import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import NotFoundPage from "./components/NotFoundPage";
import Loading from "./components/Loading";
import homeRouters from "./routers/index";
import ProtectedRoute from "./routers/ProtectedRouter";
import { message } from "antd";
import { fecthRoleApi } from "./services/roleApi";
import { RoleModel } from "./models/RoleModel";
import { fetchRoleAction } from "./redux/slice/role/roleSlice";

// Router setup moved outside to avoid re-creating it on every render
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      ...homeRouters.map((route) => ({
        path: route.path,
        element: <route.component />, // Assuming correct JSX element rendering
      })),
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
 

  useEffect(() => {
    // Only fetch the user account if authenticated and not on the login page
    const isLoginPage =
      window.location.pathname === "/login" ||
      window.location.pathname === "/register";
    if (!isLoginPage) {
      const getAccount = async () => {
        const res = await apiFetchUser();
        if (res?.data) {
          dispatch(getUserAction(res.data.user));
          //  message.success(res.message);
        } else message.error(res.message);
      };
      const getRole = async () => {
        const res = await fecthRoleApi();
        if (res?.data) {
      
          const roles = res.data.result.map((item: RoleModel) => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            permissions: item.permissions,
          }));
          dispatch(fetchRoleAction(roles));
        } else message.error(res.message);
      };
      getRole();
      getAccount();
    }
  }, [dispatch, isAuthenticated]); // Correct dependencies

  // Conditional rendering logic simplified
  if (
    isAuthenticated === true ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/"||
    window.location.pathname === "/register"
  ) {
    return <RouterProvider router={router} />;
  } else {
    return <Loading />;
  }
}

export default App;
