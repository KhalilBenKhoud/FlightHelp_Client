import { logoutAction } from "../store/authSlice";
import { logout } from "../services/auth.service";
import { getFromSecureStore } from "../util/secureStorage";
import { useDispatch } from "react-redux";
import socketClient from '../config/socketClient'


const useLogout = () => {

   const dispatch = useDispatch() ;
   
    const handleLogout = async () => {
        const currentRefresh = await getFromSecureStore('refreshToken') ;
        await logout(currentRefresh) ;
        dispatch(logoutAction()) ;
        socketClient.disconnect() ;
   }

   return handleLogout ;
}

export default useLogout