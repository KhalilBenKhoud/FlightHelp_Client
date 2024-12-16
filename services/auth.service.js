import axios from "../config/axios"

export const login = async ({email, password}) => {
    return await axios.post('auth/login',{email,password}) ;
  
}

export const register = async (userInfo) => {
    return await axios.post('auth/register',userInfo) ;
  
}


export const refreshToken = async (refreshToken) => {
   return  await axios.post('auth/refreshToken',{refreshToken}) ;  
}

export const logout = async (refreshToken) => {
   return  await axios.post('auth/logout',{refreshToken}) ;  
}

export const forgetPassword = async (email) => {
    return  await axios.post('auth/forgetPassword',{email}) ;  
 }

 export const verifyForgetCode = async (token) => {
    return  await axios.post('auth/verifyToken',{token}) ;  
 }

 export const resetPassword = async (token,newPassword) => {
    return  await axios.post('auth/resetPassword',{token, newPassword}) ;  
 }



