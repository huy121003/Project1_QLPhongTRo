import axios from "../api/ApiConfig";



export const  fetchServiceApi =(query:any):Promise<any>=>{
    return axios.get(`/api/v1/services?${query}`)
}
export const  deleteServiceApi =(id:string):Promise<any>=>{
    return axios.delete(`/api/v1/services/${id}`)
}
export const  postServiceApi =(serviceName:string,description:string,price:number,unit:string):Promise<any>=>{
    return axios.post(`/api/v1/services`,{
        serviceName,
        description,
        price,
        unit
    })
}
export const  patchServiceApi =(id:string,serviceName:string,description:string,price:string,unit:string):Promise<any>=>{
    console.log("dd",price)
    return axios.patch(`/api/v1/services/${id}`,{
        serviceName,
        description,
        price: price,
        unit
    })
}