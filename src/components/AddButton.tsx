import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface AddButtonProps {
  onClick: () => void; // Hàm để xử lý sự kiện click
  label: string; // Văn bản hiển thị trên nút
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      className="bg-blue-600 h-[40px] rounded  mx-2 text-xl"
      onClick={onClick}
    >
      {label} {/* Sử dụng label */}
    </Button>
  );
};

export default AddButton;
