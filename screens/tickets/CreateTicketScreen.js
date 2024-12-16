import { useNavigation } from "@react-navigation/native"
import { ScrollView , Platform } from "react-native"
import { ActivityIndicator, Button , HelperText, Snackbar } from "react-native-paper"
import CreateTicketForm from "../../components/tickets/CreateTicketForm";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";


const CreateTicketScreen = () => {
  
  const navigation = useNavigation() ;

  const [snackbar,setSnackbar] = useState('')

  const {loading , response , error, fetchData} = useFetch('post','ticket/') ;

  useEffect(() => {
    if(response) {
    setSnackbar(response?.message) ;
    setTimeout(() => {
     navigation.goBack() ;
    },1500)
  }
  },[response])

  const createTicket = async (form) => {
     if(!form?.priority || !form?.title || !form.description) {
       setSnackbar('veuillez remplir tous les champs !') ;
       return ;
     }
     const data = new FormData();
     form.image && data.append('image', {
      name: form.image?.fileName,
      type: form.image?.mimeType,
      uri: Platform.OS === 'ios' ? form.image?.uri?.replace('file://', '') : form.image?.uri,
    });
      
    data.append('title',form.title) ;
    data.append('description',form.description) ;
    data.append('priority',form.priority) ;
    data.append('taggedUsers',form.taggedUsers?.map(e => e._idaa)) ;

     await fetchData(data,{
      'Content-Type': 'multipart/form-data'
    }) ;
     
  }
  
  return (
    <>
   <ScrollView contentContainerStyle={{padding : 10}}>
   
   <Button style={{margin : 10}} icon='keyboard-backspace' mode='contained-tonal' onPress={() => navigation.goBack()} >Retour</Button>
   { error && <HelperText type="error">{error?.response?.data?.message}</HelperText> }
   { loading ? <ActivityIndicator /> :  <CreateTicketForm handleSubmit={createTicket}/>}
     
  
       
   </ScrollView>
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
          {typeof snackbar === 'string' ? snackbar : JSON.stringify(snackbar)}
      </Snackbar> }
   </>
  )
}

export default CreateTicketScreen