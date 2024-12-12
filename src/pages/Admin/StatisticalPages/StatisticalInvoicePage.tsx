import React from "react";
import MonthlyRevenueChart from "./child-components/MonthlyRevenueChart";

function StatisticalInvoicePage() {
  return (
    <>
      {" "}
      <h1 className="text-2xl font-bold m-2">Statistical Invoice</h1>
      <div className="justify-end p-2 flex-1 overflow-y-hidden">
        <MonthlyRevenueChart />
      </div>
    </>
  );
}

export default StatisticalInvoicePage;
