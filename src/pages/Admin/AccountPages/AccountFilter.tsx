// src/components/AccountFilters.tsx
import React from "react";
import { Radio, Space } from "antd";
import SearchFilters from "../../../components/SearchFilter";
import { RoleModel } from "../../../models/RoleModel";
import SortOption from "../../../components/SortOption";
interface Props {
  searchParams: any;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
  sorted: string;
  roles: RoleModel[];
}
const AccountFilters: React.FC<Props> = ({
  searchParams,
  handleSearchChange,
  handleSortChange,
  sorted,
  roles,
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
          {
            label: "Role",
            field: "role",
            type: "select",
            options: [
              { value: "", label: "All Role" },
              ...roles.map((role) => ({
                value: role._id,
                label: role.name,
              })),
            ],
          },
        ]}
      />
      <SortOption
        options={[
          { value: "name", label: "By Name" },
          { value: "email", label: "By Email" },
          { value: "role", label: "By Role" },
          { value: "-createdAt", label: "By Created At" },
        ]}
        onChange={handleSortChange}
        sorted={sorted}
      />
    </div>
  );
};

export default AccountFilters;
