import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, message, notification, Divider } from "antd";
import { useAppDispatch } from "../../redux/hook";
import { apiLogin } from "../../services/authtApi";
import { loginaction } from "../../redux/slice/auth/authSlice";
import { useState } from "react";

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [issubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (value: any) => {
    const { email, password } = value;
    setIsSubmit(true);
    const res = await apiLogin(email, password);
    console.log(res);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(loginaction(res.data.user));
      // console.log(res.data.user)
      message.success("Login successfully!");
      navigate("/dashboard");
    } else {
      const errorMessage = res.data.message;
      notification.error({
        message: "Login failed!",
        description: Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : errorMessage || "Unknown error",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="bg-gradient-to-br from-purple-400 to-green-300 p-12 rounded-lg shadow-lg w-[500px] mx-auto">
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
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Type your password"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-lg bg-red-400 hover:bg-red-500"
              loading={issubmit}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <span className="text-gray-300">Don't have an account?</span>
          <Link to="/register" className="text-white font-semibold">
            Register
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
