import React, { useEffect, useState } from "react";
import {
  Descriptions,
  Drawer,
  message,
  Switch,
  Tag,
  Collapse,
  notification,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment";

import { getMethodColor, getRoleColor } from "../../../utils/getMethodColor";
import { IPermisson } from "../../../interfaces";
import { permissionApi } from "../../../api";
import { useTheme } from "../../../contexts/ThemeContext";

interface Props {
  openDetailRole: boolean;
  setOpenDetailRole: (value: boolean) => void;
  record: any;
}

const DetailRole: React.FC<Props> = ({
  openDetailRole,
  setOpenDetailRole,
  record,
}) => {
  const { theme } = useTheme();

  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const formatDate = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  const [permissions, setPermissions] = useState<IPermisson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enablePermission, setEnablePermission] = useState<string[]>([]);

  useEffect(() => {
    const getPermissions = async () => {
      setIsLoading(true);
      setEnablePermission(record?.permissions);
      const response = await permissionApi.fetchPermissionApi(
        "pageSize=1000&current=1"
      );
      if (response.data) {
        setPermissions(response.data.result);
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }

      setIsLoading(false);
    };
    getPermissions();
  }, [record]);

  const groupedPermissions = permissions.reduce(
    // Group permissions by module
    (groups: any, permission: IPermisson) => {
      const { module } = permission; //
      if (!groups[module]) {
        groups[module] = [];
      }
      groups[module].push(permission);
      return groups;
    },
    {}
  );

  const handleSwitchChange = (permissionId: string, checked: boolean) => {
    setEnablePermission((prevPermissions) =>
      checked
        ? [...prevPermissions, permissionId]
        : prevPermissions.filter((id) => id !== permissionId)
    );
  };

  // Function to handle module switch change
  const handleModuleSwitchChange = (module: string, checked: boolean) => {
    const modulePermissions = groupedPermissions[module].map((p: IPermisson) => p._id);
    setEnablePermission((prevPermissions) =>
      checked
        ? [...new Set([...prevPermissions, ...modulePermissions])]
        : prevPermissions.filter((id) => !modulePermissions.includes(id))
    );
  };

  const renderItem = (label: string, value: React.ReactNode) => ({
    key: label,
    label: <span className={textColor}>{label}</span>,
    children: <span className={textColor}>{value}</span>,
  });
  const items = [
    renderItem("Role Name", record?.name),
    renderItem("Description", record?.description),
    renderItem(
      "Created At",
      <span className={textColor}>{formatDate(record?.createdAt)}</span>
    ),
    renderItem(
      "Created By",
      <span className={textColor}>{record?.createdBy?.email}</span>
    ),
    renderItem(
      "Updated At",
      <span className={textColor}>{formatDate(record?.updatedAt)}</span>
    ),
    renderItem(
      "Updated By",
      <span className={textColor}>{record?.updatedBy?.email}</span>
    ),
  ];

  return (
    <div
      className={`flex-1 
    ${textColor} ${bgColor}`}
    >
      <Drawer
        closable={false}
        className={`
        ${textColor} ${bgColor}`}
        loading={isLoading}
        open={openDetailRole}
        onClose={() => setOpenDetailRole(false)}
        width={"100vh"}
      >
        <div
          className={` ${textColor} ${bgColor}
             flex-1 items-center justify-center p-2
          `}
        >
          <h1 className="text-4xl my-2 mb-6 font-bold">Role Detail</h1>
          <Descriptions bordered items={items} column={1} />
          <div className="my-2" />
          <Collapse>
            <Collapse.Panel
              header={<span className={`${textColor}`}>Permissions</span>}
              key="1"
            >
              {Object.keys(groupedPermissions).map((module) => (
                <Collapse key={module} style={{ marginBottom: "16px" }}>
                  <Collapse.Panel
                    header={
                      // Add toggle switch for each module
                      <div className="flex items-center">
                        <span className={`${textColor}`}>{module}</span>
                        <Switch
                          className="ml-auto"
                          checked={groupedPermissions[module].every((permission: IPermisson) =>
                            enablePermission.includes(permission._id)
                          )}
                          onChange={(checked: boolean) => handleModuleSwitchChange(module, checked)}
                        />
                      </div>
                    }
                    key={module}
                    className={`${bgColor} ${textColor} round-xl`}
                  >
                    <div>
                      {groupedPermissions[module].map(
                        (permission: IPermisson) => (
                          <div
                            key={permission._id}
                            className={`flex items-center p-1 border border-gray-200 rounded-md
                              ${textColor} ${bgColor} `}
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
                              disabled
                              checked={enablePermission?.includes(
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
        </div>
      </Drawer>
    </div>
  );
};

export default DetailRole;
