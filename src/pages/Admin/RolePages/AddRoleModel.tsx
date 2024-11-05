import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  message,
  App,
  Col,
  Row,
  Collapse,
  Tag,
  Switch,
} from "antd";
import { postRoleApi } from "../../../services/roleApi";
import {
  fetchPermissionApi,
  fetchPermissionByIdApi,
} from "../../../services/permissionApi";
import { Method, PermissionModel } from "../../../models/PermissonModel";
import { getMethodColor } from "../../../utils/getMethodColor";

interface Props {
  openAddRole: boolean;
  setOpenAddRole: (value: boolean) => void;
}

const AddRoleModel: React.FC<Props> = ({ openAddRole, setOpenAddRole }) => {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState<PermissionModel[]>([]);
  const [enablePermission, setEnablePermission] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getPermissions = async () => {
      const response = await fetchPermissionApi("pageSize=1000&current=1");
      if (response.data) {
        setPermissions(response.data.result);
      } else {
        message.error(response.message);
      }
    };
    getPermissions();
  }, []);
  const handleOk = async () => {
    const values = await form.validateFields();
    setIsLoading(true);
    console.log(enablePermission)
    if (enablePermission.length === 0) {
      message.error("Please select at least one permission");
      setIsLoading(false);
        return;
    }
    const response = await postRoleApi(
      values.Name.toUpperCase(),
      values.Description,
     enablePermission
    );
    if (response.statusCode === 201) {
      message.success("Role created successfully");
      setOpenAddRole(false);
    } else {
      message.error(response.message);
    }
    setIsLoading(false);
  };
  const groupedPermissions = permissions.reduce(
    // Group permissions by module
    (groups: any, permission: PermissionModel) => {
      const { module } = permission; //
      if (!groups[module]) {
        groups[module] = [];
      }
      groups[module].push(permission);
      return groups;
    },
    {}
  );
  const handleSwitchChange = (permissionId: string, check: boolean) => {
    if (check) {
      setEnablePermission([...enablePermission, permissionId]);
    } else {
      setEnablePermission(enablePermission.filter((id) => id !== permissionId));
    }
  
  };
  // const handleSelectAll = (module: string, check: boolean) => {
  //   if (check) {
  //     const permissionIds = permissions
  //       .filter((permission) => permission.module === module)
  //       .map((permission) => permission._id);
  //     setEnablePermission([...enablePermission, ...permissionIds]);
  //   } else {
  //     const permissionIds = permissions
  //       .filter((permission) => permission.module === module)
  //       .map((permission) => permission._id);
  //     setEnablePermission(
  //       enablePermission.filter((id) => !permissionIds.includes(id))
  //     );
  //   }
  // }

  return (
    <Modal
      width={800}
      title="Add Role"
      open={openAddRole}
      onOk={handleOk}
      onCancel={() => {
        setEnablePermission([]);
        setOpenAddRole(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddRole(false);
            form.resetFields();
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleOk}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: "Please input the role name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="Description"
          rules={[
            { required: true, message: "Please input the role description!" },
          ]}
        >
          <Input />
        </Form.Item>
      
          <div className="my-2" />
          <Collapse>
            <Collapse.Panel header="Permissions" key="1">
              {Object.keys(groupedPermissions).map((module) => (
                <Collapse key={module} style={{ marginBottom: "16px" }}>
                  <Collapse.Panel header={module} key={module}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                        {/* <div className="flex items-center p-2 border border-gray-200 rounded-md bg-gray-100" >
                    <p>Select All</p>
                    <div className="flex-1"/>
                    <Switch
                      
                   
                   checked={enablePermission.length === permissions.filter((permission) => permission.module === module).length}
                       onChange={(checked: boolean) =>
                        handleSelectAll(module, checked)  
                       }
                      className="ml-auto"
                    />
                  </div> */}
                      {groupedPermissions[module].map(
                        (permission: PermissionModel) => (
                          <div
                            key={permission._id}
                            className="flex items-center p-2 border border-gray-200 rounded-md bg-gray-100"
                          >
                            <Tag
                              color={getMethodColor(permission.method)}
                              className="mr-[10px] w-[60px] text-center"
                            >
                              {permission.method}
                            </Tag>
                            <div className="">
                          <span className="font-bold">
                            Name: {permission.name}
                          </span>
                          <p className="flex-1">
                            Api Path: {permission.apiPath}
                          </p>
                        </div>
                            <Switch
                              checked={enablePermission.includes(
                                permission._id
                              )}
                              onChange={(checked: boolean) =>
                                handleSwitchChange(permission._id, checked)
                              }
                              className="ml-auto"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </Collapse.Panel>
                </Collapse>
              ))}
            </Collapse.Panel>
          </Collapse>
       
      </Form>
    </Modal>
  );
};

export default AddRoleModel;
