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
import { useEffect, useState, useMemo, useCallback } from "react";
import { notification, Select } from "antd";
import ExportRevenueToExcel from "./ExportRevenueToExcel";
import { IInvoice } from "../../../interfaces";
import { invoiceApi } from "../../../api";
import { useTheme } from "../../../contexts/ThemeContext";

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

// Hàm tính toán doanh thu theo tháng
const getMonthlyRevenue = (invoices: IInvoice[]) =>
  invoices.reduce((acc, { month, amount }) => {
    if (!month) return acc;
    acc[month] = (acc[month] || 0) + amount;
    return acc;
  }, {} as { [key: string]: number });

const MonthlyRevenueChart = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const { theme } = useTheme();

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchInvoices = async () => {

        const res = await invoiceApi.fetchInvoiceApi(
          "pageSize=99999&currentPage=1&status=PAID"
        );
        if (res.data) {
          setInvoices(res.data.result);
        } else {
          notification.error({
            message: "Error",
            description: res.message,
          });
        }
    
    };
    fetchInvoices();
  }, []);

  // Lọc hóa đơn theo năm được chọn
  const filteredInvoices = useMemo(
    () =>
      invoices.filter(
        (invoice) => invoice?.month?.split("-")[1] === selectedYear
      ),
    [invoices, selectedYear]
  );

  // Tính doanh thu theo tháng
  const monthlyData = useMemo(() => {
    const revenueByMonth = getMonthlyRevenue(filteredInvoices);
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
  }, [filteredInvoices]);

  // Dữ liệu biểu đồ
  const data = useMemo(
    () => ({
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
      ],
    }),
    [monthlyData]
  );

  // Cấu hình biểu đồ
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: theme === "dark" ? "#fff" : "#000",
          },
        },
        tooltip: {
          bodyColor: theme === "dark" ? "#fff" : "#000",
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          borderColor: theme === "dark" ? "#fff" : "#000",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Revenue (VND)",
            color: theme === "dark" ? "#fff" : "#000",
          },
          ticks: {
            color: theme === "dark" ? "#fff" : "#000",
          },
        },
        x: {
          title: {
            display: true,
            text: "Month",
            color: theme === "dark" ? "#fff" : "#000",
          },
          ticks: {
            color: theme === "dark" ? "#fff" : "#000",
          },
        },
      },
    }),
    [theme]
  );

  // Tạo danh sách các năm
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          invoices
            .map((invoice) => invoice?.month?.split("-")[1])
            .filter(Boolean)
        )
      ).sort(),
    [invoices]
  );

  const handleYearChange = useCallback((value: string) => {
    setSelectedYear(value);
  }, []);

  return (
    <div
      className={`p-6 rounded-lg shadow-md flex-1 mx-1 overflow-y-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-4">
        Monthly Revenue Chart
      </h2>
      <div className="mb-4 text-center flex justify-end items-center">
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
      <Chart
        type="bar"
        data={data}
        options={options}
        width="100vw"
        height={40}
      />
    </div>
  );
};

export default MonthlyRevenueChart;
