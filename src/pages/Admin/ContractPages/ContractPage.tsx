import { message } from "antd";
import { useEffect, useState } from "react";
import { AddButton } from "../../../components"; // Change to CustomModal
import { fetchContractApi, patchContractApi } from "../../../api/contractApi";

import AddContractModal from "./AddContractModal";

import ContractModel from "../../../models/ContractModel";
import { ContractStatus } from "../../../models/ContractModel";
import DetailContract from "./DetailContract";

import { updateRoomStatusApi } from "../../../api/roomApis";
import { RoomStatus } from "../../../models/RoomModel";

import ContractFilters from "./ContractFilter";

import ContractTable from "./ContractTable";
import ExportToExcel from "./ExportToExcel";

function ContractPage() {
  const [contracts, setContracts] = useState<ContractModel[]>([]);

  const [openAddContract, setOpenAddContract] = useState(false);

  const [openDetailContract, setOpenDetailContract] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

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
        message.success("Cancel contract successfully");
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
        />
        <div className="bg-white p-2 rounded-lg mx-4 justify-between flex items-center">
          <div />

          <div className="flex items-center">
            <ExportToExcel contracts={contracts} />
            <AddButton
              onClick={() => setOpenAddContract(true)}
              label="Add Contract"
            />
          </div>
        </div>
        <ContractTable
          contracts={contracts}
          handleCancelContract={handleCancelContract}
          setOpenDetailContract={setOpenDetailContract}
          setRecord={setRecord}
          isLoading={isLoading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
        />
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
