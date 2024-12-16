import { Button, Dialog, Portal, Text , Snackbar } from 'react-native-paper';
import useKeyboard from '../../hooks/useKeyboard';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

const CloseTicketDialog = (props) => {
 
  
  const {response , loading , error , fetchData} = useFetch('put',`/ticket/close/${props._id}`) ;

  const [snackbar,setSnackbar] = useState('') ;

 
  const handleSubmit = async () => {
    
    await fetchData() ;
   
    if(error) console.log(error?.response?.data?.message)
}

useEffect(() => {
  console.log('id: ',props._id)
   console.log(response)
  if(response) {
   setSnackbar(response?.message) ;
   setTimeout(() => {
    props.onUpdate() ;
    props.hideDialog() ;
   },1500)
  }
},[response])
 
 
  return (
    <Portal>
    <Dialog visible={true} onDismiss={props.hideDialog} theme={{ dark : false }} >

      <Dialog.Content  style={{ gap : 20}}>
         <Text style={{textAlign : 'center' , fontWeight : 'bold'}}>Fermer le ticket</Text>
        <Text variant="bodyMedium">confirmez la fermeture du ticket intitulé :<Text style={{fontWeight : 'bold'}}>{props.title}</Text></Text>
      </Dialog.Content>
      <Dialog.Actions>
      <Button onPress={props.hideDialog}>Annuler</Button>
        <Button onPress={handleSubmit}>OK</Button>
      </Dialog.Actions>
    </Dialog>
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

export default CloseTicketDialog