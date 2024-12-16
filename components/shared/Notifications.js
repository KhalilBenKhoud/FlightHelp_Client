import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Badge, Icon } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import useFetch from '../../hooks/useFetch'
import { useNavigation , useRoute } from '@react-navigation/native'
import socketClient from '../../config/socketClient'
import * as Notification from 'expo-notifications'


 
const Notifications = () => {
    
    const { response , loading , error , fetchData} = useFetch('get','/notification/current') ;

    const [notificationsCount,setNotificationsCount] = useState() ;

    const navigation = useNavigation() ;

    const route = useRoute() ;

   const handleDeviceNotification = async (data) => {
      if(!data) return ;
      Notification.scheduleNotificationAsync({
         content: {
           title: data.title,
           body: data.content ,
           tag : data._id    
         },
         trigger: {
           seconds: 2
         }
       });
   }

    useEffect(() => {
       const fetch = async () => {
         await fetchData() ;
       
       }
       fetch()

       socketClient.on('notification' ,async (data) => {
         await fetchData() ;
         handleDeviceNotification(data) ;
       })


    },[])

    useEffect(() => {
       setNotificationsCount(response?.dataLength) ;
    },[response])

    return (
    <TouchableOpacity style={styles.container} onPress={() => response && navigation.navigate('allNotifications',response.data)} >
        <Ionicons name={route.name === 'allNotifications' ? 'notifications' : 'notifications-outline'} size={24} color='midnightblue' style={styles.icon}/>
        <Badge style={styles.badge} size={18}>{notificationsCount}</Badge>
    </TouchableOpacity>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container : {
      justifyContent : 'center'
  } , 
  icon : {
       position : 'relative'
    },
    badge : {
       position : 'absolute',
       top : 0,
       right: -3,
       backgroundColor : '#a20303'
    }
})