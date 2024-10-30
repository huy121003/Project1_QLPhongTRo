import { Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { AddButton, ColumnSelector } from "../../../components"; // Change to CustomModal
import {
  fetchContractApi,
  patchContractApi,
} from "../../../services/contractApi";

import AddContractModal from "./AddContractModal";

import ContractModel from "../../../models/ContractModel";
import { ContractStatus } from "../../../models/ContractModel";
import DetailContract from "./DetailContract";

import { updateRoomStatusApi } from "../../../services/roomApis";
import { RoomStatus } from "../../../models/RoomModel";
import TableComponent from "../../../components/TableComponent";
import ContractFilters from "./ContractFilter";
import { getContractStatusColor } from "../../../utils/getMethodColor";

function ContractPage() {
  const [contracts, setContracts] = useState<ContractModel[]>([]);

  const [openAddContract, setOpenAddContract] = useState(false);

  const [openDetailContract, setOpenDetailContract] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: ContractModel) => (
        <p
          className="text-blue-600 hover:text-blue-300"
          onClick={() => {
            setOpenDetailContract(true);
            setRecord(record);
          }}
        >
          {_id}
        </p>
      ),
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room: any) => <p>{room.roomName}</p>,
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
      render: (tenant: any) => <p>{tenant.name}</p>,
    },

    {
      title: "Innkeeper",
      dataIndex: "innkeeper",
      key: "innkeeper",
      render: (innkeeper: any) => <p>{innkeeper.name}</p>,
    },

    {
      title: "Deposit Amount",
      dataIndex: "depositAmount",
      key: "depositAmount",
      render: (depositAmount: number) => (
        <span>{depositAmount.toLocaleString()} đ</span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <p className={`${getContractStatusColor(status)} font-bold`}>
          {status}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ContractModel) => (
        <div>
          {record.status !== ContractStatus.CANCELED &&
            record.status !== ContractStatus.EXPIRED && (
              <Popconfirm
                title="Cancel a contract"
                description="Are you sure you will cancel this contract?"
                // onCancel={() => message.error("Click on No")}
                onConfirm={() =>
                  handleCancelContract(record._id, record.room._id)
                }
                okText="YES"
                cancelText="No"
                placement="leftBottom"
              >
                <i className="fa-solid fa-house-circle-xmark text-red-600 text-2xl"></i>
              </Popconfirm>
            )}
        </div>
      ),
    },
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  const [sorted, setSorted] = useState<string>("");
  const [searchParams, setSearchParams] = useState({
    "room.roomName": "",
    "tenant.name": "",
    status: "",
    phone: "",
  });
  const handleCancelContract = async (id: string, roomId: string) => {
    const res = await patchContractApi(id, ContractStatus.CANCELED);
    if (res.data) {
      const response = await updateRoomStatusApi(roomId, RoomStatus.Available);

      if (response.data) {
        message.success(res.message);
        getContracts();
      } else message.error(res.message);
    } else {
      message.error(res.message);
    }
  };
  const getContracts = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      sort: sorted,
    };
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `/${value}/i`;
      }
    });
    const query = new URLSearchParams(queryParams).toString();
    setIsLoading(true);
    const res = await fetchContractApi(query);
    if (res.data) {
      setContracts(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else message.error(res.message);
    setIsLoading(false);
  };
  useEffect(() => {
    getContracts();
  }, [current, pageSize, sorted, searchParams, openAddContract]);
  const onChange = (pagination: any) => {
    if (pagination.current !== current && pagination) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
    setCurrent(1);
  };

  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
    setCurrent(1);
  };
  return (
    <>
      <div className="justify-end p-2 w-full">
        <ContractFilters
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          sorted={sorted}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          visibleColumns={visibleColumns}
        />
        <div className="bg-white p-2 rounded-lg m-2 justify-between flex">
          <div>
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChangeVisibleColumns={setVisibleColumns}
            />
          </div>
          <AddButton
            onClick={() => setOpenAddContract(true)}
            label="Add Contract"
          />
        </div>
        <div className="bg-white p-2 rounded-lg m-2">
          <TableComponent
            data={contracts}
            columns={columns}
            visibleColumns={visibleColumns}
            isLoading={isLoading}
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
          />
        </div>
      </div>

      <DetailContract
        openDetailContract={openDetailContract}
        setOpenDetailContract={setOpenDetailContract}
        record={record}
      />
      <AddContractModal
        openAddContract={openAddContract}
        setOpenAddContract={setOpenAddContract}
      />
    </>
  );
}

export default ContractPage;
