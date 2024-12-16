
import { StyleSheet , View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { TextInput , SegmentedButtons  , Button, Snackbar} from "react-native-paper"
import { useCallback , useEffect, useState} from "react"
import useFetch from '../../hooks/useFetch';
import useKeyboard from '../../hooks/useKeyboard';


const EditTicketForm = (props) => {

    const {response , loading , error , fetchData} = useFetch('put',`/ticket/${props._id}`) ;

    const [snackbar,setSnackbar] = useState('') ;
    const { hideKeyboard }  = useKeyboard() ;

 
    const [form,setForm] = useState({
        title: props.title,
        description : props.description ,
        priority : props.priority,
     })

     const updateForm = useCallback((key,value) => {
      
        setForm( prev => {
            return {...prev, [key] : value}
        }
        )
    },[])


    const handleSubmit = async () => {
        hideKeyboard() ;
        await fetchData(form) ;
        props.onUpdate() ;
    }

    useEffect(() => {
       if(response) {
        setSnackbar(response?.message) ;
        setTimeout(() => {
         props.hideModal() ;
        },1500)
       }
    },[response])
 
    return (
    <Portal>
    <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={styles.container}>
    <Text style={styles.title} >Modifier le ticket :</Text>
     <TextInput label='titre' disabled={true}  value={form.title}/>
     <TextInput label='description' multiline={true} onChangeText={entered => updateForm('description',entered)} value={form.description}/>
     <Text style={styles.label}>Priorité</Text>
     <View style={{gap : 10}}>

     <SegmentedButtons
        value={form.priority}
        onValueChange={(entered) => updateForm('priority',entered)}
        buttons={[
          {
            value: 'low',
            label: 'low',
          },
          {
            value: 'medium',
            label: 'medium',
          }
        ]}
      />
     <SegmentedButtons
        value={form.priority}
        onValueChange={(entered) => updateForm('priority',entered)}
        buttons={[
          { 
            value: 'high',
            label: 'high'
         },
         {
             value: 'critical',
            label: 'critical'
         }
        ]}
      />
      </View>
      <View style={styles.buttons}>
      <Button buttonColor="#e00404" textColor="white" style={styles.btn} onPress={props.hideModal} >Annuler</Button> 
      <Button buttonColor="#0c770c" textColor="white" style={styles.btn} onPress={handleSubmit} >Modifier</Button> 
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

export default EditTicketForm


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