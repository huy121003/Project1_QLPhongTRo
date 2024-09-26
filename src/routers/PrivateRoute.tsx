
import { Route, Routes } from "react-router-dom";

import homeRouters from ".";

const PrivateRoute = () => {
  // Use props here to avoid the "never read" error
  // check token
  // const user = localStorage.getItem("user");
  // if (!user) {
  //   return <>You don't have premisson to acess this route</>;
  // }

  return (
    <>
      <Routes>
        {homeRouters.map((router, index) => {
          return (
            <Route
              key={index}
              path={router.path}
              element={<router.component />}
            />
          );
        })}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
