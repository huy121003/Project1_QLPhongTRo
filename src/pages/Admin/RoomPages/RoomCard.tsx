import React from "react";
import { DeleteModal, NotItem } from "../../../components";
import {
  getRoomStatusColor,
  getRoomTypeColor,
} from "../../../utils/getMethodColor";
import { Button, Pagination, Spin } from "antd";
import { IRoom } from "../../../interfaces";

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

const RoomCard: React.FC<Props> = ({
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
  return (
    <Spin spinning={isLoading}>
      {rooms.length > 0 ? (
        <div className="m-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white shadow-lg rounded-lg p-6 border-t-4 transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="border-b pb-3 mb-3">
                  <p className="text-2xl font-bold text-gray-500">
                    <i className="fa-solid fa-bed"></i> {room.roomName}
                  </p>
                </div>

                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold">
                    <i className="fa-solid fa-cube mr-2"></i> {room.area} m²
                  </p>
                  <p
                    className={`font-semibold my-2 ${getRoomTypeColor(
                      room.type
                    )} `}
                  >
                    <i className="fa-solid fa-people-roof mr-2"></i>
                    {room.type}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
                    {room.price.toLocaleString()} đ
                  </p>
                  <p className="font-bold mt-6">
                    <span className={` ${getRoomStatusColor(room.status)}`}>
                      <i className="fa-solid fa-circle mr-2"></i>
                      {room.status}
                    </span>
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <div />
                  <div className="flex gap-3">
                    <Button
                      type="primary"
                      className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                      onClick={() => {
                        setOpenDetailRoom(true);
                        setRecord(room);
                      }}
                      icon={<i className="fa-solid fa-eye text-xl" />}
                    />
                    <Button
                      type="primary"
                      className="bg-green-500 text-white hover:bg-green-600 transition duration-300"
                      icon={<i className="fa-solid fa-pen-to-square text-xl" />}
                      onClick={() => {
                        setOpenEditRoom(true);
                        setRecord(room);
                      }}
                    />
                    <DeleteModal onConfirm={onDeleteRoom} record={room} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              onChange={onChange}
              showSizeChanger
              className="text-sm"
            />
          </div>
        </div>
      ) : (
        <NotItem />
      )}
    </Spin>
  );
};

export default RoomCard;
