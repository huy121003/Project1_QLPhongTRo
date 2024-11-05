import React from "react";
import { Button } from "antd";

interface AddButtonProps {
  onClick: () => void; // Hàm để xử lý sự kiện click
  label: string; // Văn bản hiển thị trên nút
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <Button type="primary" className="   py-6 px-2 " onClick={onClick}>
      <i className="fa-solid fa-plus"></i>
      {label}
    </Button>
  );
};

export default AddButton;
