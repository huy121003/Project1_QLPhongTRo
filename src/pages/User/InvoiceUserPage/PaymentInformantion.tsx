import React, { useEffect, useState, useMemo } from "react";
import { Button, Checkbox, ConfigProvider, message, Modal, Pagination, Space, Table } from "antd";
import ModalDetailInvoice from "./ModalDetailInvoice";
import { IInvoice } from "../../../interfaces";
import { invoiceApi, payOSApi } from "../../../api";
import { useAppSelector } from "../../../redux/hook";
import { SendOutlined } from "@ant-design/icons";
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

export default function PaymentInformantion() {

  const { styles } = useStyle();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const idUser = useAppSelector((state) => state.auth.user._id);
  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectRows, setSelectRows] = useState<{ _id: string, price: number }[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = () => {
    setOpen(true);
    if(selectRows.length===0){
      setModalText('Please make payments in advance!');
    }else{
      setModalText('Click on the confirm button to go to the payment page!');
    }
  };

  const handleOk = async () => {
    try {
      if(selectedIds.length>0){
        const response = await payOSApi.createLinkPayment(selectedIds);
        if (response.data && response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
      } 
      }
      handleCancel();
  } catch (error) {}
  };

  const handleCancel = () => {
    setModalText('');
    setOpen(false);
  };
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    if (pageSize) setPageSize(pageSize);
  };
  // Fetch hóa đơn khi component mount
  useEffect(() => {
    const getInvoices = async () => {
      setLoading(true);
      const response = await invoiceApi.fetchInvoiceApi(
        `tenant._id=${idUser}&status=UNPAID&currentPage=${current}&pageSize=${pageSize}`
      );
      setLoading(false);
      if (response.data) {
        setInvoices(response.data.result);
        setTotalPage(response.data.meta.totalDocument);
      } else {
        message.error(response.message || "Data format is incorrect");
      }
    };
    getInvoices();

  }, [pageSize, current]);

  useEffect(() => {
    let temp = selectRows.reduce((sum, row) => sum + row.price, 0);
    setTotal(temp);
    const ids = selectRows.map(row => row._id);
    setSelectedIds(ids);
  }, [selectRows])



  const openModal = (invoice: IInvoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const selectAllRows = (isChecker: boolean) => {
    if (isChecker) {
      setSelectRows(invoices.map((invoice) => ({ _id: invoice._id, price: invoice.amount })));
    } else {
      setSelectRows([]);
    }
    setIsCheckedAll(isChecker);
  }

  const selectRow = (invoice: IInvoice, isChecker: boolean) => {
    if (isChecker) {
      setSelectRows((prev) => [...prev, { _id: invoice._id, price: invoice.amount }]);
      if (selectRows.length + 1 === invoices.length) {
        setIsCheckedAll(true);
      }
    } else {
      setSelectRows((prev) => prev.filter((idPrev) => idPrev._id !== invoice._id));
    }

  }

  const columns = [

    {
      title: 'Id',
      dataIndex: '_id',
      key: 'id',
      render: (id: string, invoice: IInvoice) => <p className="text-blue-500 cursor-pointer" onClick={() => openModal(invoice)}>{id}</p>
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'roomName',
      render: (room: any) => <>{room.roomName}</>
    },
    {
      title: 'Invoice Name',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: any) => <>{amount.toLocaleString()} VND</>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: <Checkbox checked={isCheckedAll} onChange={(e) => selectAllRows(e.target.checked)} />,
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_: any, invoice: IInvoice) => (
        <Checkbox onChange={(e) => selectRow(invoice, e.target.checked)} checked={selectRows.some((invoices: any) => invoices._id === invoice._id)} />
      )
    },
  ];

  return (
    <div className="bg-white mb-5 mx-5 rounded-2xl p-6 shadow-lg text-black flex-grow overflow-y-hidden h-auto ">
      <Modal
        title="Confirm Payment"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <div className="flex justify-between my-5">
        <h3 className="text-xl font-semibold text-black mb-2">
          Payment Information
        </h3>
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Space>
            <Button onClick={() => showModal()}
             type="primary" size="large" icon={<SendOutlined />}>
              Make Payment
            </Button>
          </Space>
        </ConfigProvider>

      </div>

      <Table loading={loading} dataSource={invoices} columns={columns} pagination={false
      } />
      <div className="text-red-600 text-right mt-4 font-semibold">
        Amount:
        <span className="p-3 font-semibold border-t">
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
        </span>
      </div>
      <div className="mt-8 flex justify-end">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={totalPage}
          onChange={handlePaginationChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "50", "999"]}
        />
      </div>

      <ModalDetailInvoice
        visible={isModalVisible}
        onClose={closeModal}
        invoice={selectedInvoice}
      />
    </div>
  );
}
