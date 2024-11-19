import { useEffect, useState } from "react";

import { message, Pagination } from "antd";
import { IService } from "../../../interfaces";
import { serviceApi } from "../../../api";

export default function AvailableService({ registeredServices }:
  {
    registeredServices:any
  }


) {
    const [services, setServices] = useState<IService[]>([]);

    //Phân trang
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getRoom = async () => {
            const response = await serviceApi.fetchServiceApi(
                `pageSize=${pageSize}&currentPage=${current}`
            );
            if (response.data) {
                setServices(response.data.result);
                setTotal(response.data.meta.totalDocument);
            } else {
                message.error(response.message);
            }
        };
        getRoom();
    }, [pageSize, current]);

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrent(page);
        if (pageSize) setPageSize(pageSize);
    };
    const isServiceRegistered = (serviceId:string) =>
        registeredServices.some((service:IService) => service._id === serviceId);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-0 mb-5 sm:mx-5 sm:overflow-x-hidden overflow-x-scroll ">
            <h2 className="text-xl font-semibold mb-4">Available Services</h2>
            <table className="w-full border text-left border-collapse">
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
                        const registered = isServiceRegistered(service._id);
                        return (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 border-r">
                                    {service.serviceName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.price.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                    " đ"}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.description}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        className={`px-4 py-2 rounded ${
                                            registered
                                                ? "bg-gray-400 w-[107px] text-white cursor-not-allowed"
                                                : "bg-green-500 w-[107px] text-white hover:bg-green-600"
                                        }`}
                                        disabled={registered}
                                    >
                                        {registered ? "Registered" : "Register"}
                                    </button>
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
        </div>
    );
}

