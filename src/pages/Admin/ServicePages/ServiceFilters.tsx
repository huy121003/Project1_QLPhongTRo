import React from "react";
import SearchFilters from "../../../components/SearchFilter";
import { ServiceType } from "../../../models/ServiceModel";
import SortOption from "../../../components/SortOption";
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
    <div className="justify-end mx-2  flex-1">
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
      <SortOption
        options={[
          { value: "serviceName", label: "By Service Name" },
          { value: "price", label: "By Price Increase" },
          { value: "-price", label: "By Price Decrease" },
          { value: "type", label: "By Type" },
        ]}
        sorted={sorted}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default ServiceFilters;
