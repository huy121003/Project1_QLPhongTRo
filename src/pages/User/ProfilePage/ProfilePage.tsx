import { useEffect, useState } from "react";
import AccountModel from "../../../models/AccountModel";
import { useAppSelector } from "../../../redux/hook";
import { fecthAccountIdApi } from "../../../api/accountApi";
import { message } from "antd";

export default function ProfilePage() {
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
        <div className="text-[#2b6534] z-10">
            <h2 className="text-2xl font-semibold mb-4 text-center border-b pb-1">
                Profile Information
            </h2>
            <div className="space-y-4">
        
                <div className="flex flex-col">
                    <span className="text-lg py-3">
                        Full name: {accounts?.name}
                    </span>
                    <span className="text-lg py-3">Email: {accounts?.email}</span>
                    <span className="text-lg py-3">
                        Address: {accounts?.address}
                    </span>
                    <span className="text-lg py-3">
                        Id card: {accounts?.idCard}
                    </span>
                    <span className="text-lg py-3">Phone: {accounts?.phone}</span>
                    <span className="text-lg py-3">
                        Birthday:
                        {new Date(accounts?.birthday).toLocaleDateString(
                            "en-GB"
                        )}
                    </span>
                    <span className="text-lg py-3">
                        Gender: {accounts?.gender}
                    </span>
                    {/* <span className="text-lg py-3">
                        Password: {accounts?.password}
                    </span> */}
                </div>
            </div>
        </div>
    );
}
