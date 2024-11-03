import React from "react";
import { Radio, Space } from "antd";
import SearchFilters from "../../../components/SearchFilter";

import { ServiceType } from "../../../models/ServiceModel";

interface Props {
  searchParams: any;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
  sorted: string;
}
const ServiceFilters: React.FC<Props> = ({
  searchParams,
  handleSearchChange,
  handleSortChange,
  sorted,
}) => {
  return (
    <div className="justify-end p-2 w-full">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          { label: "Service Name", field: "serviceName", type: "text" },
          { label: "Price", field: "price", type: "text" },
          { label: "Unit", field: "unit", type: "text" },
          {
            label: "Type",
            field: "type",
            type: "select",
            options: [
              { value: "", label: "All Type" },
              {
                value: ServiceType.Electricity,
                label: ServiceType.Electricity,
              },
              { value: ServiceType.Water, label: ServiceType.Water },
              { value: ServiceType.Internet, label: ServiceType.Internet },
              { value: ServiceType.Other, label: ServiceType.Other },
            ],
          },
        ]}
      />
      <div className="bg-white p-2 rounded-lg m-2">
        <h2 className="font-bold text-xl my-3">Sort by</h2>
        <Radio.Group onChange={handleSortChange} value={sorted}>
          <Space direction="horizontal" className="justify-between">
            <Radio value="serviceName" className="font-bold">
              By Name
            </Radio>
            <Radio value="price" className="font-bold">
              By Price Increase
            </Radio>
            <Radio value="-price" className="font-bold">
              By Price Decrease
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default ServiceFilters;
