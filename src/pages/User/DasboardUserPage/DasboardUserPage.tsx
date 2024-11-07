import Breadcrumb from "../../../components/Breadcrumb";
import Carousel from "../../../components/Carousel";

export default function DashboardUserPage() {
    const roomDetails = {
        roomName: "Room 203",
        roomType: "Single Room",
        roomPrice: "1.500.000 VND",
        roomDescription:
            "Spacious room with full amenities, ideal for one person.",
    };

    const availableRooms = [
        {
            roomName: "Room 201",
            roomType: "Double Room",
            roomPrice: "2.000.000 VND",
            roomDescription:
                "Beautiful room with a balcony, airy and comfortable.",
        },
        {
            roomName: "Room 202",
            roomType: "Single Room",
            roomPrice: "1.800.000 VND",
            roomDescription: "Clean room, close to the kitchen area.",
        },
        {
            roomName: "Room 204",
            roomType: "Single Room",
            roomPrice: "1.700.000 VND",
            roomDescription:
                "Compact room, suitable for one person, well-ventilated.",
        },
        {
            roomName: "Room 205",
            roomType: "Double Room",
            roomPrice: "2.200.000 VND",
            roomDescription: "Spacious room with a view, suitable for couples.",
        },
        {
            roomName: "Room 301",
            roomType: "Suite",
            roomPrice: "3.500.000 VND",
            roomDescription:
                "Luxurious room with modern furnishings, suitable for long stays.",
        },
        {
            roomName: "Room 302",
            roomType: "Single Room",
            roomPrice: "1.600.000 VND",
            roomDescription:
                "Cozy room with natural light, ideal for single occupancy.",
        },
        {
            roomName: "Room 303",
            roomType: "Double Room",
            roomPrice: "2.100.000 VND",
            roomDescription: "Bright room with two beds, perfect for sharing.",
        },
    ];

    const slides = [
        "https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fu6Ry3js_93vrGbFC5dvkbQZiM5byF--qdo-yL2akI58%2Fpreset%3Aview%2Fplain%2Fb22affb455d074d6406c7d86e6a38524-2901743531583718170.jpg&w=1920&q=100",
        "https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2FwFsWH2kjsiwteIj6-s_8wsOEmBGNEyAloGJQHhgU-Bk%2Fpreset%3Aview%2Fplain%2F0a8061d3e65a294a67ddd0085fcad2a6-2901743503157775280.jpg&w=1920&q=100",
        "https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2FHeizTde7z6HVWhdSq5K7y4vg9gCdG_12h3RGnC0lwmk%2Fpreset%3Aview%2Fplain%2Fc9fded0db43cd6f476300708ac9b25c1-2901743536746417072.jpg&w=1920&q=100",
        "https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2FQwAfE28lLnAOK55A10JcBvYsj6RmLrvgG8O1UJ0Mt34%2Fpreset%3Aview%2Fplain%2Fcfc0b94fa4c66174fb9aeb8614ba3bf7-2901743584774047049.jpg&w=1920&q=100",
    ];

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col box-border ">
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
                            Dashboard
                        </a>
                    </li>
                </ol>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 m-5">
                <h2 className="text-3xl font-semibold mb-4">
                    Room Information
                </h2>
                <div className="grid grid-cols-2 gap-10">
                    <div className="text-lg ">
                        <p className=" py-2 ">
                            Room Name:{" "}
                            <span className="">
                                {roomDetails.roomName}
                            </span>
                        </p>
                        <p className=" py-2 ">
                            Room Type:{" "}
                            <span className="">
                                {roomDetails.roomType}
                            </span>
                        </p>
                        <p className=" py-2 ">
                            Room Price:{" "}
                            <span className="">
                                {roomDetails.roomPrice}
                            </span>
                        </p>
                        <p className=" py-2 ">
                            Room Description:{" "}
                            <span className="">
                                {roomDetails.roomDescription}
                            </span>
                        </p>
                    </div>
                    <div className="w-60 justify-self-center shadow-2xl overflow-hidden">
                        <Carousel autoSlide={true} autoSlideInterval={2000}>
                            {slides.map((s) => (
                                <img src={s} className="rounded" />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mx-5 mb-5 overflow-y-scroll">
                <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
                <table className="w-full border text-left border-collapse">
                    <thead>
                        <tr className="border">
                            <th className="py-2 px-4 border-r">Room Name</th>
                            <th className="py-2 px-4 border-r">Room Price</th>
                            <th className="py-2 px-4 border-r">Room Type</th>
                            <th className="py-2 px-4">Room Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableRooms.map((room, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 border-r">
                                    {room.roomName}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {room.roomPrice}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {room.roomType}
                                </td>
                                <td className="py-2 px-4">
                                    {room.roomDescription}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
