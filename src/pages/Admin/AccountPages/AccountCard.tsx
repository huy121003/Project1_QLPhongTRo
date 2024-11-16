import React from "react";
import { IAccount } from "../../../interfaces";
import { DeleteModal, NotItem } from "../../../components";
import { Button, Pagination, Spin } from "antd";
import { getGenderColor, getRoleColor } from "../../../utils/getMethodColor";
interface Props {
  accounts: IAccount[];
  isLoading: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  onDeleteAccount: (record: IAccount) => Promise<void>;
  setOpenEditAccount: (value: boolean) => void;
  setOpenDetailAccount: (value: boolean) => void;
  setRecord: (value: IAccount) => void;
}
const AccountCard: React.FC<Props> = ({
  accounts,
  isLoading,
  current,
  pageSize,
  total,
  onChange,
  onDeleteAccount,
  setOpenDetailAccount,
  setOpenEditAccount,
  setRecord,
}) => {
  return (
    <Spin spinning={isLoading}>
      {accounts.length > 0 ? (
        <div className="m-4">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {accounts.map((account) => (
              <div
                key={account._id}
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 hover:shadow-xl transform transition-all hover:scale-105 flex flex-col items-center"
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  {account.avatar ? (
                    <img
                      src={`${account?.avatar}`}
                      alt="avatar"
                      className="w-[120px] h-[120px] rounded-full border-2 border-gray-300"
                    />
                  ) : (
                    <i className="fa-solid fa-user text-[120px] text-gray-500"></i>
                  )}
                  <p className={`font-bold text-2xl my-3 text-center `}>
                    {account.name}
                  </p>
                </div>
                <div className="text-sm w-full space-y-1">
                  <p className="font-medium">
                    <i className="fa-solid fa-envelope mr-2 text-gray-600"></i>
                    {account.email}
                  </p>
                  <p className="font-medium">
                    <i className="fa-solid fa-phone mr-2 text-gray-600"></i>
                    {account.phone}
                  </p>
                  <p className="font-medium">
                    <i className="fa-solid fa-id-card mr-2 text-gray-600"></i>
                    {account.idCard}
                  </p>
                  <p
                    className={`font-medium ${getGenderColor(account.gender)}`}
                  >
                    <i className="fa-solid fa-transgender mr-2"></i>
                    {account.gender}
                  </p>
                  <p className="font-medium">
                    <i className="fa-solid fa-calendar-days mr-2 text-gray-600"></i>
                    {new Date(account.birthday).toLocaleDateString()}
                  </p>
                  <p
                    className={`font-medium ${getRoleColor(account.role.name)}`}
                  >
                    <i className="fa-solid fa-dice-four mr-2"></i>
                    {account.role.name}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between w-full">
                  <div></div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setOpenDetailAccount(true);
                        setRecord(account);
                      }}
                      icon={
                        <i
                          className="fa-solid fa-eye text-xl
                        text-blue-500
                        "
                        />
                      }
                    />
                    {account.email === "admin@gmail.com" ? null : (
                      <div className="flex gap-2">
                        <Button
                          icon={
                            <i
                              className="fa-solid fa-pen-to-square text-xl
                          text-green-600
                            "
                            />
                          }
                          onClick={() => {
                            setOpenEditAccount(true);
                            setRecord(account);
                          }}
                          className="  transition"
                        />
                        <DeleteModal
                          onConfirm={(record) => onDeleteAccount(record)}
                          record={account}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              onChange={onChange}
              showSizeChanger
            />
          </div>
        </div>
      ) : (
        <NotItem />
      )}
    </Spin>
  );
};

export default AccountCard;