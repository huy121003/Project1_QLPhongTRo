import React, { Children } from "react";
import { Badge, Descriptions, Drawer, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { Gender } from "../../../models/AccountModel";
import moment from "moment"; // Import moment for date formatting
import { resizeWidth } from "../../../utils/resize";
import { EquipmentStatus } from "../../../models/EquipmentModel";
interface Props{
    openDetailEquipment:boolean,
    setOpenDetailEquipment:(value: boolean) => void;
    record: any;
}
const DetailEquipment: React.FC<Props> = ({openDetailEquipment,setOpenDetailEquipment,record})=>{
    const formatDate = (dateString: string) => {
        return moment(dateString).format("DD/MM/YYYY"); // Format date using moment
      };
      const width = resizeWidth();
      const item=[
          {
                 key:"1",
                 label:"EquipmentName",
                 children:record?.name,
               
          },
          {
            key:"2",
            label:"Status",
            children:record?.status=== EquipmentStatus.New ? (
                <p className="text-orange-600 font-bold">{EquipmentStatus.New}</p>
              ) : record?.status === EquipmentStatus.Old ? (
                <p className="text-purple-600 font-bold">{EquipmentStatus.Old}</p>
              ) : record?.status === EquipmentStatus.Broken ? (
                <p className="text-blue-600 font-bold">{EquipmentStatus.Broken}</p>
              ) : (
                <p className="text-pink-600 font-bold">{EquipmentStatus.Repairing}</p>
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
            label: "Created At",
            children: record?.createdAt ? formatDate(record?.createdAt) : "N/A", // Format createdAt date
          },
          {
            key: "6",
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
            key: "7",
            label: "Updated At",
            children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A", // Format updatedAt date
          },
          {
            key: "8",
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
     <div>
      <Drawer
        onClose={() => setOpenDetailEquipment(false)}
        open={openDetailEquipment}
        width={"100vh"}
      >
        <Descriptions
          title="Equipment Detail"
          bordered
          items={item}
          column={width > 750 ? 2 : 1}
        />
      </Drawer>
      </div>
  );
}
  

export default DetailEquipment
