import { useEffect, useState } from "react";
import ContractModel from "../../../models/ContractModel";
import { fetchContractApi } from "../../../services/contractApi";
import { fetchInvoiceApi } from "../../../services/invoiceApi";

import YearMonthSelector from "../../../components/YearMonthSelector ";
import { fetchServiceApi } from "../../../services/serviceApi";
import { ServiceModel, ServiceType } from "../../../models/ServiceModel";
import ElectricTable from "./ElectricTable";
import ExportToExcel from "./ExportToExcel";

const ElectricPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [contract, setContract] = useState<ContractModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [numberIndex, setNumberIndex] = useState<{
    [key: string]: { firstIndex: number; finalIndex: number; invoiceId: "" };
  }>({});
  const [electric, setElectric] = useState({} as ServiceModel);
  const getElectricService = async () => {
    setLoading(true);
    const res = await fetchServiceApi(`type=${ServiceType.Electricity}`);
    if (res.data) {
      setElectric(res.data.result[0]);
    } else {
      // message.error(res.message);
    }
  };
  useEffect(() => {
    getElectricService();
  }, []);
  const getContract = async () => {
    setLoading(true);
    try {
      const res = await fetchContractApi(`currentPage=1&pageSize=99999`);
      if (res.data) {
        const newContract = res.data.result.filter(
          (contract: ContractModel) => {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const monthStart = new Date(year, selectedMonth - 1, 1);
            const monthEnd = new Date(year, selectedMonth, 0);
            return startDate <= monthEnd && endDate >= monthStart;
          }
        );
        setContract(newContract);

        const initialIndices = await Promise.all(
          newContract.map(async (contract: ContractModel) => {
            const billResponse = await fetchInvoiceApi(
              `tenant._id=${contract.tenant._id}&room._id=${contract.room._id}&month=${selectedMonth}-${year}&service._id=${electric._id}`
            );
            return {
              [contract._id]: billResponse.data?.result?.[0]
                ? {
                    firstIndex: billResponse.data.result[0].firstIndex,
                    finalIndex: billResponse.data.result[0].finalIndex,
                    invoiceId: billResponse.data.result[0]._id,
                  }
                : { firstIndex: 0, finalIndex: 0, invoiceId: "" },
            };
          })
        );
        //console.log("eded", initialIndices); 
        setNumberIndex(Object.assign({}, ...initialIndices));
      }
    } catch (error) {
      console.error("Failed to fetch contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContract();
  }, [selectedMonth, year, electric]);

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
    <div className="justify-end p-2 w-full">
      <YearMonthSelector
        selectedMonth={selectedMonth}
        year={year}
        setYear={setYear}
        setSelectedMonth={setSelectedMonth}
      />
      <ExportToExcel
        contract={contract}
        numberIndex={numberIndex}
        electric={electric}
        selectedMonth={selectedMonth}
        year={year}
      />
      <ElectricTable
        contract={contract}
        electric={electric}
        numberIndex={numberIndex}
        loading={loading}
        handleInputChange={handleInputChange}
        selectedMonth={selectedMonth}
        year={year}
      />
    </div>
  );
};

export default ElectricPage;
