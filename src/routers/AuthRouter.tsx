import {

  Route,
  Routes,
 
} from "react-router-dom";

import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginScreen />} />
      <Route path="/auth/register" element={<RegisterScreen />} />
  
    </Routes>
  
  );
};

export default AuthRouter;
