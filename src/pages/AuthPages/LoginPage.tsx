import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, message, Divider, Modal } from "antd";
import { useAppDispatch } from "../../redux/hook";
import { apiLogin, retryCode } from "../../services/authtApi";
import { loginaction } from "../../redux/slice/auth/authSlice";
import { useState } from "react";
import ResetPasswordPage from "./ResetPasswordPage";
import RetryCodePage from "./RetryCodePage";
import axios from "axios";

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [issubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openResetPassword, setOpenResetPassword] = useState<boolean>(false);
  const [openRetryCode, setOpenRetryCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handleLogin = async (value: any) => {
    const { email, password } = value;
    setEmail(email);
    setIsSubmit(true);
    const res = await apiLogin(email, password);

    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      console.log('login',axios.defaults.headers.common["Authorization"]);
      dispatch(loginaction(res.data.user));
      // console.log(res.data.user)
      message.success("Login successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      if (res?.message === "Account has not been activated!") {
        message.error(res.message);
        setOpenRetryCode(true);
      } else message.error(res.message);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-gradient-to-br from-purple-400 to-green-300 p-12 rounded-lg shadow-lg lg:w-[500px] mx-2">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Login
        </h2>
        <Divider />
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input
              placeholder="Type your email"
              className="text-lg rounded-md border-gray-300"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Type your password"
              className="text-lg rounded-md border-gray-300"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-lg bg-red-400 hover:bg-red-500"
              loading={issubmit}
              size="large"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="flex-1 justify-end">
          <Button
            size="large"
            type="link"
            onClick={() => setOpenResetPassword(true)}
          >
            {" "}
            Forgot Password ?
          </Button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-gray-300">Don't have an account?</span>
          <Link to="/register" className="text-white font-semibold">
            Register
          </Link>
        </div>

        <ResetPasswordPage
          open={openResetPassword}
          setOpen={setOpenResetPassword}
        />
        <RetryCodePage
          open={openRetryCode}
          setOpen={setOpenRetryCode}
          email={email}
        />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
