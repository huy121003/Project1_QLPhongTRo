import { useEffect, useState } from "react";
import ElectricTable from "./ElectricTable";
import ExportToExcel from "./ExportToExcel";
import { IContract, IService } from "../../../interfaces";
import { ContractStatus, ServiceType } from "../../../enums";
import { contractApi, invoiceApi, serviceApi } from "../../../api";
import { YearMonthSelector } from "../../../components";
import { notification } from "antd";
import { useTheme } from "../../../contexts/ThemeContext";

const ElectricPage = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [loading, setLoading] = useState(false);
  interface NumberIndex {
    [key: string]: {
      firstIndex: number;
      finalIndex: number;
      invoiceId: string;
    };
  }

  const [numberIndex, setNumberIndex] = useState<NumberIndex>({});
  const [electric, setElectric] = useState<any>();

  // Hàm lấy dịch vụ điện
  const fetchElectricService = async () => {
    setLoading(true);

    const res = await serviceApi.fetchServiceApi(
      `type=${ServiceType.Electricity}`
    );
    if (res.data) {
      setElectric(res.data?.result?.[0] || null);
    } else {
      notification.error({
        message: "Error",
        description: "Failed to fetch electric service",
      });

      setLoading(false);
    }
  };

  // Hàm lấy hợp đồng theo tháng/năm
  const fetchContracts = async () => {
    setLoading(true);

    const res = await contractApi.fetchContractApi(
      `currentPage=1&pageSize=99999`
    );
    const filteredContracts = res.data.result.filter((contract: IContract) => {
      const { startDate, endDate, actualEndDate, status } = contract;
      const monthStart = new Date(year, selectedMonth - 1, 1);
      const monthEnd = new Date(year, selectedMonth, 0);

      if (status === ContractStatus.ACTIVE) {
        return (
          new Date(startDate) <= monthEnd && new Date(endDate) >= monthStart
        );
      }
      if (status === ContractStatus.CANCELED) {
        return (
          new Date(startDate) <= monthEnd &&
          new Date(actualEndDate) >= monthStart
        );
      }
      return (
        status === ContractStatus.EXPIRED &&
        new Date(startDate) <= monthEnd &&
        new Date(endDate) >= monthStart
      );
    });

    setContracts(filteredContracts);
    setLoading(false);
  };

  // Hàm lấy chỉ số điện theo hợp đồng
  const fetchElectricIndices = async (contracts: IContract[]) => {
    let adjustedMonth = selectedMonth - 1;
    let adjustedYear = year;
    if (selectedMonth === 0) {
      adjustedMonth = 12;
      adjustedYear = year - 1;
    }
    const promises = contracts.map(async (contract) => {
      const [billResponse, lastMonthResponse] = await Promise.all([
        invoiceApi.fetchInvoiceApi(
          `tenant._id=${contract.tenant._id}&room._id=${contract.room._id}&month=${selectedMonth}-${year}&service._id=${electric?._id}`
        ),
        invoiceApi.fetchInvoiceApi(
          `tenant._id=${contract.tenant._id}&room._id=${contract.room._id}&month=${adjustedMonth}-${adjustedYear}&service._id=${electric?._id}`
        ),
      ]);
      return {
        [contract._id]: {
          firstIndex: lastMonthResponse.data?.result?.[0]?.finalIndex || 0,
          finalIndex: billResponse.data?.result?.[0]?.finalIndex || null,
          invoiceId: billResponse.data?.result?.[0]?._id || "",
        },
      };
    });
    const indices = await Promise.all(promises);
    setNumberIndex(Object.assign({}, ...indices));
  };

  useEffect(() => {
    fetchElectricService();
  }, []);
  useEffect(() => {
    fetchContracts();
  }, [selectedMonth, year,electric]);
  useEffect(() => {
    fetchElectricIndices(contracts);
  }, [selectedMonth, year, contracts]);

  const handleInputChange = (
    id: string,
    field: "firstIndex" | "finalIndex",
    value: number
  ) => {
    setNumberIndex((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold m-2">Electricity</h1>
      <div className="justify-end w-full">
        <div
          className={`  m-2  rounded-lg shadow-lg   justify-between flex-1 items-center cursor flex
      ${bgColor} ${textColor}
        `}
        >
          <YearMonthSelector
            selectedMonth={selectedMonth}
            year={year}
            setYear={setYear}
            setSelectedMonth={setSelectedMonth}
          />
          <ExportToExcel
            contract={contracts}
            numberIndex={numberIndex}
            electric={electric}
            selectedMonth={selectedMonth}
            year={year}
          />
        </div>
        <ElectricTable
          contract={contracts}
          electric={electric}
          numberIndex={numberIndex}
          loading={loading}
          handleInputChange={handleInputChange}
          selectedMonth={selectedMonth}
          year={year}
        />
      </div>
    </>
  );
};

export default ElectricPage;
