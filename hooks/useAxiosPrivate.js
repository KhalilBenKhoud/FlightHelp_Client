import { useEffect } from 'react';
import { axiosPrivate } from '../config/axios';
import useRefreshToken from './useRefreshToken'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutAction } from '../store/authSlice';

const useAxiosPrivate = () => {
    
    const refresh = useRefreshToken() ;
    const auth = useSelector(state => state.authState) ;

    const navigation = useNavigation()
    
     useEffect(() => {
       
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                }
                return config ;
            },
            error => Promise.resolve(error)
        )
        
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config ;
                // .sent is a custom property to prevent infinite loops in case 
                if(error?.response?.status === 403 && !prevRequest?.sent)
                {
                    prevRequest.sent = true ;

                    const newAccessToken = await refresh() ;
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}` ;
                    return axiosPrivate(prevRequest) ;
                  
                }
                return Promise.reject(error) ;
            }
        )
       
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor) ;
            axiosPrivate.interceptors.response.eject(responseInterceptor) ;
        }

     },[auth,refresh])
    


    return axiosPrivate ;
}

export default useAxiosPrivate