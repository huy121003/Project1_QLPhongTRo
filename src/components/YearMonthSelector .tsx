import React from "react";

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
  const handlePreviousYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div className="flex items-center bg-gray-100 mt-2 mx-2 rounded-lg flex-1">
      <button
        onClick={handlePreviousYear}
        className="text-blue-500 font-bold mr-4 hover:bg-blue-200 w-[50px] h-[50px] rounded-full border border-blue-500"
      >
        <i className="fas fa-chevron-left font-bold text-2xl"></i>
      </button>
      <div className="flex space-x-4 flex-1 justify-between">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center px-2 py-2 rounded-lg cursor-pointer flex-1 ${
              selectedMonth === i + 1
                ? "bg-green-100 text-blue-500 border-2 border-blue-500"
                : "bg-white text-gray-700"
            } hover:bg-gray-200 transition duration-300`}
            onClick={() => setSelectedMonth(i + 1)}
          >
            <span className="font-semibold text-xl">M.{i + 1}</span>
            <span className="text-sm">{year}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleNextYear}
        className="text-blue-400 font-bold ml-4 hover:bg-blue-200 w-[50px] h-[50px] rounded-full border border-blue-500"
      >
        <i className="fas fa-chevron-right font-bold text-2xl"></i>
      </button>
    </div>
  );
};

export default YearMonthSelector;
