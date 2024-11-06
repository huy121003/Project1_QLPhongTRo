import React from "react";
import {  DeleteModal } from "../../../components";
import { Button, Pagination, Popconfirm, Spin } from "antd";
import InvoiceModel, { InvoiceStatus } from "../../../models/InvoiceModal";
import { getInvoiceStatusColor } from "../../../utils/getMethodColor";
import NotItem from "../../../components/NotItem";

interface Props {
  invoices: InvoiceModel[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onPaymentConfirm: (record: InvoiceModel) => Promise<void>;
  setOpenDetailInvoice: (value: boolean) => void;
  setRecord: (value: InvoiceModel) => void;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteInvoice: (record: InvoiceModel) => Promise<void>;
}

const InvoiceCard: React.FC<Props> = ({
  invoices,
  isLoading,
  current,
  pageSize,
  total,
  onPaymentConfirm,
  setOpenDetailInvoice,
  setRecord,
  onChange,
  onDeleteInvoice,
}) => {


  return (
    <Spin spinning={isLoading}>
      {invoices.length > 0 ? (
        <div className="m-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {invoices.map((invoice) => (
              <div
                key={invoice._id}
                className={`bg-white shadow-md rounded-lg p-5 border-t-4  transform transition-transform hover:scale-105`}
              >
                {/* Contract Header */}
                <div className="border-b pb-3 mb-3">
                  <p className="text-2xl text-gray-500 font-bold">
                    <i className="fa-solid fa-bed mr-2"></i>
                    {invoice.room.roomName}
                  </p>
                </div>

                {/* Contract Body */}
                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold">
                    <i className="fa-solid fa-user mr-2"></i>
                    {invoice.tenant.name}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-cubes mr-2"></i>
                    {invoice.service.name}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
                    {invoice.amount.toLocaleString()} đ
                  </p>

                  <p className="font-semibold">
                    <i className="fa-solid fa-calendar-days mr-2"></i>
                    {invoice.month}
                  </p>
                  <p className="font-bold mt-6">
                    <span
                      className={`${getInvoiceStatusColor(invoice.status)} `}
                    >
                      <i className="fa-solid fa-circle mr-2"></i>
                      {invoice.status}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    {invoice.status === InvoiceStatus.UNPAID && (
                      <Popconfirm
                        title="Payment Confirmation"
                        description="Are you sure you want to confirm the payment?"
                        onConfirm={async () => await onPaymentConfirm(invoice)}
                        okText="Yes"
                        cancelText="No"
                        placement="leftBottom"
                      >
                        <Button
                          type="primary"
                          icon={
                            <i className="fa-solid fa-check text-white"></i>
                          }
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Confirm Payment
                        </Button>
                      </Popconfirm>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="primary"
                      className="bg-blue-500 text-white hover:bg-blue-600 transition"
                      onClick={() => {
                        setOpenDetailInvoice(true);
                        setRecord(invoice);
                      }}
                      icon={<i className="fa-solid fa-eye text-xl" />}
                    ></Button>
                    <DeleteModal onConfirm={onDeleteInvoice} record={invoice}  />
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
            />
          </div>
        </div>
      ) : (
        <NotItem />
      )}
    </Spin>
  );
};

export default InvoiceCard;
