import  { useCallback, useEffect } from 'react'
import { Image, ScrollView , StyleSheet, Text , View } from 'react-native'
import useFetch from '../../hooks/useFetch'
import { useFocusEffect } from '@react-navigation/native';

const AnalyticsScreen = () => {
 
  const {response , loading , error , fetchData} = useFetch('get','/admin/ticket/count') ;
  const {response : averageResponse , fetchData : fetchAverage} = useFetch('get','/admin/ticket/average') ;


  useFocusEffect(useCallback(() => {
       fetchData() ;
       fetchAverage() ;
  },[]))



  useEffect(() => {
     console.log(averageResponse) ;
  },[averageResponse])

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Compte des tickets</Text>
         <View style={styles.innerContainer}>
         <View style={{gap : 30 , alignSelf : 'flex-start'}}>
        <View style={[styles.box, {backgroundColor: '#32CD32'}]}><Text style={styles.label}>Resolved : {response?.ticketCount?.find(e => e?._id == 'resolved')?.count ||0}</Text></View>
        <View style={[styles.box, {backgroundColor: '#FFA500'}]}><Text style={styles.label}>Open : {response?.ticketCount?.find(e => e?._id == 'open')?.count ||0}</Text></View>
        <View style={[styles.box, {backgroundColor: '#FF0000'}]}><Text style={styles.label}>Closed : {response?.ticketCount?.find(e => e?._id == 'closed')?.count ||0}</Text></View>
        </View> 
          <Image source={require('../../assets/analytics.gif')} style={styles.illustration} />
        </View>

        <Text style={styles.title}>moyenne des tickets par agent :</Text>
        <View style={styles.innerContainer}>
        <View style={[styles.box, {backgroundColor: 'gray'}]}><Text style={styles.label}>{averageResponse?.averageTicketsCount[0]?.averageTickets}</Text></View>
        <Image source={require('../../assets/ticket.png')} style={{width : 100, height : 100}} />
        </View>
    </ScrollView>
  )
}

export default AnalyticsScreen


const styles = StyleSheet.create({
  container: {
    padding : 20, 
    gap : 30,
    alignItems : 'center',
    backgroundColor  : 'white',
    flex : 1
  },
  innerContainer : {
     flexDirection : 'row',
     justifyContent : 'space-between', 
     alignItems : 'center',
     gap : 30,
     width : '100%'
  },
  illustration : {
     width : 200,
     height : 200 ,
  },
  title : {
    fontSize : 20,
    fontWeight : 'bold'
  },
  box : {
    elevation : 4,
    borderRadius : 10,
    minWidth : 150,
    height : 100,
    alignSelf: 'flex-start',
    justifyContent : 'center',
    alignItems : 'center',
    
  },
  label : {
    color : "white",
    fontSize : 20,
     fontWeight : 'bold'
  }
})