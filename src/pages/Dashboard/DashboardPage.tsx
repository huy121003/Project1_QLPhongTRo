import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Table } from "antd";

import { useEffect, useState } from "react";
import { resizeWidth } from "../../utils/resize";

function DashboardPage() {
  const width = resizeWidth();

  const rows = [
    { id: 1, name: "101", floor: 1 },
    { id: 2, name: "102", floor: 1 },
    { id: 3, name: "103", floor: 1 },
    { id: 4, name: "104", floor: 1 },
    { id: 5, name: "105", floor: 1 },
    { id: 6, name: "106", floor: 1 },
    { id: 7, name: "107", floor: 1 },
    { id: 8, name: "108", floor: 1 },
    { id: 9, name: "109", floor: 1 },
    { id: 10, name: "110", floor: 1 },
    { id: 11, name: "201", floor: 2 },
    { id: 12, name: "202", floor: 2 },
    { id: 13, name: "203", floor: 2 },
    { id: 14, name: "204", floor: 2 },
    { id: 15, name: "205", floor: 2 },
    { id: 16, name: "206", floor: 2 },
    { id: 17, name: "207", floor: 2 },
    { id: 18, name: "208", floor: 2 },
    { id: 19, name: "209", floor: 2 },
    { id: 20, name: "210", floor: 2 },
    { id: 21, name: "301", floor: 3 },
    { id: 22, name: "302", floor: 3 },
    { id: 23, name: "303", floor: 3 },
    { id: 24, name: "304", floor: 3 },
    { id: 25, name: "305", floor: 3 },
    { id: 26, name: "306", floor: 3 },
    { id: 27, name: "307", floor: 3 },
    { id: 28, name: "308", floor: 3 },
    { id: 29, name: "309", floor: 3 },
    { id: 30, name: "310", floor: 3 },
    { id: 31, name: "401", floor: 4 },
    { id: 32, name: "402", floor: 4 },
    { id: 33, name: "403", floor: 4 },
    { id: 34, name: "404", floor: 4 },
    { id: 35, name: "405", floor: 4 },
    { id: 36, name: "406", floor: 4 },
    { id: 37, name: "407", floor: 4 },
    { id: 38, name: "408", floor: 4 },
    { id: 39, name: "409", floor: 4 },
    { id: 40, name: "410", floor: 4 },
    { id: 41, name: "501", floor: 5 },
    { id: 42, name: "502", floor: 5 },
    { id: 43, name: "503", floor: 5 },
    { id: 44, name: "504", floor: 5 },
    { id: 45, name: "505", floor: 5 },
    { id: 46, name: "506", floor: 5 },
    { id: 47, name: "507", floor: 5 },
    { id: 48, name: "508", floor: 5 },
    { id: 49, name: "509", floor: 5 },
    { id: 50, name: "510", floor: 5 },
    { id: 51, name: "601", floor: 6 },
    { id: 52, name: "602", floor: 6 },
    { id: 53, name: "603", floor: 6 },
    { id: 54, name: "604", floor: 6 },
    { id: 55, name: "605", floor: 6 },
    { id: 56, name: "606", floor: 6 },
    { id: 57, name: "607", floor: 6 },
    { id: 58, name: "608", floor: 6 },
    { id: 59, name: "609", floor: 6 },
    { id: 60, name: "610", floor: 6 },
    { id: 61, name: "701", floor: 7 },
    { id: 62, name: "702", floor: 7 },
    { id: 63, name: "703", floor: 7 },
    { id: 64, name: "704", floor: 7 },
    { id: 65, name: "705", floor: 7 },
    { id: 66, name: "706", floor: 7 },
    { id: 67, name: "707", floor: 7 },
    { id: 68, name: "708", floor: 7 },
    { id: 69, name: "709", floor: 7 },
    { id: 70, name: "710", floor: 7 },
    { id: 71, name: "801", floor: 8 },
  ];

  return (
    <>
      <div className={`flex-1 ${width > 1024 ? "flex" : ""}`}>
        <div className={`bg-white p-2 rounded-lg m-1 flex-1 flex-col flex `}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">Room status</Typography>
            </Box>
            <Box flexGrow={1}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 30, label: "Vacant", color: "red" },
                      { id: 1, value: 15, label: "Rented", color: "blue" },
                    ],
                  },
                ]}
                width={width <= 680 ? 280 : width >= 1024 ? 750 : 400}
                height={width <= 680 ? 160 : width >= 1024 ? 550 : 250}
              />
            </Box>
          </Stack>
        </div>
        <div className="bg-white p-2 rounded-lg m-1 flex-1   ">
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">List of available rooms</Typography>
            </Box>
            <Box flexGrow={1}>
              <Table
                className="flex-1 "
                columns={[
                  {
                    title: "ID",
                    dataIndex: "id",
                    key: "id",
                  },
                  {
                    title: "Room",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Floor",
                    dataIndex: "floor",
                    key: "floor",
                  },
                ]}
                dataSource={rows}
              />
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
