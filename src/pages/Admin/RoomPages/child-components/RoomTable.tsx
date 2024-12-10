import { useState } from "react";
import { Button } from "antd";
import { IRoom } from "interfaces";
import roomStatusColor from "constants/roomStatusColor";
import { RoomStatus, RoomType } from "enums";
import roomTypeColor from "constants/roomTypeColor";
import DeleteModal from "@components/DeleteModal";
import TableComponent from "@components/TableComponent";
import ColumnSelector from "@components/ColumnSelector";

interface Props {
  rooms: IRoom[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteRoom: (record: IRoom) => Promise<void>;
  setOpenEditRoom: (open: boolean) => void;
  setOpenDetailRoom: (open: boolean) => void;
  setRecord: (record: IRoom) => void;
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
    { title: "Room", dataIndex: "roomName", key: "roomName" },
    { title: "Area(m2)", dataIndex: "area", key: "area" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: RoomType) => (
        <span className={`font-semibold my-2 text-${roomTypeColor(type)} `}>
          {type}
        </span>
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
      render: (status: RoomStatus) => (
        <span className={`px-2 py-1  font-bold ${roomStatusColor(status)}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IRoom) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              setOpenDetailRoom(true);
              setRecord(record);
            }}
            icon={
              <i
                className="fa-solid fa-eye text-xl
              text-blue-500
              "
              />
            }
          ></Button>
          {record.status === RoomStatus.Available && (
            <>
              <Button
                icon={
                  <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
                }
                onClick={() => {
                  setRecord(record);
                  setOpenEditRoom(true);
                }}
              ></Button>
              <DeleteModal
                onConfirm={() => onDeleteRoom(record)}
                record={record}
              />
            </>
          )}
        </div>
      ),
      width: 100,
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  return (
    <div className={` p-2 rounded-lg m-2 `}>
      <div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
      </div>
      <TableComponent
        columns={columns}
        data={rooms}
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
