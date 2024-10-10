import axios from "../api/ApiConfig";



export const  apiFetchRoom =()=>{
    return axios.get('/api/v1/rooms')
}