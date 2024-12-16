import { StyleSheet, Text, TouchableOpacity , View } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import colors from "../../constants/colors"

const OneNotification = (props) => {
  return (
   <TouchableOpacity style={styles.container}>
      <View style={styles.titeContainer} >
      <Text style={styles.title}>{props.title}</Text>
      <Ionicons name="notifications-circle-sharp" color='gray' size={30}/>
     </View>
      <Text>{props.content}</Text>
   </TouchableOpacity>
  )
}

export default OneNotification

const styles = StyleSheet.create({
    container : {
        borderRadius : 18,
        padding : 10,
        backgroundColor : 'white'
    },
    titeContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center'
    },
    title : {
       fontWeight : 'bold',
       color : colors.DarkViolet,
       fontSize : 17
    }
})