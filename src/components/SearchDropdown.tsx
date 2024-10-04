import React, { useState } from "react";
import { Dropdown, Input, Radio, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

// Interface cho các props truyền vào component
interface SearchDropdownProps {
  criteriaOptions: { label: string; value: string }[]; // Danh sách các tiêu chí tìm kiếm
  onSearch: (value: string, criteria: string) => void; // Hàm tìm kiếm
  placeholder?: string; // Placeholder cho ô input
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  criteriaOptions,
  onSearch,
  placeholder = "Input search...",
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // Giá trị nhập vào input
  const [searchCriteria, setSearchCriteria] = useState(
    criteriaOptions[0].value
  ); // Tiêu chí tìm kiếm mặc định

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Cập nhật giá trị từ ô input
  };

  const handleCriteriaChange = (e: any) => {
    setSearchCriteria(e.target.value); // Cập nhật tiêu chí tìm kiếm (radio)
  };

  const handleSearch = () => {
    onSearch(searchValue, searchCriteria); // Gọi hàm tìm kiếm từ props
    setDropdownVisible(false); // Đóng dropdown sau khi tìm kiếm
  };

  const menu = (
    <Menu >
      <div style={{ padding: 16 }}>
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          style={{ marginBottom: 16, fontSize: 20,}}
        />
        <Radio.Group
          onChange={handleCriteriaChange}
          value={searchCriteria}
          className="flex flex-col"
        >
          {criteriaOptions.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              className="text-xl my-3"
            >
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" onClick={handleSearch}>
           Search
          </Button>
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown
    className="h-[40px] text-xl"
      overlay={menu}
     // trigger={["click"]}
      visible={dropdownVisible}
      onVisibleChange={(visible) => setDropdownVisible(visible)}
    >
      <Button>
        Tìm kiếm <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SearchDropdown;
