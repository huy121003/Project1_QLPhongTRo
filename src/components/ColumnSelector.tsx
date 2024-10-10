import React from "react";
import { Menu, Dropdown, Button, Checkbox } from "antd";


// Prop types cho ColumnSelector
interface ColumnSelectorProps {
  columns: Array<{ title: string;dataIndex:string; key: string;render?:any }>;  // Cột được truyền vào
  visibleColumns: string[];                       // Cột đang hiển thị
  onChangeVisibleColumns: (columns: string[]) => void; // Hàm xử lý thay đổi cột
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  visibleColumns,
  onChangeVisibleColumns,
}) => {
  const columnMenu = (
    <Menu>
      {columns.map((column) => (
        <Menu.Item key={column.key}>
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
           <p className="text-xl"> {column.title}</p>
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={columnMenu}>
      <Button className="ml-2 justify-center items-center h-[40px]">
      <i className="fa-solid fa-filter text-2xl text-blue-500"></i>
      </Button>
    </Dropdown>
  );
};

export default ColumnSelector;
