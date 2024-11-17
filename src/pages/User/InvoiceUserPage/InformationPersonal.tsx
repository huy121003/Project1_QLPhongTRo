import React, { useEffect, useState } from "react";
import AccountModel from "../../../models/AccountModel";
import { fecthAccountIdApi } from "../../../api/accountApi";
import { message } from "antd";
import { useAppSelector } from "../../../redux/hook";

export default function InformationPersonal() {
    const [accounts, setAccount] = useState<AccountModel>();
    const iduser = useAppSelector((state) => state.auth.user._id); // Sửa tên biến id nếu cần thiết

    useEffect(() => {
        const getAccount = async () => {
            const response = await fecthAccountIdApi(iduser);

            if (response.data) {
                setAccount(response.data);
            } else {
                message.error(response.message);
            }
        };
        getAccount();
    }, [iduser]);
    return (
        <div className="border-b pb-4 mb-4 overflow-x-scroll md:overflow-x-hidden">
            <h2 className="text-2xl font-semibold ">PERSONAL INFORMATION</h2>

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
                            {" "}
                            {new Date(accounts?.birthday).toLocaleDateString(
                                "en-GB"
                            )}
                        </span>
                    </p>
                    <p className=" py-2">
                        Email: <span className="">{accounts?.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
