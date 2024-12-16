import { useState } from "react"
import { StyleSheet, View , ScrollView} from "react-native"
import { Button, IconButton, TextInput } from "react-native-paper"


const ChatInput = (props) => {
    
    const [question,setQuestion] = useState('') ;
   
    const handleSubmit = () => {
        props.onSubmit(question) ;
        setQuestion('') ;
     }
  
    return (
    <View style={styles.container}>
        <TextInput  style={styles.input} placeholder="saisir votre question !" mode='outlined' value={question} onChangeText={(entered) => setQuestion(entered)} multiline={true} />
        <Button style={styles.button}  buttonColor="#51518a" icon='send' mode="contained" onPress={handleSubmit}>Envoyer</Button>
    </View>
  )
}

export default ChatInput

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        gap : 20,
        padding : 15,
        backgroundColor  :'#ffffffb4',
        alignItems : 'center'
    },
    button : {
          justifyContent : 'center',
          alignItems : 'center',
          maxHeight :  45
    },
    input : {
        flex : 1,
        justifyContent : 'stretch'
     
    }
})