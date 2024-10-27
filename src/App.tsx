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
import homeAdminRouters from "./routers/index";
import ProtectedRoute from "./routers/ProtectedRouter";
import { message } from "antd";

import UserLayout from "./layouts/UserLayout/UserLayout";

// Router setup moved outside to avoid re-creating it on every render
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      ...homeAdminRouters.map((route: any) => ({
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
  {
    path: "user",
    element: <UserLayout />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }
    const res = await apiFetchUser();

    if (res?.data) {
      dispatch(getUserAction(res.data.user));
    } else message.error(res.message);
  };

  useEffect(() => {
    // Only fetch the user account if authenticated and not on the login page
    getAccount();
  }, []); // Correct dependencies
  // Conditional rendering logic simplified
  if (
    isAuthenticated === true ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/" ||
    window.location.pathname === "/register"
  ) {
    return <RouterProvider router={router} />;
  } else {
    return <Loading />;
  }
}

export default App;
