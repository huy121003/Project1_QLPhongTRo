import { useEffect, useState } from "react";
import WaterTable from "./WaterTable";
import ExportToExcel from "./ExportToExcel";
import { IContract, IService } from "../../../interfaces";
import { ContractStatus, ServiceType } from "../../../enums";
import { contractApi, invoiceApi, serviceApi } from "../../../api";
import { YearMonthSelector } from "../../../components";
import { notification } from "antd";
import { useTheme } from "../../../contexts/ThemeContext";
const WaterPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonth
  );
  const [year, setYear] = useState(currentYear);
  const [contract, setContract] = useState<IContract[]>([]);
  const [loading, setLoading] = useState(true);
    interface NumberIndex {
      [key: string]: {
        firstIndex: number;
        finalIndex: number;
        invoiceId: string;
      };
    }
  const [numberIndex, setNumberIndex] = useState<NumberIndex>({});
  const [water, setWater] = useState<any>();
  const getWaterService = async () => {
    setLoading(true);
   
    const res = await serviceApi.fetchServiceApi(`type=${ServiceType.Water}`);
    if (res.data) {
      setWater(res.data.result[0]);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };
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

    setContract(filteredContracts);
    setLoading(false);
  };

  // Hàm lấy chỉ số điện theo hợp đồng
  const fetchElectricIndices = async (contracts: IContract[]) => {
    let adjustedMonth = selectedMonth-1;
    let adjustedYear = year;
    if (adjustedMonth === 0) {
      adjustedMonth = 12;
      adjustedYear = year-1;
    }
    const promises = contracts.map(async (contract) => {
      const [billResponse, lastMonthResponse] = await Promise.all([
        invoiceApi.fetchInvoiceApi(
          `tenant._id=${contract.tenant._id}&room._id=${contract.room._id}&month=${selectedMonth}-${year}&service._id=${water?._id}`
        ),
        invoiceApi.fetchInvoiceApi(
          `tenant._id=${contract.tenant._id}&room._id=${contract.room._id}&month=${adjustedMonth}-${adjustedYear}&service._id=${water?._id}`
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
    getWaterService();
  }, []);
  useEffect(() => {
    fetchContracts();
  }
  , [selectedMonth, year,water]);

  useEffect(() => {
   fetchElectricIndices(contract)
    
  }, [selectedMonth, year, contract]);
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
      
      <h1 className="text-2xl font-bold m-2">Water</h1>
      <div className="justify-end  w-full">
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
            contract={contract}
            numberIndex={numberIndex}
            water={water}
            selectedMonth={selectedMonth }
            year={year }
          />
        </div>
        <WaterTable
          contract={contract}
          numberIndex={numberIndex}
          loading={loading}
          handleInputChange={handleInputChange}
          water={water}
          selectedMonth={selectedMonth }
          year={year }
        />
      </div>
    </>
  );
};

export default WaterPage;
