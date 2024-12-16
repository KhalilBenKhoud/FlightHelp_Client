import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useCallback, useEffect } from "react"
import { FlatList, View } from "react-native"
import OneNotification from "../../components/shared/OneNotification";

const NotificationsScreen = () => {
  
  const route = useRoute() ;

useFocusEffect(useCallback(() => {
    
},[]))
  
  
  return (
    <View>
     <FlatList contentContainerStyle={{ gap: 16 , padding : 10  }}
       data={route.params}
       renderItem={(({item}) => <OneNotification {...item} />)}
       keyExtractor={(item) => item._id}
       
     />
    </View>
  )
}

export default NotificationsScreen