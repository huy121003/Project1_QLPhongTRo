import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
          <p className="text-xl" >{column.label}</p>
          
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}
    className="text-xl">
      <Button className=" mx-3 h-[40px]" >
        <Space className=" font-normal">
          Sort by <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CustomSort;
