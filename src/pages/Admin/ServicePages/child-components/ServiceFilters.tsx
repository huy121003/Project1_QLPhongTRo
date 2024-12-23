import SearchFilters from "@components/SearchFilter";
import SortOption from "@components/SortOption";
import { ServiceType, UnitService } from "enums";
import React from "react";

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
    <div className="flex-1 p-2 w-full flex justify-between gap-4">
      <SearchFilters
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        fields={[
          { label: "Service Name", field: "serviceName", type: "text" },
          {
            label: "Unit",
            field: "unit",
            type: "select",
            options: [
              { value: "", label: "All Unit" },
              ...Object.keys(UnitService).map((key) => ({
                value: key,
                label: key,
              })),
            ],
          },
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
