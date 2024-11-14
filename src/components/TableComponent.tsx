// TableComponent.tsx
import React from "react";
import { Table } from "antd";
interface TableComponentProps {
  data: any[];
  columns: any[];
  visibleColumns: string[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (pagination: any) => void;
}
const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  visibleColumns,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
}) => {
  return (
    <Table
      rowKey={(record) => record._id}
      loading={isLoading}
      dataSource={data}
      columns={columns.filter((column) =>
        visibleColumns.includes(column.dataIndex)
      )}
      pagination={{
        current: current,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50, 100, 200, 999999],
      }}
      onChange={onChange}
    />
  );
};
export default TableComponent;
