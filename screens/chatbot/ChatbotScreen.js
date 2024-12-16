import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native"
import ChatInput from "../../components/chatbot/ChatInput"
import {  useState } from "react";
import { askQuestion } from "../../services/chatbot.service";
import { GiftedChat } from 'react-native-gifted-chat'
import useKeyboard from "../../hooks/useKeyboard";
import { useNavigation } from "@react-navigation/native";
import { Badge, Button } from "react-native-paper";


const ChatbotScreen = () => {

  const navigation = useNavigation() ;
  
    const [messages,setMessages] = useState([]) ;

    const [conversation,setConversation] = useState([]) ;
    
    const {hideKeyboard} = useKeyboard() ;

    const handleSubmit = async (q) => {
        hideKeyboard() ;
      try {
        const question = {
          _id : Math.random().toString(36).substring(7),
          text : q,
          createdAt : new Date(),
          user :  {
            _id: 1,
          }
        }

        setMessages(prev => GiftedChat.append(prev,[question]))
        setConversation(prev => [...prev, {"role": "user","parts":[{"text": q}]}])
        const response = await askQuestion(q,conversation) ;
         const data = response.data ;
         const replyText = data.candidates[0].content.parts[0].text ;
         const reply = {
          _id : Math.random().toString(36).substring(7),
          text : replyText,
          createdAt : new Date(),
          user :  {
            _id: 2,
            name: 'Gemini'
          }
        }
        setMessages(prev => GiftedChat.append(prev,[reply]))
        setConversation(prev => [...prev, {"role": "model","parts":[{"text": replyText}]}])
        
        }catch(err) {
          console.error(err)
        }
    }

    const resetConversation = () => {
      setConversation([]) ;
      setMessages([]) ;
    }
 
    return (
    <View  keyboardShouldPersistTaps='handled' style={styles.container}> 
     <ImageBackground source={require('../../assets/chatBackground.png')} style={{flex : 1}} resizeMode="cover">
     <View  style={styles.chatContainer}>
     <Button mode='contained-tonal' icon='autorenew' onPress={resetConversation}>Nouveau</Button>
    <GiftedChat renderInputToolbar={() => {}}
      messages={messages}
      user={{_id : 1}}
      minInputToolbarHeight={5}
    />
    </View>

     <ChatInput  onSubmit={handleSubmit}/>
     </ImageBackground>
    </View>
  )
}

export default ChatbotScreen


const styles = StyleSheet.create({
    container : {
       flex : 1,
      
    },
    chatContainer : {
      flex : 1,
      justifyContent : 'center'
    }
})