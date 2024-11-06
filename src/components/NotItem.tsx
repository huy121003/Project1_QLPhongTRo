import { Result } from "antd";
import React from "react";

function NotItem() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Result
        className="flex-1"
        status="info" // Trạng thái hiển thị
        title={<p className="text-2xl font-bold">No Data Found</p>}
        subTitle={
          <p className="text-xl">No data can be found, please add new data</p>
        }
        icon={
          <i className="fa-solid fa-face-sad-tear text-9xl text-red-400"></i>
        }
      />
    </div>
  );
}

export default NotItem;
