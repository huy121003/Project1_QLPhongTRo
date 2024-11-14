import AvailableRoom from "./AvailableRoom";
import RoomContract from "./RoomContract";

export default function DashboardUserPage() {
    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col  ">
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
            <RoomContract />

            <AvailableRoom />
        </div>
    );
}
