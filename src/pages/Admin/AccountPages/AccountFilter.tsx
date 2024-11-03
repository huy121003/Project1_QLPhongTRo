// src/components/AccountFilters.tsx
import React from "react";
import { Radio, Space } from "antd";
import SearchFilters from "../../../components/SearchFilter";
interface Props {
  searchParams: any;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
  sorted: string;
  setVisibleColumns: (value: any) => void;
  columns: any;
  visibleColumns: any;
}
const AccountFilters: React.FC<Props> = ({
  searchParams,
  handleSearchChange,
  handleSortChange,
  sorted,
  setVisibleColumns,
  columns,
  visibleColumns,
}) => {
  return (
    <div className="justify-end p-2 w-full">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          { label: "Name", field: "name", type: "text" },
          { label: "Email", field: "email", type: "text" },
          { label: "Phone", field: "phone", type: "text" },
          { label: "IdCard", field: "idCard", type: "text" },
          {
            label: "Gender",
            field: "gender",
            type: "select",
            options: [
              { value: "", label: "All Gender" },
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "OTHER", label: "Other" },
            ],
          },
        ]}
      />

      <div className="bg-white p-2 rounded-lg m-2">
        <h2 className="font-bold text-xl my-3">Sort by</h2>
        <Radio.Group onChange={handleSortChange} value={sorted}>
          <Space direction="horizontal" className="justify-between">
            <Radio value="name" className="font-bold">
              By Name
            </Radio>
            <Radio value="email" className="font-bold">
              By Email
            </Radio>
            <Radio value="role" className="font-bold">
              By Role
            </Radio>
            <Radio value="-createAt" className="font-bold">
              By CreateAt
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default AccountFilters;
