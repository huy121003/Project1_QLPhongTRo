import { Menu, Dropdown, Button, Space } from "antd";
import { useMemo } from "react";
interface SortColumn {
  label: string;
  key: string;
}
interface CustomSortProps {
  columns: SortColumn[]; // Danh sách các cột để sắp xếp
  onSort: (key: string) => void; // Hàm xử lý sắp xếp
}
const CustomSort: React.FC<CustomSortProps> = ({ columns, onSort }) => {

//-> 
  // const menu = (
  //   <Menu className="text-xl">
  //     {columns.map((column) => (
  //       <Menu.Item key={column.key} onClick={() => onSort(column.key)} >
  //         <p className="text-xl" >Sort by {column.label}</p>
          
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  const renderMenuItems = () =>
    columns.map((column) => (
      <Menu.Item key={column.key} onClick={() => onSort(column.key)}>
        <span>Sort by {column.label}</span>
      </Menu.Item>
    ));

  const menu = useMemo(() => <Menu>{renderMenuItems()}</Menu>, [columns, onSort]);
//<-
  return (
    <Dropdown overlay={menu}>
      <Button className="mx-3 h-10">
        <Space>
          <i className="fa-solid fa-sort text-xl" />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CustomSort;



