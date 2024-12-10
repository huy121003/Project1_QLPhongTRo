import { Avatar, Button, Flex, Segmented, Select, Table } from "antd";
import { ReactNode, useEffect, useState } from "react";
import dayjs from "dayjs";
import { IContract, IInvoice } from "interfaces";
import { useAppSelector } from "redux/hook";
import invoiceApi from "api/invoiceApi/invoiceApi";
import contractApi from "api/contractApi/contractApi";





export default function PaymentHistoryUserPage() {
  const [roomWithUserId, setRoomWithUserId] = useState<IContract[]>([]);
  const userId = useAppSelector((state) => state.auth.user._id);
  const [query, setQuery] = useState<string>("status=PAID");
  const [invoiceByUser, setInvoiceByUser] = useState<IInvoice[]>([]);
  const [defaultSelect, setDefaultSelect] = useState<string>("");


  const fetchInvoiceByUserIdStatusPaid = async() => {
    const invoices = await invoiceApi.fetchInvoiceApi(query);
    if(invoices){
      setInvoiceByUser(invoices.data.result);
      console.log(invoices);
    }
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

  }, [query])

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

  const dataSource = invoiceByUser.map((invoice, index)=>({
    no: index+1,
    key: invoice._id,
    id: <span className="text-blue-500">{invoice._id}</span>,
    service: invoice.service.name,
    updatedAt: dayjs(invoice.updatedAt).format("HH:MM:ss A | DD-MM-YYYY"),
    month: (invoice.month ? invoice.month : "..."),
    amount: <span className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{invoice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}</span>
  }))
  const handleReloadFilter = () => {
    setQuery("status=PAID");
    setDefaultSelect("");
    
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'name',
    },
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
  return (
    <div className="bg-[#e0f5e4] text-black  flex flex-col overflow-hidden mr-10">
      <div className="m-3">
        <div className="flex gap-5">
        <Select className=" mb-5"
          defaultValue={defaultSelect}
          style={{ width: 120 }}
          onChange={(value) => handleChange(value)}
        >
          <Select.Option key="All" value = "">All</Select.Option>
          {options.map((option)=>(
            <Select.Option key={option.label} value = {option.value}>{option.label}</Select.Option> 
          ))}
        </Select>
        <Button onClick={() => handleReloadFilter()} >Reload Filter</Button>
        </div>
        <Segmented<string>
          options={['All', 'Rent Room', 'Electricity & Water', 'Other']}
          onChange={(value) => {
            console.log(value); // string
          }}
          defaultValue={"All"}
        />
         
        <Table
          className="mt-10"
          dataSource={dataSource}
          columns={columns} />
      </div>

    </div>
  );
}
