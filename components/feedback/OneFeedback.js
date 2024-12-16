import {  TouchableOpacity , Text, StyleSheet} from "react-native"
import StarRating from 'react-native-star-rating-widget';
import colors from "../../constants/colors";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";


const OneFeedback = (props) => {
  
  const userId = useSelector(state => state.authState.userId) ;

  const {response , loading , error , fetchData} = useFetch('delete',`/feedback/${props._id}`) ;

  const handleDelete = async () => {
      await fetchData() ;
      props.onUpdate() ;
  }
  
  

  return (
   <TouchableOpacity style={styles.container}>
       <Text style={styles.label}>Auteur : {props.createdBy?.fullname}</Text>
       <StarRating
        rating={props.stars}
        onChange={() => {}}
      />
       {props.content && <Text>Commentaire: {props.content}</Text>}
       {props.createdBy?._id == userId && <Button icon='trash-can' buttonColor={colors.DarkViolet} textColor="white" onPress={handleDelete}>Supprimer</Button>}
       
   </TouchableOpacity>
  )
}

export default OneFeedback

const styles = StyleSheet.create({
  container : {
     borderColor : colors.Lavender,
     borderWidth : 2,
     backgroundColor : 'white',
     borderRadius : 10,
     padding : 10,
     gap : 10
  },
  label : {
    fontWeight : 'bold'
  }
})