import SearchFilters from "@components/SearchFilter";
import SortOption from "@components/SortOption";
import { RequestContractStatus } from "enums";
import React from "react";


interface Props {
  searchParams: any;
  sorted: string;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
}
const RequestContractFilter: React.FC<Props> = ({
  searchParams,
  sorted,
  handleSearchChange,
  handleSortChange,
}) => {
  return (
    <div className="justify-end flex gap-2  w-full ">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          {
            label: "Status",
            field: "status",
            type: "select",
            options: [
              {
                label: "All Status",
                value: "",
              },
              {
                label: RequestContractStatus.PENDING,
                value: RequestContractStatus.PENDING,
              },
              {
                label: RequestContractStatus.REJECTED,
                value: RequestContractStatus.REJECTED,
              },
              {
                label: RequestContractStatus.SUCCESS,
                value: RequestContractStatus.SUCCESS,
              },
            ],
          },
          {
            label: "Type",
            field: "type",
            type: "select",
            options: [
              { label: "All Type", value: "" },
              { label: "Extend", value: "true" },
              { label: "Cancel", value: "false" },
            ],
          },
        ]}
      />
      <SortOption
        sorted={sorted}
        onChange={handleSortChange}
        options={[
          { label: "Newest", value: "-createdAt" },
          { label: "Oldest", value: "createdAt" },
          {
            label: "Status",
            value: "status",
          },
          {
            label: "Type",
            value: "type",
          },
        ]}
      />
    </div>
  );
};
export default RequestContractFilter;
