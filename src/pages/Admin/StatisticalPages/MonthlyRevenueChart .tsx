import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import InvoiceModel from "../../../models/InvoiceModal";
import { useEffect, useState } from "react";
import { fetchInvoiceApi } from "../../../api/invoiceApi";
import { message, Select } from "antd";
import ExportRevenueToExcel from "./ExportRevenueToExcel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function getMonthlyRevenue(
  invoices: InvoiceModel[]
): { month: string; totalAmount: number }[] {
  const revenueByMonth: { [key: string]: number } = {};

  invoices.forEach((invoice) => {
    const month = invoice.month;
    revenueByMonth[month] = (revenueByMonth[month] || 0) + invoice.amount;
  });

  return Object.keys(revenueByMonth)
    .map((month) => ({
      month,
      totalAmount: revenueByMonth[month],
    }))
    .sort(
      (a, b) =>
        new Date(`01-${a.month}`).getTime() -
        new Date(`01-${b.month}`).getTime()
    );
}

const MonthlyRevenueChart = () => {
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetchInvoiceApi(
        "pageSize=99999&currentPage=1&status=PAID"
      );
      if (res.data) {
        setInvoices(res.data.result);
      } else {
        message.error(res.message);
      }
    };
    fetchInvoices();
  }, []);

  // Lọc dữ liệu hóa đơn theo năm đã chọn
  const filteredInvoices = invoices.filter(
    (invoice) => invoice.month.split("-")[1] === selectedYear
  );

  const monthlyData = getMonthlyRevenue(filteredInvoices);

  const data = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        type: "bar" as const,
        label: "Revenue",
        data: monthlyData.map((item) => item.totalAmount),
        backgroundColor: "rgba(11, 221, 29, 0.5)",
        borderColor: "#055c29",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: "Revenue",
        data: monthlyData.map((item) => item.totalAmount),
        borderColor: "#055c29",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (VND)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  // Lấy danh sách các năm duy nhất từ dữ liệu hóa đơn
  const years = Array.from(
    new Set(invoices.map((invoice) => invoice.month.split("-")[1]))
  ).sort();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex-1 mx-1 overflow-y-hidden">
      <h2 className="text-xl font-bold text-center mb-4">
        Monthly Revenue Chart
      </h2>

      <div className="mb-4 text-center flex flex-1 justify-end items-center">
        <div className="flex justify-end items-center">
          <Select
            size="large"
            value={selectedYear}
            onChange={handleYearChange}
            style={{ width: 120 }}
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
          <ExportRevenueToExcel monthlyData={monthlyData} />
        </div>
      </div>
      <Chart
        type="bar"
        data={data}
        options={options}
        width={"100vw"}
        height={40}
      />
    </div>
  );
};

export default MonthlyRevenueChart;
