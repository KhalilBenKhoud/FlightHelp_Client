import { useDispatch } from "react-redux"
import { refreshToken } from "../services/auth.service";
import { getFromSecureStore , saveToSecureStore } from "../util/secureStorage";
import { attachAccessTokenAction } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const STORAGE_KEY = 'refreshToken' ;

const useRefreshToken = () => {
  
    const dispatch = useDispatch() ;
    const navigation = useNavigation() ;
    

    const refresh = async () => {

       const currentRefreshToken = await getFromSecureStore(STORAGE_KEY) ; //current refresh token in secure storage
       const response = await refreshToken(currentRefreshToken) ;
       const data = response?.data ;
       dispatch(attachAccessTokenAction(data.accessToken)) ;
       await saveToSecureStore(STORAGE_KEY,data.refreshToken) ;
       return data.accessToken ;
    
    }
     
    return refresh ;
}

export default useRefreshToken