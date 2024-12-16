import  { useEffect, useState } from 'react'
import { TextInput ,Modal, Portal , Snackbar , Button, ActivityIndicator} from 'react-native-paper';
import { ScrollView, StyleSheet , Text , View  } from 'react-native';
import useKeyboard from '../../hooks/useKeyboard';
import colors from '../../constants/colors';
import useFetch from '../../hooks/useFetch';

const ResolveTicket = (props) => {
    const [snackbar,setSnackbar] = useState('') ;
    const { hideKeyboard }  = useKeyboard()

    const [solution,setSolution] = useState(props.oldSolution) ;

    const {response , loading , error , fetchData} = useFetch('put',`/admin/ticket/resolve/${props._id}`) ;


    const handleSubmit = async () => {
         hideKeyboard()
        if(!solution) return ;
        await fetchData({solution}) ;
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
        <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={styles.container} >
        {loading ? <ActivityIndicator style={{margin : 'auto'}} /> : <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{gap : 30}}>
        <Text style={styles.title} >Résoudre le ticket :</Text>
        <TextInput multiline={true} value={solution} onChangeText={setSolution} style={styles.textarea} />
        <View style={styles.buttons}>
        <Button buttonColor="#e00404" textColor="white" style={styles.btn} onPress={props.hideModal} >Annuler</Button> 
        <Button buttonColor={colors.DarkViolet} textColor="white" style={styles.btn} onPress={() => setSolution('')} >Reset</Button> 
        <Button buttonColor="#0c770c" textColor="white" style={styles.btn} onPress={handleSubmit} >Résoudre</Button> 
        </View>
        </ScrollView> }
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
    
    export default ResolveTicket
    
    const styles = StyleSheet.create({
        container : {
            width : '90%',
            margin : 'auto',
            padding : 20,
          backgroundColor : 'white', 
          gap : 30,
          minHeight : 400,
          justifyContent  : 'flex-start',
          borderRadius : 20
          
        },
        textarea : {
          minHeight : 350  
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
            paddingHorizontal : 5
         }
    })

