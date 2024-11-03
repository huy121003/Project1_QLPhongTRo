import React from "react";
import { Radio, Space } from "antd";
import SearchFilters from "../../../components/SearchFilter";
import { RoomStatus, RoomType } from "../../../models/RoomModel";

interface Props {
  searchParams: any;
  handleSearchChange: (field: string, value: string) => void;
  handleSortChange: (e: any) => void;
  sorted: string;
  setVisibleColumns: (value: any) => void;
  columns: any;
  visibleColumns: any;
}
const RoomFilters: React.FC<Props> = ({
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
            { label: "Room Name", field: "roomName", type: "text" },
            {
              label: "Type",
              field: "type",
              type: "select",
              options: [
                { value: "", label: "All Type" },
                { value: RoomType.Single, label: RoomType.Single },
                { value: RoomType.Double, label: RoomType.Double },
                { value: RoomType.Quad, label: RoomType.Quad },
                { value: RoomType.Studio, label: RoomType.Studio },
              ],
            },
            { label: "Price", field: "price", type: "text" },
            {
              label: "Status",
              field: "status",
              type: "select",
              options: [
                { value: "", label: "All Status" },
                { value: RoomStatus.Available, label: RoomStatus.Available },
                { value: RoomStatus.Occupied, label: RoomStatus.Occupied },
              ],
            },
          ]}
        />
        <div className="bg-white p-2 rounded-lg m-2">
          <h2 className="font-bold text-xl my-3">Sort by</h2>
          <Radio.Group onChange={handleSortChange} value={sorted}>
            <Space direction="horizontal" className="justify-between">
              <Radio value="roomName" className="font-bold">
                By Room Name
              </Radio>
              <Radio value="type" className="font-bold">
                By Type
              </Radio>
              <Radio value="price" className="font-bold">
                By Price Increase
              </Radio>
              <Radio value="-price" className="font-bold">
                By Price Decrease
              </Radio>
              <Radio value="status" className="font-bold">
                By Status
              </Radio>
            </Space>
          </Radio.Group>
        </div>
    </div>
  );
};

export default RoomFilters;
