import { apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";

export const postFileApi = (imageFile: File): Promise<any> => {
  console.log(imageFile);
  return apiRequest(ApiMethod.POST, `/api/v1/files/upload`, true, {
    imageFile,
  });
};
