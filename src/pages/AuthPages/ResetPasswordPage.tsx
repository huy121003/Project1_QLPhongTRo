import React, { useState } from "react";
import { Button, Divider, Form, Input, message, Modal, Steps } from "antd";
import { useNavigate } from "react-router-dom";


interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ResetPasswordPage: React.FC<Props> = ({ open, setOpen }) => {
  const EnterEmail = () => (
    <div className="mt-12">
      <p className="text-gray-500 mb-4">Please enter your email address.</p>
      <Form>
        <Form.Item>
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => setCurrent(current + 1)}>
        Submit
      </Button>
    </div>
  );

  const EnterPassword = () => (
    <div className="mt-12">
      <p className="text-gray-500 mb-4">
        A code has been sent to your email address. Please enter the code to
        reset your password.
      </p>
      <Form>
        <Form.Item>
          <Input placeholder="Code" />
        </Form.Item>
        <p className="text-gray-500 mb-4">Please enter your new password.</p>
        <Form.Item>
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => setCurrent(current + 1)}>
        Submit
      </Button>
    </div>
  );

  const Done = () => (
    <div className="mt-12 flex flex-col items-center">
      <i className="fa-solid fa-circle-check text-[100px] text-blue-500 mb-4"></i>
      <p className="text-gray-500">
        Your password has been reset successfully.
      </p>
      <Button type="primary" onClick={() =>setOpen(false)}>
        Submit
      </Button>
    </div>
  );

  const steps = [
    {
      title: "Email",
      content: <EnterEmail />,
      icon: <i className="fa-solid fa-envelope" />,
    },
    {
      title: "Reset Password",
      content: <EnterPassword />,
      icon: <i className="fa-solid fa-lock" />,
    },
    {
      title: "Done",
      content: <Done />,
      icon: <i className="fa-solid fa-check" />,
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <Modal
      open={open}
      centered
      onCancel={() => {
        setOpen(false);
        setCurrent(0);
      }}
      footer={null}
      title={<h1 className="text-3xl font-bold text-center">Reset Pasword</h1>}
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Reset Password
      </h2>
      <Divider />
      <Steps current={current}>
        {steps.map((item, index) => (
          <Steps.Step
            key={index}
            title={item.title}
            icon={item.icon}
            className="flex"
          />
        ))}
      </Steps>
      <div className="mt-8">{steps[current].content}</div>
    </Modal>
  );
};

export default ResetPasswordPage;
