import { useEffect, useState } from "react";

import { message, Pagination } from "antd";
import { IRegisterService, IService } from "../../../interfaces";
import { invoiceApi, registerServiceAPI, serviceApi } from "../../../api";

import RegisterService from "./RegisterService";
import { useAppSelector } from "../../../redux/hook";

export default function AvailableService({
    registeredServices,
    selectedRoomId,
}: {
    registeredServices: any;
    selectedRoomId: any;
}) {
    const [services, setServices] = useState<IService[]>([]);

    //Phân trang
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("Register Service");
    const [selectedService, setSelectedService] = useState<IService | null>(
        null
    );

    const [statusRegister, setStatusRegister] = useState<IRegisterService[]>(
        []
    );

    //khi đăng kí/hủy đăng kí dvu
    const [type, setType] = useState(false);
    const iduser = useAppSelector((state) => state.auth.user._id);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getRoom = async () => {
            const response = await serviceApi.fetchServiceApi(
                `pageSize=${pageSize}&currentPage=${current}`
            );

            if (response.data) {
                // Lọc bỏ dịch vụ đã đăng ký
                const availableServices = response.data.result.filter(
                    (service: IService) =>
                        !registeredServices.some(
                            (registered: IService) =>
                                registered._id === service._id
                        )
                );

                setServices(availableServices);
                availableServices.map(async (unregisterService: IService) => {
                    const registingService =
                        await registerServiceAPI.fetchRegisterServiceApi(
                            `user=${iduser}&service=${unregisterService._id}&room=${selectedRoomId}&type=true`
                        );

                    if (
                        registingService.data.result.length === 0 ||
                        registingService.data.result[0].status === "SUCCESS"
                    )
                        return;
                    if (
                        registingService.data.result.length > 0 ||
                        registingService.data.result[0].status !== "SUCCESS"
                    ) {
                        setStatusRegister(
                            (prevStatusRegister: IRegisterService[]) => [
                                ...prevStatusRegister, // Sao chép mảng cũ
                                registingService.data.result[0], // Thêm phần tử mới
                            ]
                        );
                    }
                });

                console.log(statusRegister);
                setTotal(availableServices.length);
            } else {
                message.error(response.message);
            }
        };
        getRoom();
    }, [pageSize, current, selectedRoomId, registeredServices]);

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrent(page);
        if (pageSize) setPageSize(pageSize);
    };

    // const isServiceRegistered = (serviceId: string) =>
    //     registeredServices.some(
    //         (service: IService) => service._id === serviceId
    //     );

    const handleClick = (service) => {
        setSelectedService(service);
        setType(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-0 mb-5 sm:mx-5 sm:overflow-x-hidden overflow-x-scroll flex-grow ">
            <h2 className="text-xl font-semibold mb-4">Unregistered Service</h2>
            <table className="w-full border text-center border-collapse">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r">Service Name</th>
                        <th className="py-2 px-4 border-r">Price</th>
                        <th className="py-2 px-4 border-r">Description</th>
                        <th className="py-2 px-4">Register</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => {
                        const registerService = statusRegister.find(
                            (registerService: IRegisterService) =>
                                registerService.service._id === service._id
                        );

                        return (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 border-r">
                                    {service.serviceName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                        " đ"}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.description}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {registerService &&
                                    registerService.room._id ===
                                        selectedRoomId ? (
                                        // Tìm thấy dịch vụ đã đăng ký, kiểm tra status
                                        registerService.status === "PENDING" ? (
                                            <button className=" text-lg bg-yellow-300 px-3 py-2 rounded-md text-[#2b6534] ">
                                                Pending...
                                            </button>
                                        ) : (
                                            <div className="text-orange-500 text-lg">
                                                Approved
                                            </div>
                                        )
                                    ) : (
                                        // Dịch vụ chưa được đăng ký
                                        <button
                                            className="px-4 py-2 rounded bg-green-500 text-lg transition-all duration-300 transform hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700"
                                            onClick={() => {
                                                showModal();
                                                handleClick(service);
                                            }}
                                        >
                                            Register
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-start pt-5 sm:justify-end ">
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePaginationChange}
                    showSizeChanger
                />
            </div>

            {isModalOpen && (
                <RegisterService
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    isModalOpen={isModalOpen}
                    title={title}
                    selectedService={selectedService}
                    selectedRoomId={selectedRoomId}
                    type={type}
                />
            )}
        </div>
    );
}
