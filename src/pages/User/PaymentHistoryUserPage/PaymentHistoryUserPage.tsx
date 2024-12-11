import { Avatar, Button, Descriptions, DescriptionsProps, Drawer, Flex, Pagination, PaginationProps, Segmented, Select, Table } from "antd";
import { ReactNode, useEffect, useState } from "react";
import dayjs from "dayjs";
import { IContract, IInvoice } from "interfaces";
import { useAppSelector } from "redux/hook";
import invoiceApi from "api/invoiceApi/invoiceApi";
import contractApi from "api/contractApi/contractApi";





export default function PaymentHistoryUserPage() {
  const [roomWithUserId, setRoomWithUserId] = useState<IContract[]>([]);
  const userId = useAppSelector((state) => state.auth.user._id);
  const [invoiceByUser, setInvoiceByUser] = useState<IInvoice[]>([]);
  const [defaultSelect, setDefaultSelect] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [query, setQuery] = useState<string>(`status=PAID&tenant._id=${userId}&currentPage=${current}&pageSize=${pageSize}`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [invoiceDetail, setInvoiceDetail] = useState<IInvoice>();
  const fetchInvoiceByUserIdStatusPaid = async () => {
    setIsLoading(true);
    const invoices = await invoiceApi.fetchInvoiceApi(query);
    if (invoices) {
      setInvoiceByUser(invoices.data.result);
      console.log(invoices);
      setTotal(invoices.data.meta.totalDocument);
    }
    setIsLoading(false);
  }
  const fetchRoomByUserId = async () => {
    if (userId) {
      const room = await contractApi.fetchContractApi(`tenant._id=${userId}&status=ACTIVE`);
      setRoomWithUserId(room.data.result);

    }
  }
  useEffect(() => {
    fetchRoomByUserId();
    fetchInvoiceByUserIdStatusPaid();

  }, [current, pageSize, query])

  const handleChange = (value: string) => {
    setDefaultSelect(value);
    const qs = query + `&room._id=${value}`;
    setQuery(qs);
    console.log(`selected ${value}`);
  };
  const options = roomWithUserId.map((room) => ({
    label: room.room.roomName,
    value: room.room._id,
  }))
  const handleOpenDetailInvoice = (invoice: IInvoice) => {
    setIsOpenDetail(true);
    setInvoiceDetail(invoice);
  }

  const dataSource = invoiceByUser.map((invoice) => ({
    key: invoice._id,
    id: <span onClick={() => handleOpenDetailInvoice(invoice)} className="text-blue-500 cursor-pointer">{invoice._id}</span>,
    service: invoice.service.name,
    updatedAt: dayjs(invoice.updatedAt).format("HH:MM:ss A | DD-MM-YYYY"),
    month: (invoice.month ? invoice.month : "..."),
    amount: <span className="text-green-600 font-semibold">{invoice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}</span>
  }))
  const handleReloadFilter = () => {
    setQuery("status=PAID");
    setDefaultSelect("");

  }
  const handleFindByTypeInvoice = (value: string) => {
    switch (value) {
      case "All":
        setCurrent(1);
        setQuery(`status=PAID&tenant._id=${userId}&currentPage=${current}&pageSize=${pageSize}`);
        break;
      case "Rent Room":
        setCurrent(1);
        setQuery(
          `status=PAID&tenant._id=${userId}&currentPage=${current}&pageSize=${pageSize}&service.name=/Rental/i`
        );
        break;
      case "Electricity & Water":
        setCurrent(1);
        setQuery(
          `status=PAID&tenant._id=${userId}&currentPage=${current}&pageSize=${pageSize}&service.unit=/m3/i|service.unit=/kwh/i`
        );
        break;
      case "Other":
        setCurrent(1);
        setQuery(
          `status=PAID&tenant._id=${userId}&currentPage=${current}&pageSize=${pageSize}&service.unit!=/m3/i&service.unit!=/kwh/i&&service.name!=/Rental/i`
        );
        break;
    }
  }
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setQuery(`status=PAID&tenant._id=${userId}&currentPage=${page}&pageSize=${pageSize}`);
    setCurrent(page);

    if (pageSize) setPageSize(pageSize);

  };

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ID',
      children: <span className="text-blue-500">{invoiceDetail?._id}</span>,
    },
    {
      key: '2',
      label: 'Room',
      children: invoiceDetail?.room.roomName,
    },
    {
      key: '3',
      label: 'Tenant',
      children: invoiceDetail?.tenant.name,
    },
    {
      key: '4',
      label: 'Service',
      children: invoiceDetail?.service.name,
    },
    {
      key: '7',
      label: 'Created At',
      children: dayjs(invoiceDetail?.createdAt).format('HH:MM A | DD-MM-YYYY'),
    },
    {
      key: '5',
      label: 'Paid At',
      children: dayjs(invoiceDetail?.updatedAt).format('HH:MM A | DD-MM-YYYY'),
      
    },
    {
      key: '7',
      label: 'Month',
      children: invoiceDetail?.month,
    },
    
    
    {
      key: '8',
      label: 'Amount',
      children: <span className="text-green-600 font-semibold ">{invoiceDetail?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}</span>,
    },
    {
      key: '9',
      label: 'Status',
      children: <span className="text-green-600 font-semibold ">{invoiceDetail?.status}</span>,
    },
    
  ];


  const columns = [

    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Service Name',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Payment Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

  ];
  const onClose = () => {
    setIsOpenDetail(false);
  };
  
  return (
    <div className="bg-[#e0f5e4] text-black  flex flex-col overflow-hidden mr-10">
      <Drawer size="large"title="Invoice Info" onClose={onClose} open={isOpenDetail}>
      <Descriptions layout="vertical"  bordered items={items} />
      </Drawer>
      <div className="m-3">
        <div className="flex gap-5">
          
       
        </div>
        <Segmented<string>
          options={['All', 'Rent Room', 'Electricity & Water', 'Other']}
          onChange={(value) => handleFindByTypeInvoice(value)}
          defaultValue={"All"}
        />

        <Table
          className="mt-10"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          className="my-3"
          align="end"
          showSizeChanger
          current={current}
          pageSize={pageSize}
          onChange={handlePaginationChange}
          pageSizeOptions={["1", "5", "10", "20", "50"]}
          total={total}
        />
      </div>

    </div>
  );
}
