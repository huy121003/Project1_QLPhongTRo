import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface YearMonthSelectorProps {
  selectedMonth: number | null;
  year: number | null;
  setYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setCurrent?: (value: number) => void;
}

const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
  selectedMonth,
  year,
  setYear,
  setSelectedMonth,
  setCurrent,
}) => {
  const handleDateChange = (date: dayjs.Dayjs) => {
    if (date) {
      const formattedDate = date.format("MM-YYYY");
      const [month, year] = formattedDate.split("-");

      setSelectedMonth(parseInt(month));
      setYear(parseInt(year));
      if (setCurrent) {
        setCurrent(1);
      }
    }
    //  else {
    //   // Xử lý khi xóa giá trị
    //   setSelectedMonth();
    //   setYear(null);
    // }
  };

  return (
    <div className="py-4 m-2 rounded-lg">
      <DatePicker
        picker="month" // Chỉ cho phép chọn tháng và năm
        format="MM-YYYY"
        onChange={handleDateChange}
        value={
          selectedMonth && year && !isNaN(selectedMonth) && !isNaN(year)
            ? dayjs(
                `${String(selectedMonth).padStart(2, "0")}-${year}`,
                "MM-YYYY"
              )
            : null
        }
        allowClear // Cho phép xóa giá trị
      />
    </div>
  );
};

export default YearMonthSelector;
