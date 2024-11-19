import { ApiMethod } from "../enums";
import { apiRequest } from "./ApiConfig";

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
        `/api/v1/register-service?${query}&populate=service,user,room`,
        false
    );
};
export default {
    postRegisterServiceApi,
    fetchRegisterServiceApi,
};
