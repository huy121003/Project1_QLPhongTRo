import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const RegisterServiceModal: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal
      centered
      open={open}
      title={
        <h1 className="text-3xl font-bold text-center">Register Service</h1>
      }
      onCancel={() => setOpen(false)}
      footer={null}
    ></Modal>
  );
};

export default RegisterServiceModal;
