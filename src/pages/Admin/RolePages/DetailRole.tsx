import React, { useEffect, useState } from "react";
import { Descriptions, Drawer, message, Switch, Tag, Collapse, notification } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment";

import { getMethodColor, getRoleColor } from "../../../utils/getMethodColor";
import { IPermisson } from "../../../interfaces";
import { permissionApi } from "../../../api";

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

  const items = [
    {
      key: "1",
      label: "Role Name",
      children: (
        <p
          className={`border ${
            getRoleColor(record?.name) as string
          } text-center rounded border-2 w-[120px] p-2`}
        >
          {record?.name}
        </p>
      ),
    },
    {
      key: "2",
      label: "Description",
      children: record?.description,
    },
    {
      key: "3",
      label: "Created At",
      children: new Date(record?.createdAt).toLocaleDateString(),
    },
    {
      key: "4",
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
      key: "5",
      label: "Updated At",
      children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A",
    },
    {
      key: "6",
      label: "Updated By",
      children: record?.updatedBy ? (
        record?.updatedBy?.email
      ) : (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Updating
        </Tag>
      ),
    },
  ];

  return (
    <Drawer
      loading={isLoading}
      open={openDetailRole}
      onClose={() => setOpenDetailRole(false)}
      width={"100vh"}
    >
      <Descriptions bordered title="Role Details" items={items} column={1} />
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
                  {groupedPermissions[module].map((permission: IPermisson) => (
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
                        <p className="flex-1">Api Path: {permission.apiPath}</p>
                      </div>
                      <Switch
                        disabled
                        checked={enablePermission?.includes(permission._id)}
                        onChange={(checked: boolean) =>
                          handleSwitchChange(permission._id, checked)
                        }
                        className="ml-auto"
                      />
                    </div>
                  ))}
                </div>
              </Collapse.Panel>
            </Collapse>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Drawer>
  );
};

export default DetailRole;
