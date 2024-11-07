// Excel Export Function
import * as XLSX from "xlsx";
import ContractModel from "../../../models/ContractModel";
import { Button } from "antd";
import { ServiceModel } from "../../../models/ServiceModel";
interface Props {
  contract: ContractModel[];
  numberIndex: {
    [key: string]: {
      firstIndex: number;
      finalIndex: number;
      invoiceId: string;
    };
  };
  selectedMonth: number;
  year: number;
  electric: ServiceModel;
}
const ExportToExcel: React.FC<Props> = ({
  contract,
  numberIndex,
  selectedMonth,
  year,
  electric,
}) => {
  const exportToExcel = () => {
    // Prepare data for Excel
    const data = contract.map((c) => ({
      Room: c.room.roomName,
      Tenant: c.tenant.name,
      "First Index": numberIndex[c._id]?.firstIndex || 0,
      "Final Index": numberIndex[c._id]?.finalIndex || 0,
      "Total Usage":
        (numberIndex[c._id]?.finalIndex || 0) -
        (numberIndex[c._id]?.firstIndex || 0),
      Price: Number(electric.price).toLocaleString(),
      Total: Number(
        Number(electric.price) *
          ((numberIndex[c._id]?.finalIndex || 0) -
            (numberIndex[c._id]?.firstIndex || 0))
      ).toLocaleString(),
    }));

    // Add title
    const title = [`Electric Usage Report - ${selectedMonth}/${year}`];
    const header = [
      [
        "Room",
        "Tenant",
        "First Index",
        "Final Index",
        "Total Usage",
        "Price",
        "Total",
      ],
    ];

    // Create worksheet and add title and headers
    const worksheet = XLSX.utils.aoa_to_sheet([
      title,
      ...header,
      ...data.map(Object.values),
    ]);

    // Set title and header style
    worksheet["A1"].s = {
      font: { bold: true, sz: 16 },
      alignment: { horizontal: "center" },
    };
    worksheet["A2"].s = {
      font: { bold: true, sz: 12 },
      alignment: { horizontal: "center" },
    };

    // Merge title cells
    //  worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];  //đây là dòng 0, cột 0 đến dòng 0, cột 4

    // Set column widths
    worksheet["!cols"] = [
      { wch: 15 }, // Room
      { wch: 20 }, // Tenant
      { wch: 15 }, // First Index
      { wch: 15 }, // Final Index
      { wch: 15 }, // Total Usage
      { wch: 20 }, // Price
      { wch: 20 }, // Total
    ];

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Electric Usage ${selectedMonth}-${year}`
    );

    // Export the file
    XLSX.writeFile(workbook, `ElectricUsage_${selectedMonth}-${year}.xlsx`);
  };
  return (
    <div className="bg-white  m-2  rounded-lg shadow-lg border border-gray-200  justify-end flex-1 items-center cursor flex">
      <Button
        onClick={exportToExcel}
        type="primary"
        className="m-4 py-6 px-2 bg-green-600"
      >
        <i className="fa-solid fa-file-export"></i> Export to Excel
      </Button>
    </div>
  );
};
export default ExportToExcel;
