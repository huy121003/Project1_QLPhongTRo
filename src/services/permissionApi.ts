import axios from "../api/ApiConfig";


export const fetchPermissionApi = (query: any): Promise<any> => {
    return axios.get(`/api/v1/permissions?${query}`)
}
export const fetchPermissionByIdApi = (id: string): Promise<any> => {
    return axios.get(`/api/v1/permissions/${id}`)
}