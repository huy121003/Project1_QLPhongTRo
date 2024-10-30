// SearchFilters.tsx
import { DatePicker, Input, Select, Space } from "antd";
const { Option } = Select;

interface Field {
  label: string; // Label của trường
  field: string; // Tên trường trong dữ liệu
  type: "text" | "select" | "date"; // Kiểu input: text hoặc select
  options?: { value: string; label: string }[]; // Chỉ dùng khi type là select
}

interface SearchFiltersProps {
  searchParams: any;
  onSearchChange: (field: string, value: string) => void;
  fields: Field[]; // Truyền vào các trường tìm kiếm
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchParams,
  onSearchChange,
  fields,
}) => {
  return (
    <div className="bg-white p-2 rounded-lg m-2 ">
      <h2 className="font-bold text-xl my-3">Search</h2>
      <Space direction="horizontal">
        {fields.map((field) => {
          if (field.type === "text") {
            return (
              <Input
                key={field.field}
                placeholder={`Search by ${field.label}`}
                value={searchParams[field.field]}
                onChange={(e) => onSearchChange(field.field, e.target.value)}
              />
            );
          }
          if (field.type === "select") {
            return (
              <Select
                key={field.field}
                placeholder={`Select ${field.label}`}
                value={searchParams[field.field]}
                onChange={(value) => onSearchChange(field.field, value)}
                style={{ width: 120 }}
              >
                {field.options?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            );
          }
          if (field.type === "date") {
            return (
              <DatePicker
                key={field.field}
                placeholder={`Search by ${field.label}`}
                value={searchParams[field.field]}
                onChange={(e) => onSearchChange(field.field, e.target.value)}
              />
            );
          }
          return null;
        })}
      </Space>
    </div>
  );
};

export default SearchFilters;
