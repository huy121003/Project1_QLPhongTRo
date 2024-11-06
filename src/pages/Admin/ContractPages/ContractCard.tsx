import React from "react";
import ContractModel, { ContractStatus } from "../../../models/ContractModel";
import { Button, Popconfirm, Pagination, Spin } from "antd";
import { getContractStatusColor } from "../../../utils/getMethodColor";
import NotItem from "../../../components/NotItem";

interface Props {
  contracts: ContractModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  setOpenDetailContract: (value: boolean) => void;
  setRecord: (value: ContractModel) => void;
  handleCancelContract: (id: string, roomId: string) => void;
}

const ContractCards: React.FC<Props> = ({
  contracts,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  setOpenDetailContract,
  setRecord,
  handleCancelContract,
}) => {
  return (
    <Spin spinning={isLoading}>
      {contracts.length > 0 ? (
        <div className="m-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {contracts.map((contract) => (
              <div
                key={contract._id}
                className="bg-white shadow-md rounded-lg p-5 border-t-4 transform transition-transform hover:scale-105"
              >
                {/* Contract Header */}
                <div className="border-b pb-3 mb-3">
                  <p className="text-2xl font-bold text-gray-500">
                    <i className="fa-solid fa-bed"></i> {contract.room.roomName}
                  </p>
                </div>

                {/* Contract Body */}
                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold">
                    <i className="fa-solid fa-user mr-2"></i>
                    {contract.tenant.name}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-envelope mr-2"></i>
                    {contract.tenant.email}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-phone mr-2"></i>
                    {contract.tenant.phone}
                  </p>

                  <p className="font-semibold">
                    <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
                    {contract.depositAmount.toLocaleString()} đ
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-calendar-days mr-2"></i>
                    {new Date(contract.startDate).toLocaleDateString()} {" -> "}
                    {new Date(contract.endDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Status Section */}
                <p className="font-bold mt-6">
                  <span className={getContractStatusColor(contract.status)}>
                    <i className="fa-solid fa-circle mr-2"></i>
                    {contract.status}
                  </span>
                </p>

                {/* Action Buttons */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    {contract.status === ContractStatus.ACTIVE && (
                      <Popconfirm
                        title="Cancel Contract"
                        description="Are you sure you want to cancel this contract?"
                        onConfirm={() =>
                          handleCancelContract(contract._id, contract.room._id)
                        }
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                      >
                        <Button
                          type="primary"
                          danger
                          icon={
                            <i className="fa-solid fa-house-circle-xmark text-xl"></i>
                          }
                          className="bg-red-900 text-white transition"
                        >
                          Cancel Contract
                        </Button>
                      </Popconfirm>
                    )}
                  </div>
                  <Button
                    type="primary"
                    className="bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={() => {
                      setOpenDetailContract(true);
                      setRecord(contract);
                    }}
                    icon={<i className="fa-solid fa-eye text-xl" />}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
          <div className="mt-8 flex justify-end">
            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              onChange={onChange}
              showSizeChanger
            />
          </div>
        </div>
      ) : (
        <NotItem />
      )}
    </Spin>
  );
};

export default ContractCards;
