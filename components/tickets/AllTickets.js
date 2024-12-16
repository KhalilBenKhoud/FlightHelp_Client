import { useCallback, useEffect, useState } from "react"
import {  StyleSheet, Text, View } from "react-native"
import { ActivityIndicator, Searchbar } from "react-native-paper"
import useFetch from "../../hooks/useFetch";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import TicketsList from "./TicketsList";

const AllTickets = (props) => {
  
    const [searchQuery,setSearchQuery] = useState('') ;
    const [searched,setSearched] = useState([]) ;

     const [limit,setLimit] = useState(3) ;

     const [page,setPage] = useState(1) ;

     const {response , loading , error ,fetchData} = useFetch('get',`/ticket/all?page=${page}&limit=${limit}`) ;

     const {response : currentResponse , loading : currentLoading , fetchData : fetchCurrent} = useFetch('get',`/ticket/current/all?page=${page}&limit=${limit}`) ;

   
     const {response : searchResponse  , loading : searchLoading , error : searchError , fetchData : fetchSearchData} = useFetch('post','/ticket/search') ;


     const [tickets,setTickets] = useState([])

      useFocusEffect(useCallback(() => {
        setTickets([]) ;
        setPage(1) ;
      },[]))


     useFocusEffect(useCallback(  () => {
        
         if(props.ofCurrentUser === true)
          fetchCurrent() ;
          else
         fetchData() ;
     },[page]))

     const loadMore =  () => {
        if(props.ofCurrentUser === true ? tickets.length < currentResponse?.dataLength : tickets.length < response?.dataLength )
        setPage(prev => prev + 1) ;
     }

     const search = async (entered) => {
      setSearchQuery(entered) ;
      if(searchQuery.length >= 3) {
        const regex = `.*${entered}.*`;  
        await fetchSearchData({query : regex}) ;
       
      }
       else {
       setSearched([])
       
       }
       if(searchError) console.log(searchError?.response?.data?.message)
     }

     useEffect(() => {
      setSearched(searchResponse?.tickets)
     },[searchResponse])

     useEffect(() => {
       if(props.ofCurrentUser === true)
       setTickets(prev => [...prev,...(currentResponse?.data || [])]) ;
       else 
       setTickets(prev => [...prev,...(response?.data || [])]) ;
     },[response,currentResponse])

    return (
    <View style={styles.container}>
      
      <Searchbar
      placeholder="Rechercher"
      onChangeText={search}
      value={searchQuery}
      onBlur={() => setSearchQuery('')}
    />
     {searchLoading ? <ActivityIndicator style={{margin : 'auto'}} /> : 
     tickets && 
     <View style={{flex : 1 , marginBottom : 5}}>
     <TicketsList data={searchQuery ? searched : tickets} loadMore={loadMore} loading={loading || currentLoading} />
     </View>
     }
    
     
    </View>
  )
}

export default AllTickets

const styles = StyleSheet.create({
    container : {
        padding : 25,
        gap : 20,
        flex : 1
    }
})