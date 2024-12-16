import {  StyleSheet , ScrollView  } from "react-native"
import Header from "../../components/auth/Header"
import colors from "../../constants/colors";
import RegisterForm from "../../components/auth/RegisterForm";
import { Banner } from 'react-native-paper';
import { useState , useRef } from "react";
import {Ionicons} from '@expo/vector-icons'
import { register } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/authSlice";
import {  saveToSecureStore } from "../../util/secureStorage";
import { useNavigation } from "@react-navigation/native";
import useKeyboard from "../../hooks/useKeyboard";
import socketClient from '../../config/socketClient'


const RegisterScreen = () => {

     const dispatch = useDispatch() ;

     const navigation = useNavigation() ;

     const {hideKeyboard} = useKeyboard()

    const [banner,setBanner] = useState({
      visible : false,
      message : ''
    }) ;

    const scrollRef = useRef() ;

    const scrollToTop = () => {
      scrollRef.current.scrollTo({
        y : 0,
        animated : true 
      })
    }
   
    const handleRegisterSubmit =  (form) => {
      hideKeyboard()
        for (const key in form) {
          if(!form[key]) {
              setBanner({visible : true, message : 'veuillez remplir tous les champs !'}) ;
              scrollToTop() ;
              return ;
          }
        }

        if(form.fullname.length < 6 || form.fullname.length > 35) {
          setBanner({visible : true, message : 'le nom doit contenir entre 6 et 35 charactères !'}) ;
          scrollToTop() ;
          return ;
        }

        if(!form.email.includes('@') || !form.email.includes('.')) {
          setBanner({visible : true, message : 'Email inavlide'}) ;
          scrollToTop() ;
          return ;
        }
        if(form.password !== form.confirmPassword) {
          setBanner({visible : true, message : 'Les mots de passe ne correspondent pas !'}) ;
          scrollToTop() ;
          return ;
        }

         handleSubmit(form)
    }

    const  handleSubmit = async (form) => {
    
      try {
      const response =  await register(form)
      const data =  response?.data ;
      dispatch(loginAction({accessToken : data.accessToken , role : data.role , userId: data.userId })) ;
      await saveToSecureStore('refreshToken',data.refreshToken) ;
      socketClient.emit('userConnected',email) ;

      navigation.navigate('PostLogin') ;
      
    } catch(err) {
        
         setBanner({visible : true, message : err?.response?.data?.message || 'erreur'});
         scrollToTop() ;
      }
    
    }
  

 
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled' ref={scrollRef}>
      <Banner
      visible={banner.visible}
      actions={[
        {
          label: 'OK',
          onPress: () => setBanner({message : '',visible : false}),
        }
      ]}
      icon={() => <Ionicons name="information-circle" size={24} /> } >
     {banner.message}
    </Banner>

       <Header />
       <RegisterForm onSubmit={handleRegisterSubmit} />

      </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container : {
       flex : 1,
    
    },
    form : {
       margin : 'auto',
       width : '80%',
       gap : 30,
    
    },
    illustration : {
        width : 150,
        height : 150,
        marginHorizontal : 'auto',
    },
    title : {
       fontSize : 25,
       fontWeight : 'bold',
       textAlign : 'center'
    },
    aboutUs : {
        alignSelf : 'flex-end',
        margin : 10
    },
    goToLogin : {
     color : colors.DarkGray,
      fontWeight : 'bold'
    }
  
})