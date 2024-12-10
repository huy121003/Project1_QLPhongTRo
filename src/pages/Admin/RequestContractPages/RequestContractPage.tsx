import React, { useEffect } from "react";
import { notification } from "antd";
import { IRequestContract } from "interfaces";
import requestContractApi from "api/requestContractApi/requestContractApi";
import RequestContractFilter from "./child-components/RequestContractFilter";
import RequestContractTable from "./child-components/RequestContractTable";


function RequestContractPage() {
  const [requestContract, setRequestContract] = React.useState<
    IRequestContract[]
  >([]);
  const [total, setTotal] = React.useState(0);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({
    status: "",
    type: "",
  });
  const [sorted, setSorted] = React.useState<string>("");
  const getRequestContract = async () => {
    const queryParams: Record<string, any> = {
      currentPage: current,
      pageSize: pageSize,
      // status: status,
      sort: sorted,
    };
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = `${value}`;
      }
    });
    const query = new URLSearchParams(queryParams).toString();
    setLoading(true);
    const res = await requestContractApi.fetchRequestContractApi(query);
    if (res.data) {
      setRequestContract(res.data.result);
      setTotal(res.data.meta.totalDocument);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getRequestContract();
  }, []);

  const onChange = (pagination: any) => {
    if (pagination.current !== current && pagination) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize && pagination) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };
  const handleSearchChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
    setCurrent(1);
  };

  const handleSortChange = (e: any) => {
    setSorted(e.target.value);
    setCurrent(1);
  };

  return (
    <>
      <h1 className="text-2xl font-bold m-2">Request Contract</h1>
      <div className="m-2">
        <RequestContractFilter
          searchParams={searchParams}
          sorted={sorted}
          handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
        />
        <RequestContractTable
          requestContract={requestContract}
          isLoading={loading}
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
          getRequestContract={getRequestContract}
        />
      </div>
    </>
  );
}

export default RequestContractPage;
