import { Radio } from "antd";
import React from "react";

// Định nghĩa kiểu cho các tùy chọn
interface SortOption {
  value: string;
  label: string;
}

// Định nghĩa kiểu cho các props của component
interface SortByProps {
  options: SortOption[];
  onChange: (value: any) => void;
  sorted: string;
}

const SortOption: React.FC<SortByProps> = ({ options, onChange, sorted }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col">
      <h2 className="font-bold text-xl my-3 text-gray-800">Sort By</h2>
      <Radio.Group onChange={onChange} value={sorted}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              className="font-bold text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {option.label}
            </Radio>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
};

export default SortOption;
