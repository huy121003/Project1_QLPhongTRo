import { apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";

export const postAvatarApi = (imageFile: File): Promise<any> => {
  console.log(imageFile);
  return apiRequest(ApiMethod.POST, `/api/v1/files`, true, {
    imageFile,
  });
};
