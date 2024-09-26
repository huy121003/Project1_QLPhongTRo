import { Outlet } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout/HomeLayout";

import PrivateRoute from "../../routers/PrivateRoute";

function HomePage() {
  return (
    <HomeLayout>
      <PrivateRoute />
      <Outlet />
    </HomeLayout>
  );
}

export default HomePage;
