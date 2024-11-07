

export default function ServiceUserPage() {
    const currentServices = [
        {
            serviceName: "Wi-Fi",
            servicePrice: "100,000 VND",
            serviceDescription: "Provides high-speed internet connection.",
        },
        {
            serviceName: "Parking",
            servicePrice: "50,000 VND",
            serviceDescription: "Safe parking space with 24/7 supervision.",
        },
        {
            serviceName: "Cleaning Service",
            servicePrice: "150,000 VND",
            serviceDescription: "Weekly room cleaning service.",
        },
    ];

    const availableServices = [
        {
            serviceName: "Cable TV",
            servicePrice: "70,000 VND",
            serviceDescription:
                "Provides cable TV with many entertainment channels.",
        },
        {
            serviceName: "Drinking Water",
            servicePrice: "30,000 VND",
            serviceDescription:
                "Provides purified drinking water for the room.",
        },
        {
            serviceName: "Repair Service",
            servicePrice: "100,000 VND",
            serviceDescription:
                "Electricity and water repair service when needed.",
        },
    ];

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a
                            href="/tai-chinh"
                            className=" hover:underline font-semibold"
                        >
                            Service
                        </a>
                    </li>
                </ol>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 m-5">
                <h2 className="text-2xl font-semibold mb-4">
                    Current Services
                </h2>
                <table className="w-full border text-left border-collapse">
                    <thead>
                        <tr className="border">
                            <th className="py-2 px-4 border-r text-lg">Service Name</th>
                            <th className="py-2 px-4 border-r text-lg">Price</th>
                            <th className="py-2 px-4 text-lg">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentServices.map((service, index) => (
                            <tr key={index} className="border-b text-lg">
                                <td className="py-2 px-4 border-r">
                                    {service.serviceName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.servicePrice}
                                </td>
                                <td className="py-2 px-4">
                                    {service.serviceDescription}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 m-5">
                <h2 className="text-xl font-semibold mb-4">
                    Available Services
                </h2>
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
                        {availableServices.map((service, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 border-r">
                                    {service.serviceName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.servicePrice}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {service.serviceDescription}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        Register
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
