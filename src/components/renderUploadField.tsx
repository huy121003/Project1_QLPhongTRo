import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { UploadListType } from "antd/es/upload/interface";
interface IRenderUploadField {
  label: string;
  name: string;
  message: string;
  listType: UploadListType;
  defaultFileList?: {
    uid: string;
    name: string;
    //status: "error" | "success" | "done" | "uploading" | "removed" | undefined;
    url: string;
  }[];
}
const RenderUploadField: React.FC<IRenderUploadField> = ({
  label,
  name,
  message,
  listType,
  defaultFileList,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={[{ required: true, message }]}
    className={`flex-1 justify-center items-center flex mt-5`}
  >
    <Upload
      listType={listType}
      accept="image/*"
      beforeUpload={() => false}
      maxCount={1}
      defaultFileList={defaultFileList}
      className={` ${listType === "picture-circle" ? "avatar-uploader" : ""}`}
    >
      <Button icon={<UploadOutlined />}>Upload {label}</Button>
    </Upload>
  </Form.Item>
);
export default RenderUploadField;
