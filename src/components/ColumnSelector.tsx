import React from "react";
import {  Dropdown, Button, Checkbox, MenuProps } from "antd";

// Prop types for ColumnSelector
interface ColumnSelectorProps {
  columns: Array<{ title: string; dataIndex: string; key: string; render?: any }>; // Columns to be passed in
  visibleColumns: string[]; // Currently visible columns
  onChangeVisibleColumns: (columns: string[]) => void; // Handler for column visibility change
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  visibleColumns,
  onChangeVisibleColumns,
}) => {
  // Prepare menu items for the dropdown
  const columnItems:MenuProps['items'] = columns.map((column) => ({
    key: column.key,
    label: (
      <Checkbox
        checked={visibleColumns.includes(column.key)}
        onChange={(e) => {
          const checked = e.target.checked;
          onChangeVisibleColumns(
            checked
              ? [...visibleColumns, column.key]
              : visibleColumns.filter((col) => col !== column.key)
          );
        }}
      >
        <p className="text-xl">{column.title}</p>
      </Checkbox>
    ),
  }));

  // Define the menu using the items array


  return (
    <Dropdown menu={{ items: columnItems }}>
      <Button className="ml-2 justify-center items-center h-[40px]">
        <i className="fa-solid fa-filter text-2xl text-blue-500"></i>
      </Button>
    </Dropdown>
  );
};

export default ColumnSelector;
