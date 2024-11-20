// import React from "react";
// import { useTheme } from "../contexts/ThemeContext";
// interface YearMonthSelectorProps {
//   selectedMonth: number;
//   year: number;
//   setYear: (year: number) => void;
//   setSelectedMonth: (month: number) => void;
// }
// const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
//   selectedMonth,
//   year,
//   setYear,
//   setSelectedMonth,
// }) => {
//   const { theme } = useTheme();
//   const handlePreviousYear = () => setYear(year - 1);
//   const handleNextYear = () => setYear(year + 1);
//   return (
//     <div
//       className={`flex items-center  p-4 rounded-lg flex-1
//     ${
//       theme === "light"
//         ? "bg-white text-black"
//         : "bg-gray-800 text-white hover:bg-gray-700"
//     }
//     `}
//     >
//       <button
//         onClick={handlePreviousYear}
//         className="text-blue-500 font-bold mr-4 hover:bg-blue-400 w-[50px] h-[50px] rounded-full border border-blue-500"
//       >
//         <i className="fas fa-chevron-left font-bold text-2xl"></i>
//       </button>
//       <div className="flex space-x-4 flex-1 justify-between">
//         {Array.from({ length: 12 }, (_, i) => (
//           <div
//             key={i}
//             className={`flex flex-col items-center flex-1 py-2 rounded-lg cursor-pointer ${
//               selectedMonth === i + 1
//                 ? "  text-blue-500 border-2 border-blue-500"
//                 : " "
//             } hover:bg-gray-400 transition duration-300`}
//             onClick={() => setSelectedMonth(i + 1)}
//           >
//             <span className="font-semibold text-xl">M.{i + 1}</span>
//             <span className="text-sm">{year}</span>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleNextYear}
//         className="text-blue-400 font-bold ml-4 hover:bg-blue-200 w-[50px] h-[50px] rounded-full border border-blue-500"
//       >
//         <i className="fas fa-chevron-right font-bold text-2xl"></i>
//       </button>
//     </div>
//   );
// };
// export default YearMonthSelector;
import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface YearMonthSelectorProps {
  selectedMonth: number;
  year: number;
  setYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
}

const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
  selectedMonth,
  year,
  setYear,
  setSelectedMonth,
}) => {
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      // Format MM-YYYY
      const formattedDate = date.format("MM-YYYY");
      const [month, year] = formattedDate.split("-");
      setSelectedMonth(parseInt(month));
      setYear(parseInt(year));
    }
  };

  return (
    <div className="  py-4 m-2 rounded-lg   ">
      <DatePicker
        picker="month" // Chỉ cho phép chọn tháng và năm
        format="MM-YYYY"
        onChange={handleDateChange}
        // locale={locale}
        defaultValue={dayjs(`${selectedMonth}-${year}`, "MM-YYYY")}
      />
    </div>
  );
};

export default YearMonthSelector;
