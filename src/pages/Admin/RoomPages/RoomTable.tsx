import React, { useState } from "react";
import { ColumnSelector, DeleteModal } from "../../../components";
import TableComponent from "../../../components/TableComponent";
import { Button } from "antd";
import RoomModel from "../../../models/RoomModel";
import {
  getRoomStatusColor,
  getRoomTypeColor,
} from "../../../utils/getMethodColor";
interface Props {
  rooms: RoomModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteRoom: (record: RoomModel) => Promise<void>;
  setOpenEditRoom: (open: boolean) => void;
  setOpenDetailRoom: (open: boolean) => void;
  setRecord: (record: RoomModel) => void;
}
const RoomTable: React.FC<Props> = ({
  rooms,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  onDeleteRoom,
  setOpenEditRoom,
  setOpenDetailRoom,
  setRecord,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: RoomModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailRoom(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    { title: "Room Name", dataIndex: "roomName", key: "roomName" },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (area: number) => <p>{area} m2</p>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <p className={`${getRoomTypeColor(type) as string} font-bold`}>
          {type}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{price.toLocaleString()} đ</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <p className={`${getRoomStatusColor(status) as string} font-bold`}>
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: RoomModel) => (
        <div className="gap-2 flex">
          <Button
            icon={
              <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
            }
            onClick={() => {
              setOpenEditRoom(true), setRecord(record);
            }}
          />

          <DeleteModal
            onConfirm={onDeleteRoom} // Pass the delete function
            record={record} // Pass the record to delete
          />
        </div>
      ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  return (
    <div className="bg-white p-2 rounded-lg m-2">
      <div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
      </div>
      <TableComponent
        data={rooms}
        columns={columns}
        visibleColumns={visibleColumns}
        isLoading={isLoading}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </div>
  );
};

export default RoomTable;
