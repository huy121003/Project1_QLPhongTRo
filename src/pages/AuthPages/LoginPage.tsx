import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, message, Divider } from "antd";
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

        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(loginaction(res.data.user));
            // console.log(res.data.user)
            message.success("Login successfully!");
            navigate("/dashboard");
        } else {
            message.error(res.message);
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
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "The input is not a valid email!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input your email"
                            className="text-lg rounded-md border-gray-300 "
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Input your password"
                            className="text-lg rounded-md border-gray-300 "
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-[150px] text-lg bg-red-400 hover:bg-red-500"
                            loading={issubmit}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div className="mt-6 text-center">
                    <span className="text-gray-400">
                        Don't have an account? 
                    </span>
                    <Link to="/register" className="text-red-400 font-semibold">
                         Register
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;
