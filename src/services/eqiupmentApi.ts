import axios from "../api/ApiConfig";


export const  fetchEquipmentApi =(query:any):Promise<any>=>{
    return axios.get(`/api/v1/equipments?${query}`)
}
export const  fetchEquipmentByIdApi =(id:string):Promise<any>=>{
    return axios.get(`/api/v1/equipments/${id}`)
}
export const  deleteEquipmentApi =(id:string):Promise<any>=>{
    return axios.delete(`/api/v1/equipments/${id}`)
}
export const  postEquipmentApi =(name:string,status:string,price:number,description:string):Promise<any>=>{
    return axios.post(`/api/v1/equipments`,{
        name,
        status,
        price:parseInt(price.toString()),
        description,
        
    })
}
export const  patchEquipmentApi =(id:string,name:string,status:string,price:number,description:string):Promise<any>=>{
   
    return axios.patch(`/api/v1/equipments/${id}`,{
        name,
        status,
        price:parseInt(price.toString()),
        description,
    })
}
