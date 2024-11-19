import React from "react";
import { RegisterServiceStatus } from "../../../enums";
import { SearchFilters } from "../../../components";
interface Props {
  searchParams: any;
  sorted: string;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
}
const RequestServiceFilter: React.FC<Props> = ({
  searchParams,
  sorted,
  handleSearchChange,
  handleSortChange,
}) => {
  return (
    <div className="justify-end  w-full ">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          {
            label: "Status",
            field: "status",
            type: "select",
            options: [
              { label: "All Status", value: "" },
              { label: "PENDING", value: RegisterServiceStatus.PENDING },
              { label: "APPROVED", value: RegisterServiceStatus.APPROVED },
              { label: "SUCCESS", value: RegisterServiceStatus.SUCCESS },
            ],
          },
          {
            label: "Type",
            field: "type",
            type: "select",
            options: [
              { label: "All Type", value: "" },
              { label: "Register", value: "true" },
              { label: "Unregister", value: "false" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RequestServiceFilter;
