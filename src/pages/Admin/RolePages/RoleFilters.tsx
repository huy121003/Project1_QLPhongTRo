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
const RoleFilters: React.FC<Props> = ({
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
        fields={[{ label: "Role Name", field: "name", type: "text" }]}
      />
      <div className="bg-white p-2 rounded-lg m-2">
        <h2 className="font-bold text-xl my-3">Sort by</h2>
        <Radio.Group onChange={handleSortChange} value={sorted}>
          <Space direction="horizontal">
            <Radio value="name">Role Name</Radio>
            <Radio value="createdAt">Created At</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default RoleFilters;
