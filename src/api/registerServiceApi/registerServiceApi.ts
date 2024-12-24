import { apiRequest } from "api/config";
import { ApiMethod, RegisterServiceStatus } from "enums";

const postRegisterServiceApi = (
  service: string,
  user: string,
  room: string,
  type: boolean,
  executeNow: boolean
): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/register-service`, false, {
    service,
    user,
    room,
    type,
    executeNow,
  });
};

const fetchRegisterServiceApi = (query: string): Promise<any> => {
  return apiRequest(
    ApiMethod.GET,
    `/api/v1/register-service?${query}&populate=user,service,room`,
    false
  );
};
const patchRegisterServiceApi = (
  id: string,
  status: RegisterServiceStatus
): Promise<any> => {
  return apiRequest(ApiMethod.PATCH, `/api/v1/register-service/${id}`, false, {
    status,
  });
};
const deleteRegisterServiceApi = async (id: string): Promise<any> => {
  return apiRequest(ApiMethod.DELETE, `/api/v1/register-service/${id}`, false);
};

export default {
  postRegisterServiceApi,
  fetchRegisterServiceApi,
  patchRegisterServiceApi,
  deleteRegisterServiceApi,
};
