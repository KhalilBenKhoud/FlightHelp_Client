import { Modal, Portal, Text , Snackbar ,Button, TextInput} from 'react-native-paper';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import useKeyboard from '../../hooks/useKeyboard';
import { StyleSheet , View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';


const AddFeedback = (props) => {
  
    const {response , loading , error , fetchData} = useFetch('post',`/feedback/${props._id}`) ;

    const [snackbar,setSnackbar] = useState('') ;
    const { hideKeyboard }  = useKeyboard() ;
    const [stars,setStars] = useState(0) ;
    const [content,setContent] = useState('')

    const handleSubmit =() => {
        fetchData({stars,content}) ;
        hideKeyboard() ;
    }

    useEffect(() => {
       if(response) {
         setSnackbar(response?.message) ;
         setTimeout(() => {
            props.onUpdate() ;
           props.hideModal() ;
         },1500)
       }
    },[response])

    useEffect(()  => {
       
        if(error) {
         setSnackbar(error?.response?.data?.message) ;
        }
    },[error])

    return (
    <Portal>
    <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={styles.container}>
    <Text style={styles.title} >Ajouter un feedback :</Text>
     <Text style={styles.label}>Evaluation :</Text>
     <StarRating
        rating={stars}
        onChange={setStars}
      />
      <Text style={styles.label}>Commentaire :</Text>
     <TextInput  multiline onChangeText={setContent} />
   
    <View style={styles.buttons}>
      <Button buttonColor="#e00404" textColor="white" style={styles.btn} onPress={props.hideModal} >Annuler</Button> 
      <Button buttonColor="#0c770c" textColor="white" style={styles.btn} onPress={handleSubmit} >Ajouter</Button> 
      </View>
    </Modal>
    { snackbar && <Snackbar
        visible={true}
        style={{position : 'absolute' , bottom : 10}}
        onDismiss={() => setSnackbar('')}
        duration={1500}
        action={{
          label: 'Ok',
          onPress: () => {
             setSnackbar('')
          },
        }}>
        {snackbar}
      </Snackbar> }
  </Portal>

  )
}

export default AddFeedback


const styles = StyleSheet.create({
    container : {
        width : '90%',
        margin : 'auto',
        padding : 20,
      backgroundColor : 'white', 
      gap : 30,
      borderRadius : 20
    },
    title : {
        fontSize : 25,
        fontWeight : 'bold',
        textAlign : 'center'
     },
     label : {
        fontWeight : 'bold',
     },
     buttons : {
        alignSelf : 'flex-end',
        flexDirection : 'row',
        gap : 20
     }, 
     btn : {
        paddingHorizontal : 20
     }
})