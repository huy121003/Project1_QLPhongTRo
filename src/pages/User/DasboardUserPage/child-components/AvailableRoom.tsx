import { useEffect, useState } from "react";
import { message, Pagination, Table, TableProps } from "antd";
import { IRoom } from "interfaces";
import roomApi from "api/roomApi/roomApi";

export default function AvailableRoom() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    //Phân trang
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getRoom = async () => {
            setLoading(true);
            const response = await roomApi.fetchRoomApi(
                `pageSize=${pageSize}&currentPage=${current}&status=AVAILABLE`
            );

            if (response.data) {
                setRooms(response.data.result);
                setTotal(response.data.meta.totalDocument);
                setLoading(false);
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
    const dataSource = rooms.map((room, index) => (
        {
            key: index,
            name: room.roomName,
            area: <span>{room.area + "m2"}</span>,
            type: room.type,
            price:
                <span>
                    {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
                </span>,
        }
    ));

    const columns = [
        {
            title: 'Room Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Area',
            dataIndex: 'area',
            key: 'area',

        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Room Price',
            dataIndex: 'price',
            key: 'price',
        },

    ];
    
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mx-0 mb-5 sm:mx-5 overflow-x-scroll sm:overflow-x-hidden">
                <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    loading = {loading}
                />
                <div className="mt-3 flex flex-row-reverse" >
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePaginationChange}
                    showSizeChanger
                    pageSizeOptions={["1","5", "10", "20", "50"]}
                />
                </div>
                <div className="flex justify-start sm:justify-end pt-5 ">

                </div>
            </div>
        );
    }
