import type { DataLogin } from '@/type_interface/typedata';
import axios from 'axios';
import Cookies from 'js-cookie'
const  token  =  Cookies.get('cookieLogin')

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
 })


 export const loginProdcut = async ( data : DataLogin)=>{
  return   await axiosInstance.post("/users/login" , data)
}






