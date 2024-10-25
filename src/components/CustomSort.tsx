import { Menu, Dropdown, Button, Space } from "antd";
interface SortColumn {
  label: string;
  key: string;
}
interface CustomSortProps {
  columns: SortColumn[]; // Danh sách các cột để sắp xếp
  onSort: (key: string) => void; // Hàm xử lý sắp xếp
}
const CustomSort: React.FC<CustomSortProps> = ({ columns, onSort }) => {
  const menu = (
    <Menu className="text-xl">
      {columns.map((column) => (
        <Menu.Item key={column.key} onClick={() => onSort(column.key)} >
          <p className="text-xl" >Sort by {column.label}</p>
          
        </Menu.Item>
      ))}
    </Menu>
  );


  return (
    <Dropdown overlay={menu}
    className="text-xl">
      <Button className=" mx-3 h-[40px]" >
        <Space className=" font-normal">
        <i className="fa-solid fa-sort text-xl"/>
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CustomSort;



