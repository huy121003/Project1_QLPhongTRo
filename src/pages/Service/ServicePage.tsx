import { Table, Menu, Dropdown, Space, Button, Input } from "antd";

import React, { useState } from "react";

import AddServiceModal from "./AddServiceModal";
import ServiceModel from "../../models/ServiceModel";
import EditServiceModal from "./EditServiceModal";
import { CustomSort, ColumnSelector,AddButton ,ActionButton,DeleteModal} from "../../components/index";

const { Search } = Input;

const serviceRows: ServiceModel[] = [
  {
    ServiceId: "1",
    ServiceName: "Service 1",
    ServicePrice: 100000,
    ServiceDescription: "Description 1",
  },
  {
    ServiceId: "2",
    ServiceName: "Service 2",
    ServicePrice: 200000,
    ServiceDescription: "Description 2",
  },
  {
    ServiceId: "3",
    ServiceName: "Service 3",
    ServicePrice: 10000,
    ServiceDescription: "Description 3",
  },
  {
    ServiceId: "4",
    ServiceName: "Service 4",
    ServicePrice: 400000,
    ServiceDescription: "Description 4",
  },
  {
    ServiceId: "5",
    ServiceName: "Service 5",
    ServicePrice: 500000,
    ServiceDescription: "Description 5",
  },
  // (Other service data...)
];

function ServicePage() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openUpdateService, setOpenUpdateService] = useState(false);

  // State to manage which service is being edited
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );

  const [filteredServices, setFilteredServices] = useState(serviceRows);
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([
    "ServiceId",
    "ServiceName",
    "ServicePrice",
    "ServiceDescription",
    "action",
  ]);
  const onDelete = () => {
    alert("Delete");
  };

  // Handle search for services
  const onSearch = (value: string) => {
    const filtered = serviceRows.filter((service) =>
      service.ServiceName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  // Handle sorting services
  const handleSort = (key: string) => {
    const sortedServices = [...filteredServices].sort((a, b) => {
      if (key === "name") {
        return a.ServiceName.localeCompare(b.ServiceName);
      }
      if (key === "priceincrease") {
        return a.ServicePrice - b.ServicePrice;
      }
      if (key === "pricedecrease") {
        return b.ServicePrice - a.ServicePrice;
      }
      return 0;
    });

    setFilteredServices(sortedServices);
  };

  // Handle selecting a service for editing
  const onEditService = (service: ServiceModel) => {
    setSelectedService(service);
    setOpenUpdateService(true);
  };

  return (
    <>
      <div className="md:flex justify-end bg-white p-2 w-full">
        <div className="flex">
          {/* Sort button */}
          <CustomSort
            columns={[
              { label: "Name", key: "name" },
              { label: "Price increase", key: "priceincrease" }, // Sửa key
              { label: "Price decrease", key: "pricedecrease" },
            ]}
            onSort={handleSort}
          />
          {/* Search input */}
          <Search
            placeholder="Search service"
            onSearch={onSearch}
            style={{ width: 200 }}
            size="large"
          />
        </div>
        <ColumnSelector
          columns={[
            { label: "ID", key: "ServiceId" },
            { label: "Name", key: "ServiceName" },
            { label: "Price", key: "ServicePrice" },
            { label: "Description", key: "ServiceDescription" },
            { label: "Action", key: "action" },
          ]}
          visibleColumns={visibleColumns}
          onChangeVisibleColumns={setVisibleColumns}
        />
        {/* Add Service button */}
        <AddButton
          onClick={() => setOpenAddService(true)}
          label="Add service"
        />
      
      </div>

      <div className="bg-white p-2 rounded-lg m-1">
        <Table
          columns={[
            { title: "ID", dataIndex: "ServiceId", key: "id" },
            { title: "Name", dataIndex: "ServiceName", key: "name" },
            { title: "Price", dataIndex: "ServicePrice", key: "price" },
            {
              title: "Description",
              dataIndex: "ServiceDescription",
              key: "description",
            },
            {
              title: "Action",
              dataIndex: "action",
              key: "x",
              render: (_: any, record: ServiceModel) => (
                <ActionButton
                item={record}
                onEdit={onEditService}
                onDelete={() => setOpenDelete(true)}
              />
              ),
            },
          ].filter((column) => visibleColumns.includes(column.dataIndex))}
          dataSource={filteredServices}
        />

        {/* Other Modals */}
        <DeleteModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          onConfirm={onDelete}
        />
        <AddServiceModal
          openAddService={openAddService}
          setOpenAddService={setOpenAddService}
        />
        <EditServiceModal
          openUpdateService={openUpdateService}
          setOpenUpdateService={setOpenUpdateService}
          selectedService={selectedService}
        />
      </div>
    </>
  );
}

export default ServicePage;
