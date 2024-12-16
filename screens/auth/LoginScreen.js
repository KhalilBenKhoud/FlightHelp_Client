import {   StyleSheet ,ScrollView } from "react-native"
import { useState } from "react";
import { login } from "../../services/auth.service";
import {Ionicons} from '@expo/vector-icons'
import { Banner ,Chip } from 'react-native-paper';
import Header from "../../components/auth/Header";
import LoginForm from '../../components/auth/LoginForm'
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/authSlice";
import {  saveToSecureStore } from "../../util/secureStorage";
import { useNavigation } from "@react-navigation/native";
import useKeyboard from "../../hooks/useKeyboard";
import socketClient from '../../config/socketClient'
import AboutUs from "../../components/auth/AboutUs";


const LoginScreen = () => {
    
    const dispatch = useDispatch() ;
    const navigation = useNavigation() ;

    const {hideKeyboard} = useKeyboard()
    

    const [showAboutUs,setShowAboutUs] = useState(false) ;

    const [banner,setBanner] = useState({
        visible : false ,
        message : ''
      }) ;
    
    
      const  handleFormSubmit = async ({email , password}) => {
    
        try {
          hideKeyboard()
        const response =  await login({email,password}) ;
        const data =  response?.data ;
        dispatch(loginAction({accessToken : data.accessToken , role : data.role , userId : data.userId })) ;
        await saveToSecureStore('refreshToken',data.refreshToken) ;
         socketClient.emit('userConnected',email) ;
        navigation.navigate('PostLogin') ;
        
      } catch(err) {
          
           setBanner({visible : true, message : err?.response?.data?.message || 'erreur'})
        }
      
      }
    

    
 
  
    return (
        <ScrollView  contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled' >
      {banner.visible && <Banner
       visible={banner.visible}
      actions={[
        {
          label: 'OK',
          onPress: () => setBanner({message : '',visible : false}),
        }
      ]}
      icon={() => <Ionicons name="warning" size={24} /> } >
     {banner.message}
    </Banner> }
       
       <Header />
        
        <LoginForm onSubmit={handleFormSubmit} />

       {showAboutUs && <AboutUs hideDialog={() => setShowAboutUs(false)} />}
       <Chip icon="information" onPress={() => setShowAboutUs(true)} style={styles.aboutUs} mode="outlined">A propos</Chip>
       </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
       flex : 1,
        justifyContent : 'space-between'
    },
    aboutUs : {
        alignSelf : 'flex-end',
        margin : 10
    }
      
})