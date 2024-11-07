import React from "react";
import SearchFilters from "../../../components/SearchFilter";
import { ContractStatus } from "../../../models/ContractModel";
import SortOption from "../../../components/SortOption";
interface Props {
  searchParams: any;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
  sorted: string;
}
const ContractFilters: React.FC<Props> = ({
  searchParams,
  handleSearchChange,
  handleSortChange,
  sorted,
}) => {
  return (
    <div className="justify-end  w-full ">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          {
            label: "Room Name",
            field: "room.roomName",
            type: "text",
          },
          {
            label: "Tenant Name",
            field: "tenant.name",
            type: "text",
          },
          {
            label: "Phone",
            field: "tenant.phone",
            type: "text",
          },
          {
            label: "Status",
            field: "status",
            type: "select",
            options: [
              { label: "All Status", value: "" },
              { label: "ACTIVE", value: ContractStatus.ACTIVE },
              { label: "EXPIRED", value: ContractStatus.EXPIRED },
              { label: "CANCELED", value: ContractStatus.CANCELED },
            ],
          },
        ]}
      />
      <SortOption
        options={[
          { value: "room.roomName", label: "By Room Name" },
          { value: "tenant.name", label: "By Tenant Name" },
          { value: "status", label: "By Status" },
          { value: "startDate", label: "By Start Date" },
          {
            value: "endDate",
            label: "By End Date",
          },
        ]}
        onChange={handleSortChange}
        sorted={sorted}
      />
    </div>
  );
};

export default ContractFilters;
