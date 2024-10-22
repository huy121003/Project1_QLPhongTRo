import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import {
    Form,
    Input,
    Button,
    Select,
    notification,
    message,
    DatePicker,
} from "antd";
import { apiRegister } from "../../services/authtApi";
const { Option } = Select;

function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (values: any) => {
        const birthdayDate = values.birthday.toDate();
        const birthdayIsoString = new Date(birthdayDate).toISOString();
        const birthdayAsDate = new Date(birthdayIsoString);
        console.log(typeof birthdayAsDate);
        const res = await apiRegister(
            values.email,
            values.phone,
            values.password,
            values.username,
            birthdayAsDate,
            values.gender,
            values.address,
            values.idCard
        );
        if (res.statusCode === 201) {
            message.success(res.message);
            navigate("/login");
        } else message.error(res.message);
    };

    return (
        <AuthLayout>
            <div className=" bg-gradient-to-br from-purple-400 to-green-300 p-12 rounded-lg shadow-lg w-[800px] mx-auto">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    Register
                </h2>

                <Form layout="vertical" onFinish={handleRegister}>
                    <div className="grid grid-cols-2 gap-x-8">
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter username"
                                className="text-lg rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email!",
                                },
                                {
                                    type: "email",
                                    message: "The input is not a valid email!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter email"
                                className="text-lg rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your phone!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter phone"
                                type="number"
                                className="text-lg rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter password"
                                className="text-lg rounded-md border-gray-300"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Bỉrthday"
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your Bỉrthday!",
                                },
                            ]}
                        >
                            <DatePicker
                                placeholder="Enter BirthDay"
                                className="w-[336px] h-[38px] "
                            />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your address!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter address"
                                className="text-lg rounded-md border-gray-300"
                            />
                        </Form.Item>
                        <Form.Item
                            label={<span>CCCD </span>}
                            name="idCard"
                            rules={[
                                {
                                    required: true,
                                    message: "CCCD is required",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder="Enter account CCCD"
                                className="h-[38px] placeholder:text-lg"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your gender!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select gender"
                                className="text-lg rounded-md border-gray-300 h-[38px] "
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-[200px]  text-lg bg-yellow-400 hover:bg-yellow-500"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;
