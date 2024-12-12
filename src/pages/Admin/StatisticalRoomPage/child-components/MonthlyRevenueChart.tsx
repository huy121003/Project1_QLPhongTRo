import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import { useEffect, useState } from "react";
import { DatePicker, notification, Select } from "antd";
import dayjs from "dayjs";
import { IInvoice } from "interfaces";
import { useTheme } from "contexts/ThemeContext";
import invoiceApi from "api/invoiceApi/invoiceApi";


function getRevenueByRoom(
  invoices: IInvoice[]
): { roomName: string; totalAmount: number }[] {
  const revenueByRoom: { [roomName: string]: number } = {};
  invoices.forEach((invoice) => {
    const roomName = invoice.room.roomName;
    revenueByRoom[roomName] = (revenueByRoom[roomName] || 0) + invoice.amount;
  });

  return Object.keys(revenueByRoom)
    .map((roomName) => ({
      roomName,
      totalAmount: revenueByRoom[roomName],
    }))
    .sort((a, b) => a.roomName.localeCompare(b.roomName));
}

function MonthlyRevenueChart() {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [selectedTime, setSelectedTime] = useState<string>(
    isMonthly
      ? new Date().getMonth() + 1 + "-" + new Date().getFullYear() // Không có số 0
      : new Date().getFullYear().toString()
  );
  const { theme } = useTheme();

  useEffect(() => {
    const fetchInvoices = async () => {
      const monthQuery = `/${selectedTime}/`;
      // ? selectedTime
      // : `/${selectedTime.split("-")[0]}/i`; // 10/2024 -> /10/i nhưng mà nếu của năm khác thì sao?
      const res = await invoiceApi.fetchInvoiceApi(
        `pageSize=99999&currentPage=1&status=PAID&month=${monthQuery}`
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
  }, [selectedTime, isMonthly]);

  const monthlyData = getRevenueByRoom(invoices);

  const handleYearChange = (value: string) => {
    setSelectedTime(value);
  };

  const data = {
    labels: monthlyData.map((data) => data.roomName),
    datasets: [
      {
        label: "Revenue",
        data: monthlyData.map((data) => data.totalAmount),
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const options = {
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
          text: "Room",
          color: theme === "dark" ? "#fff" : "#000",
        },
        ticks: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md flex-1 mx-1 overflow-y-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-4">Monthly Room Chart</h2>

      <div className="mb-4 text-center flex flex-1 justify-end items-center">
        <div className="flex justify-end items-center">
          <Select
            className="mr-4"
            defaultValue="month"
            onChange={(value) => {
              setIsMonthly(value === "month");
              setSelectedTime(
                value === "month"
                  ? new Date().getMonth() + 1 + "-" + new Date().getFullYear()
                  : new Date().getFullYear().toString()
              );
            }}
          >
            <Select.Option value="month">Monthly</Select.Option>
            <Select.Option value="year">Yearly</Select.Option>
          </Select>
          <DatePicker
            picker={isMonthly ? "month" : "year"}
            value={dayjs(selectedTime, isMonthly ? "M-YYYY" : "YYYY")}
            onChange={(date) =>
              handleYearChange(
                isMonthly
                  ? date?.format("M-YYYY") || "" // Định dạng "M-YYYY"
                  : date?.format("YYYY") || "" // Định dạng "YYYY"
              )
            }
          />
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
}

export default MonthlyRevenueChart;
