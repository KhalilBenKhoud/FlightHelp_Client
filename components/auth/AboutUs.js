import { Button, Dialog, Portal, Text } from 'react-native-paper';
import Header from './Header';



const AboutUs = (props) => {
 
   
   
    return (
    <Portal>
    <Dialog visible={true} onDismiss={props.hideDialog} theme={{ dark : false }} >

      <Dialog.Content  style={{ gap : 20}}>
        <Header />
         <Text style={{textAlign : 'center' , fontWeight : 'bold'}}>Version 1.0.0</Text>
        <Text variant="bodyMedium">FlightHelp est une application de helpdesk pour les administratifs de Tunisair</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.hideDialog}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>

  )
}

export default AboutUs