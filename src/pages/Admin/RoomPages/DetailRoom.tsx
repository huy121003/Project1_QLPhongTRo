import React, { Children } from "react";
import { Badge, Descriptions, Drawer, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment"; // Import moment for date formatting
import { resizeWidth } from "../../../utils/resize";
import { RoomStatus,RoomType } from "../../../models/RoomModel";
interface Props{
    openDetailRoom:boolean,
    setOpenDetailRoom:(value: boolean) => void;
    record: any;
}
const DetailRoom: React.FC<Props> = ({openDetailRoom,setOpenDetailRoom,record})=>{
    const formatDate = (dateString: string) => {
        return moment(dateString).format("DD/MM/YYYY"); // Format date using moment
      };
      const width = resizeWidth();
      const item=[
          {
                 key:"1",
                 label:"Room Name",
                 children:record?.roomName,
               
          },
          {
            key:"2",
            label:"Type",
            children:record?.type=== RoomType.Single ? (
                <p className="text-orange-600 font-bold">{RoomType.Single}</p>
              ) : record?.type === RoomType.Double ? (
                <p className="text-purple-600 font-bold">{RoomType.Double}</p>
              ) : record?.type === RoomType.Quad ? (
                <p className="text-blue-600 font-bold">{RoomType.Quad}</p>
              ) : (
                <p className="text-pink-600 font-bold">{RoomType.Studio}</p>
              ),
          },
          {
            key:"3",
            label:"Price",
            children:<>{record?.price.toLocaleString("vi-VN")} đ</>
          },
          {
            key:"4",
            label:"Description",
            children:record?.description
          },
          {
            key: "5",
            label: "Status",
            children:record?.status=== RoomStatus.Available ? (
                <p className="text-yellow-600 font-bold">{RoomStatus.Available}</p>
              ) : (
                <p className="text-green-600 font-bold">{RoomStatus.Occupied}</p>
              ) 
          },
          {
            key: "6",
            label: "Created At",
            children: record?.createdAt ? formatDate(record?.createdAt) : "N/A", // Format createdAt date
          },
          {
            key: "7",
            label: "Created By",
            children: record?.createdBy ? (
              record?.createdBy?.email
            ) : (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Updating
              </Tag>
            ),
          },
          {
            key: "8",
            label: "Updated At",
            children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A", // Format updatedAt date
          },
          {
            key: "9",
            label: "Updated By",
            children: record?.updatedBy ? (
              record?.updatedBy?.email
            ) : (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Updating
              </Tag>
            ),
          },
      ]
    return (
        <Drawer
        
     
        onClose={() => setOpenDetailRoom(false)}
        open={openDetailRoom}
        
        width={"100vh"}
        >
            <Descriptions 
            title="Room Detail"
             bordered
             items={item}
             column={width<750?1:2}
             >
                
            </Descriptions>
        </Drawer>
    )
}
export default DetailRoom
