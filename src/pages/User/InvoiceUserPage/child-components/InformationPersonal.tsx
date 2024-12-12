import React, { useEffect, useState } from "react";


import { Badge, Descriptions, DescriptionsProps, message } from "antd";
import dayjs from "dayjs";
import { IAccount } from "interfaces";
import { useAppSelector } from "redux/hook";
import accountApi from "api/accountApi/accountApi";
import roleApi from "api/roleApi/roleApi";

export default function InformationPersonal() {
    const [account, setAccount] = useState<IAccount>();
    const [role, setRole] = useState<string>("");
    const userId = useAppSelector((state) => state.auth.user._id); 

    useEffect(() => {
        const getAccount = async () => {
            const response = await accountApi.fetchAccountByIdApi(userId);
            if (response.data) {
                setAccount(response.data);
            } else {
                message.error(response.message);
            }
        };
        getAccount();
    }, [userId]);

    

    const items: DescriptionsProps['items'] = [
        {
          key: '1',
          label: 'UserName',
          children: account?.name,
        },
        {
          key: '2',
          label: 'Telephone',
          children: account?.phone,
        },
        {
          key: '3',
          label: 'Address',
          children: account?.address,
        },
        {
          key: '4',
          label: 'Gender',
          children: account?.gender,
        },
        {
          key: '5',
          label: 'Birthday',
          children: dayjs(account?.birthday).format('DD-MM-YYYY'),
        },
        {
            key: '6',
            label: 'Role',
            children: <Badge status="processing" text={account?.role.name} />, 
          },
      ];
    return (
        <div >
            <Descriptions title="User Info" layout="vertical" items={items} bordered />
            {/* <h2 className="text-2xl font-semibold ">PERSONAL INFORMATION</h2>
            <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
                <div>
                    <p className=" py-2">
                        Full Name: <span className="">{accounts?.name}</span>
                    </p>
                    <p className=" py-2">
                        Address: <span className="">{accounts?.address}</span>
                    </p>
                    <p className=" py-2">
                        Phone: <span className="">{accounts?.phone}</span>
                    </p>
                </div>
                <div>
                    <p className=" py-2">
                        ID Card: <span className="">{accounts?.idCard}</span>
                    </p>
                    <p className=" py-2">
                        Date of Birth:
                        <span className="">
                        {  dayjs(accounts?.birthday).format("DD/MM/YYYY")}
                        </span>
                    </p>
                    <p className=" py-2">
                        Email: <span className="">{accounts?.email}</span>
                    </p>
                </div>
            </div> */}
        </div>
    );

}
