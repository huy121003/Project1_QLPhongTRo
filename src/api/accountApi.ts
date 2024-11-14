import { apiRequest } from "./ApiConfig";
import { ApiMethod } from "./ApiMethod";
export const fecthAccountApi = async (query: any): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/users?${query}`, false);
};
export const fecthAccountIdApi = async (id: string): Promise<any> => {
    return apiRequest(ApiMethod.GET, `/api/v1/users/${id}`, false);
};
export const deleteAcountApi = async (id: string): Promise<any> => {
    return apiRequest(ApiMethod.DELETE, `/api/v1/users/${id}`, false);
};
export const postAccountApi = (
    email: string,
    phone: number,
    password: string,
    name: string,
    birthday: Date,
    gender: string,
    address: string,
    idCard: string,
    role: string,
    avatar: string,
    imagesIdCard: string[]
): Promise<any> => {
    return apiRequest(ApiMethod.POST, `/api/v1/users`, false, {
        email,
        phone,
        password,
        name,
        birthday,
        gender,
        address,
        idCard,
        role: role,
        imagesIdCard,
        avatar,
    });
};
export const patchAccountApi = (
    id: string,

    phone: number,

    name: string,
    birthday: Date,
    gender: string,
    address: string,
    idCard: string,
    role: string,
    avatar: string,
    imagesIdCard: string[]
): Promise<any> => {
    return apiRequest(ApiMethod.PATCH, `/api/v1/users/${id}`, false, {
        phone,
        name,
        birthday,
        gender,
        address,
        idCard,
        role,
        imagesIdCard,
        avatar,
    });
};
export const changePasswordApi = (
    _id: string,
    password: string,
    oldPassword: string
): Promise<any> => {
    return apiRequest(ApiMethod.POST, `/api/v1/users/change-password`, false, {
        _id,
        password,
        oldPassword,
    });
};

// export const fecthAccountApi = async (query: any): Promise<any> => {
//   return apiConfig.get(`/api/v1/users?${query}`);
// };
// export const fecthAccountByIdApi = async (id: string): Promise<any> => {
//   return apiConfig.get(`/api/v1/users/${id}`);
// };
// export const deleteAcountApi = async (id: string): Promise<any> => {
//   return apiConfig.delete(`/api/v1/users/${id}`);
// };
// export const postAccountApi = (
//   email: string,
//   phone: number,
//   password: string,
//   name: string,
//   birthday: Date,
//   gender: string,
//   address: string,
//   idCard: string,
//   role: string
// ): Promise<any> => {
//   return apiConfig.post(`/api/v1/users`, {
//     email,
//     phone,
//     password,
//     name,
//     birthday,
//     gender,
//     address,
//     idCard,
//     role: role,
//   });
// };
// export const patchAccountApi = (
//   id: string,

//   phone: number,

//   name: string,
//   birthday: Date,
//   gender: string,
//   address: string,
//   idCard: string,
//   role: string
// ): Promise<any> => {
//   return apiConfig.patch(`/api/v1/users/${id}`, {
//     phone,
//     name,
//     birthday,
//     gender,
//     address,
//     idCard,
//     role,
//   });
// };
// export const changePasswordApi = (
//   _id: string,
//   password: string,
//   oldPassword: string
// ): Promise<any> => {
//   return apiConfig.post(`/api/v1/users/change-password`, {
//     _id,
//     password,
//     oldPassword,
//   });
// };
