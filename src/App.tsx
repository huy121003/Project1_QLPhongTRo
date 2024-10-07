import  { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { apiFetchUser } from "./services/authtApi";
import { getUserAction } from "./redux/slice/auth/authSlice";

import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./components/NotFoundPage";
import Loading from "./components/Loading";
import homeRouters from "./routers/index";
import ProtectedRoute from "./routers/ProtectedRouter";

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
    const isLoginPage = window.location.pathname === "/login" ||window.location.pathname === "/register";
    if (!isLoginPage) {
      const getAccount = async () => {
        const res = await apiFetchUser();
        if (res?.data) {
          dispatch(getUserAction(res.data.user));
        }
      };
      getAccount();
    }
  }, [dispatch, isAuthenticated]); // Correct dependencies

  // Conditional rendering logic simplified
  if (
    isAuthenticated === true ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/"
  ) {
    return <RouterProvider router={router} />;
  } else {
    return <Loading />;
  }
}

export default App;
