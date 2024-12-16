import axios from "axios";



export const axiosPrivate = axios.create({
    baseURL : process.env.EXPO_PUBLIC_API_URI_DEV + '/api/v1',
    withCredentials : true,
    headers : {'Content-Type' : 'application/json'}
})

export default axios.create({
    baseURL : process.env.EXPO_PUBLIC_API_URI_DEV + '/api/v1',
    headers : {'Content-Type' : 'application/json'}
})