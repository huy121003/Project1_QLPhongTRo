import { apiRequest } from "api/config";
import { ApiMethod } from "enums";

const postAvatarApi = (imageFile: File): Promise<any> => {
  return apiRequest(ApiMethod.POST, `/api/v1/files`, true, {
    imageFile,
  });
};
export default {
  postAvatarApi,
};
