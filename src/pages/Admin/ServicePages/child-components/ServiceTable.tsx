import { useState } from "react";
import { Button } from "antd";
import { IService } from "interfaces";
import serviceTypeColor from "constants/serviceTypeColor";
import { ServiceType } from "enums";
import DeleteModal from "@components/DeleteModal";
import ColumnSelector from "@components/ColumnSelector";
import TableComponent from "@components/TableComponent";


interface Props {
  services: IService[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteService: (record: IService) => Promise<void>;
  setOpenEditService: (value: boolean) => void;
  setOpenDetailService: (value: boolean) => void;
  setRecord: (record: IService) => void;
}
const ServiceTable: React.FC<Props> = ({
  services,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  onDeleteService,
  setOpenEditService,
  setOpenDetailService,
  setRecord,
}) => {

  const columns = [
    { title: "Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{price.toLocaleString()} đ</p>,
    },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: ServiceType) => (
        <p className={`${serviceTypeColor(type)} font-bold`}>{type}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IService) => (
        <div className="gap-2 flex">
          <Button
            onClick={() => {
              setOpenDetailService(true);
              setRecord(record);
            }}
            icon={
              <i
                className="fa-solid fa-eye text-xl
              text-blue-500
              "
              />
            }
          >
            
          </Button>
          <Button
            icon={
              <i className="fa-solid fa-pen-to-square text-green-600 text-xl" />
            }
            onClick={() => {
              setOpenEditService(true), setRecord(record);
            }}
          >
            
          </Button>

          {record.type !== ServiceType.Electricity &&
            record.type !== ServiceType.Water && (
              <DeleteModal
                onConfirm={(record) => onDeleteService(record)} // Pass the delete function
                record={record} // Pass the record to delete
              />
            )}
        </div>
      ),
      width: 150,
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.dataIndex)
  );
  return (
    <div className={` p-2 rounded-lg m-2 `}>
      <div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
      </div>
      <TableComponent
        data={services}
        columns={columns}
        visibleColumns={visibleColumns}
        isLoading={isLoading}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </div>
  );
};

export default ServiceTable;
