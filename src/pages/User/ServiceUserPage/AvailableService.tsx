import { useEffect, useState } from "react";

import { message, notification } from "antd";
import { IService } from "../../../interfaces";
import { serviceApi } from "../../../api";
interface Props {
  registeredServices: IService[];
  roomId: string;
  refreshServices: () => void;
}
const AvailableService: React.FC<Props> = ({
  registeredServices,
  roomId,
  refreshServices,
}) => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const getRoom = async () => {
      const response = await serviceApi.fetchServiceApi(
        "pageSize=1000&currentPage=1"
      );
      if (response.data) {
        setServices(response.data.result);
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    };
    getRoom();
  }, []);

  const isServiceRegistered = (serviceId: string) =>
    registeredServices.some((service) => service._id === serviceId);

  // const registerService = async (serviceId) => {
  //     const res = await postServiceToRoomApi(roomId, serviceId); // API thêm dịch vụ vào phòng
  //     refreshServices();
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-5 mb-5 overflow-y-auto h-[382px]">
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
                <td className="py-2 px-4 border-r">{service.serviceName}</td>
                <td className="py-2 px-4 border-r">{service.price}</td>
                <td className="py-2 px-4 border-r">{service.description}</td>
                <td className="py-2 px-4 text-center">
                  {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Register
                                </button> */}
                  <button
                    // onClick={() =>
                    //     registerService(service._id)
                    // } // Gọi hàm đăng ký
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
    </div>
  );
};
export default AvailableService;
