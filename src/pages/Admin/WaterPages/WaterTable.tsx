import React from "react";
import { Table, Input, Spin, message } from "antd";
import ContractModel from "../../../models/ContractModel";
import { patchInvoiceApi, postInvoiceApi } from "../../../api/invoiceApi";
import { ServiceModel } from "../../../models/ServiceModel";

interface Props {
  contract: ContractModel[];
  water: ServiceModel;
  numberIndex: {
    [key: string]: {
      firstIndex: number;
      finalIndex: number;
      invoiceId: string;
    };
  };
  loading: boolean;
  handleInputChange: (
    id: string,
    field: "firstIndex" | "finalIndex",
    value: number
  ) => void;
  selectedMonth: number;
  year: number;
}
const WaterTable: React.FC<Props> = ({
  contract,
  numberIndex,
  loading,
  handleInputChange,
  water,
  selectedMonth,
  year,
}) => {
  const handleOK = async (key: string) => {
    const indexData = numberIndex[key];
    try {
      if (indexData.invoiceId) {
        const res = await patchInvoiceApi(
          indexData.invoiceId,
          indexData.firstIndex,
          indexData.finalIndex
        );
        res.statusCode === 200
          ? message.success("Updated successfully")
          : message.error(res.message);
      } else {
        const contractInfo = contract.find((c) => c._id === key);
        if (!contractInfo) return;

        const res = await postInvoiceApi(
          {
            _id: contractInfo.room._id,
            roomName: contractInfo.room.roomName,
          },
          {
            _id: contractInfo.tenant._id,
            name: contractInfo.tenant.name,
            idCard: contractInfo.tenant.idCard,
            phone: contractInfo.tenant.phone,
          },
          {
            _id: water._id,
            name: water.serviceName,
            unit: water.unit,
            priceUnit: parseFloat(water.price),
          },
          `${selectedMonth}-${year}`,
          `Water bill for ${selectedMonth}-${year}`,
          indexData.firstIndex,
          indexData.finalIndex
        );
        res.statusCode === 201
          ? message.success("Created successfully")
          : message.error(res.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  const columns = [
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room: any) => room.roomName,
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (tenant: any) => tenant.name,
    },
    {
      title: "First index",
      dataIndex: "firstIndex",
      key: "firstIndex",
      render: (_: any, record: ContractModel) => (
        <Input
          type="number"
          value={numberIndex[record._id]?.firstIndex}
          onChange={(e) =>
            handleInputChange(
              record._id,
              "firstIndex",
              parseInt(e.target.value)
            )
          }
        />
      ),
    },
    {
      title: "Final Index",
      dataIndex: "finalIndex",
      key: "finalIndex",
      render: (_: any, record: ContractModel) => (
        <Input
          type="number"
          value={numberIndex[record._id]?.finalIndex}
          onChange={(e) =>
            handleInputChange(
              record._id,
              "finalIndex",
              parseInt(e.target.value)
            )
          }
        />
      ),
    },
    {
      title: "Total Index",
      dataIndex: "totalIndex",
      key: "totalIndex",
      render: (_: any, record: ContractModel) => (
        <Input
          type="number"
          disabled
          value={
            (numberIndex[record._id]?.finalIndex || 0) -
            (numberIndex[record._id]?.firstIndex || 0)
          }
        />
      ),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: () => <p>{parseFloat(water.price).toLocaleString()}đ</p>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_: any, record: ContractModel) => {
        return (
          <p>
            {(
              parseFloat(
                `${
                  (numberIndex[record._id]?.finalIndex || 0) -
                  (numberIndex[record._id]?.firstIndex || 0)
                }`
              ) * parseFloat(water.price)
            ).toLocaleString()}
            đ
          </p>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ContractModel) => (
        <div
          className=" text-blue-500  rounded-lg w-[40px] h-[40px] flex justify-center items-center cursor-pointer border-2  border-blue-500 hover:border-blue-300 hover:text-blue-300 "
          onClick={() => handleOK(record._id)}
        >
          <i className="fa-solid fa-floppy-disk text-2xl"></i>
        </div>
      ),
    },
  ];
  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={contract}
        rowKey={(record) => record._id}
      />
    </Spin>
  );
};

export default WaterTable;
