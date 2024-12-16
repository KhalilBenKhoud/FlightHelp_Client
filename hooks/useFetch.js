import {  useEffect, useState } from "react"
import useAxiosPrivate from "./useAxiosPrivate";
import useLogout from "./useLogout";


const useFetch = (method,url) => {
    
    const [loading,setLoading] = useState(false) ;
    const [error,setError] = useState(null) ;
    const [response,setResponse] = useState(null) ;
    const axiosPrivate = useAxiosPrivate() ;
    const handleLogout = useLogout() ;
   
   
        const fetchData = async (data = null,headers = null) =>
        {
        setLoading(true) ;
        try {
         const config = {
            method : method.toLowerCase(),
            url ,
            ...(headers && {headers})
         }
        if(method.toLowerCase() !== 'get' && data) {
            config.data = data ;
            
        }
        
        const response = await axiosPrivate(config) ;
        
        setResponse(response?.data) ;
      
        

        }
        catch(err) {
          if(err?.response?.status === 500) {
            console.error(method,url,err,err?.response?.data) ;
            handleLogout() ;        
          }
          else {
            setError(err) ;
          }
         
        }
        finally {
          setLoading(false) ;
        }
    }

  
  

    return {loading , error  , response , fetchData  }
}

export default useFetch