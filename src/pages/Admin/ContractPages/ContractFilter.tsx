import React from "react";
import { Radio, Space } from "antd";
import SearchFilters from "../../../components/SearchFilter";
import { ContractStatus } from "../../../models/ContractModel";
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
    <div className="justify-end p-2 w-full ">
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
      <div className="bg-white p-2 rounded-lg m-2 flex  items-center">
        <h2 className="font-bold text-xl my-3 mr-4">Sort by</h2>
        <Radio.Group onChange={handleSortChange} value={sorted}>
          <Space direction="horizontal" className="justify-between">
            <Radio value="room.roomName" className="font-bold">
              By Room Name
            </Radio>
            <Radio value="tenant.name" className="font-bold">
              By Tenant Name
            </Radio>
            <Radio value="status" className="font-bold">
              By Status
            </Radio>
            <Radio value="-startDate" className="font-bold">
              By Start Date
            </Radio>
            <Radio value="-endDate" className="font-bold">
              By End Date
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default ContractFilters;
