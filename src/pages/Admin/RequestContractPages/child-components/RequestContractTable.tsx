import { useState } from "react";
import { Button, message, notification, Popconfirm } from "antd";
import dayjs from "dayjs";
import { IRequestContract } from "interfaces";
import requestContractApi from "api/requestContractApi/requestContractApi";
import { ContractStatus, RequestContractStatus } from "enums";
import contractApi from "api/contractApi/contractApi";
import requestContractStatusColor from "constants/requestContractStatusColor";
import ColumnSelector from "@components/ColumnSelector";
import TableComponent from "@components/TableComponent";

interface Props {
  requestContract: IRequestContract[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  getRequestContract: () => void;
  // setOpenDetailRequestContract: (value: boolean) => void;
  // setRecord: (value: IRequestContract) => void;
}

const RequestContractTable: React.FC<Props> = ({
  requestContract,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  getRequestContract,
}) => {
  const handldSuccess = async (requestContract: IRequestContract) => {
    const res = await requestContractApi.patchRequestContractApi(
      requestContract?._id,
      RequestContractStatus.SUCCESS
    );
    if (res.statusCode === 200) {
      if (requestContract?.type === true) {
        const response = await contractApi.patchExtendContractApi(
          requestContract?.contract._id
        );
        if (response.statusCode === 200) {
          const createContract = await contractApi.postContractApi(
            {
              _id: requestContract?.contract.room._id,
              roomName: requestContract?.contract.room.roomName,
              price: requestContract?.contract.room.price,
            },
            {
              _id: requestContract?.contract.tenant._id,
              name: requestContract?.contract.tenant.name,
              idCard: requestContract?.contract.tenant.idCard,
              phone: requestContract?.contract.tenant.phone,
              email: requestContract?.contract.tenant.email,
              address: requestContract?.contract.tenant.address,
            },
            requestContract?.contract.endDate,
            dayjs(requestContract?.contract.endDate)
              .add(requestContract?.amount, "month")
              .toDate(),
            requestContract?.contract.address,
            requestContract?.contract.depositAmount,
            requestContract?.contract.rentCycleCount,
            ContractStatus.ACTIVE
          );
          if (createContract.statusCode === 201) {
            getRequestContract();
            message.success("Extend contract successfully");
          } else {
            notification.error({
              message: "Error",
              description: "Extend contract failed",
            });
          }
        }
      } else {
        message.success("Successfully,contract is canceled next month");
      }
    } else {
      notification.error({
        message: "Error",
        description: "Accept request contract failed",
      });
    }
  };
  const handleReject = async (requestContract: IRequestContract) => {
    const res = await requestContractApi.patchRequestContractApi(
      requestContract?._id,
      RequestContractStatus.REJECTED
    );
    if (res.statusCode === 200) {
      message.success("Reject request contract successfully");
    } else {
      notification.error({
        message: "Error",
        description: "Reject request contract failed",
      });
    }
  };

  const columns = [
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (_: any, record: IRequestContract) => record?.user?.name,
    },
    {
      title: "Room",
      dataIndex: "contract",
      key: "contract",
      render: (_: any, record: IRequestContract) =>
        record?.contract?.room?.roomName,
    },
    {
      title: "Request",
      dataIndex: "type",
      key: "type",
      render: (_: any, record: IRequestContract) => (
        <p
          className={`font-bold 
          ${record?.type === true ? "text-green-600" : "text-red-600"}`}
        >
          {record?.type === true ? "EXTEND" : "CANCEL"}
        </p>
      ),
    },
    {
      title: "Amount (month)",
      dataIndex: "amount",
      key: "amount",
      render: (_: any, record: IRequestContract) => <p>{record?.amount} </p>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: IRequestContract) => (
        <p
          className={`font-bold ${requestContractStatusColor(
            record?.status
          )}`}
        >
          {record?.status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IRequestContract) => (
        <div className="flex gap-2">
          {record?.status === RequestContractStatus.PENDING && (
            <>
              <Popconfirm
                title="Are you sure to accept this request?"
                onConfirm={() => handldSuccess(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={
                    <i className="fa-solid fa-check text-green-600 text-xl" />
                  }
                ></Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure to reject this request?"
                onConfirm={() => handleReject(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={
                    <i className="fa-solid fa-xmark text-red-600 text-xl" />
                  }
                ></Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
      width: 150,
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
        data={requestContract}
        isLoading={isLoading}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};
export default RequestContractTable;
