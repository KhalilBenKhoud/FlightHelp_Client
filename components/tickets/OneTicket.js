import { StyleSheet , Text , View } from "react-native"
import colors from "../../constants/colors"
import {Ionicons} from '@expo/vector-icons'
import { Button } from "react-native-paper"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { memo, useState } from "react"
import ResolveTicket from "./ResolveTicket"
import ReusableImage from "../shared/ReusableImage"

const OneTicket = (props) => {
  
  const userId = useSelector(state => state.authState.userId) ;

  const navigation = useNavigation() ;

  const role = useSelector(state => state.authState.role) ;

  const [resolveModal,setResolveModal] = useState(false) ;

  
  return (
    <>
    <View style={styles.container}>
       
       <View style={styles.subview} >
       <Text style={styles.id}>ID: {props._id} <Text style={styles.mineLabel}>{props.createdBy?._id === userId && '(par moi)'}</Text></Text>
       <Ionicons name="ticket" color='red' size={24}/> 
        </View>
      <Text><Text style={styles.label}>Titre:</Text> {props.title}</Text>
     {props.details && <Text><Text style={styles.label}>Description:</Text> {props.description}</Text> }
      <Text><Text style={styles.label}>Crée par:</Text> {props.createdBy?.fullname}</Text>
      <Text><Text style={styles.label}>Crée à:</Text> {new Date(props.createdAt)?.toLocaleString()}</Text>
      <Text><Text style={styles.label}>Priorité :</Text> {props.priority}</Text>

      <View style={styles.subview}>
      <Text style={styles.label}>Statut: </Text>
      <Button mode="contained-tonal" icon='list-status'>{props.status}</Button>
      </View>

      <View style={{gap : 10}}>
      <Text style={styles.label}>Agents concernés: </Text>
       {props.taggedUsers?.length == 0 ? <Button style={styles.tagged} mode="elevated">Aucun</Button> : 
         props.taggedUsers?.map((tagged,index) => <Button style={styles.tagged} key={tagged._id} mode='elevated'>{tagged?.email}</Button>)
       }
        {props.details && props.image && <ReusableImage uri={props.image} style={styles.image} /> }
       {props.details && props.createdBy?._id === userId && <> 
       <Button buttonColor="#8b8b05" textColor="white" onPress={props.showEditModal}>Modifier</Button>
       <Button buttonColor="brown" textColor="white" onPress={props.showCloseDialog}>Fermer</Button>
       </>}
       { role === 'ADMIN' && <Button textColor="white" buttonColor="green" onPress={() => setResolveModal(true)} >Résoudre</Button>}
       {!props.details && <Button mode="contained" onPress={() => navigation.navigate('ticketDetails',{_id : props._id})}>Détails</Button> }
      </View>
    </View>
    <ResolveTicket onUpdate={props.onUpdate} visible={resolveModal} hideModal={() => setResolveModal(false)} _id={props._id} oldSolution={props.solution} />
    </>
  )
}

export default memo(OneTicket)

const styles = StyleSheet.create({
    container : {
        padding : 15,
        borderRadius : 10,
        borderWidth : 1,
        backgroundColor : 'white'
    },
    label : {
        color : colors.MediumViolet,
        fontWeight : 'bold',
        textDecorationLine : 'underline'
    },
    mineLabel : {
      fontWeight : 'bold',
      color : '#ff0000',
      textDecorationLine : 'underline'
    },
    subview : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    id : {
        fontWeight : 'bold'
    }, 
    tagged : {
      alignSelf : 'flex-start'
    },
    image :{
      width : 200,
      height : 200 ,
      borderWidth : 1,
      borderColor : 'black',
      overflow : 'hidden'
    },

})