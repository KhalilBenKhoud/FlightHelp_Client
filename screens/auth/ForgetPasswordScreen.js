import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "../../components/auth/Header"
import Animated , {   RollInLeft} from 'react-native-reanimated';
import { ActivityIndicator, Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import colors from "../../constants/colors";
import { useCallback, useEffect, useState } from "react";
import { forgetPassword, verifyForgetCode } from "../../services/auth.service";
import useKeyboard from "../../hooks/useKeyboard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const ForgetPasswordScreen = () => {
  
  const [email, setEmail] = useState('') ;
  
  
  const [response,setResponse] = useState('') ;
  const [error,setError] = useState('') ;
  const [loading,setLoading] = useState(false) ;
 
 
  const [snackbar,setSnackbar] = useState(true) ;
  const [codeSnackbar,setCodeSnackbar] = useState(true) ;
 
 
 
  const [resetCode,setResetCode] = useState('') ;

  // state for the verify reset token request
  const [codeResponse,setCodeResponse] = useState({}) ;
  const [codeError,setCodeError] = useState('') ;
  const [codeLoading,setCodeLoading] = useState(false) ;

  const { keyboardVisible , hideKeyboard } = useKeyboard() ;
  const navigation = useNavigation() ;



  const navigateToReset = (resetToken) => {

    navigation.push('ResetPassword',{token : resetToken})
  }

  const  handleSendEmail = async () => {
    
    try {
      setLoading(true) ;
     
      setSnackbar(true) ;
      hideKeyboard() ;
    const response =  await forgetPassword(email) ;
    const data =  response?.data ;
    setResponse(data) ;
    
  } catch(err) {
      setError(err?.response?.data?.message)

    }finally {
      setLoading(false) ;
    }
  
  }

  const handleVerifyCode = async () => {
    if(!resetCode) {
      setCodeError('veuillez saisir le code que vous avez reçu !') ;
      return ;
    }
    try {
     setCodeLoading(true) ;
     hideKeyboard() ;
     setCodeSnackbar(true) ;
    
    const response =  await verifyForgetCode(resetCode)
    const data =   response?.data ;
    setCodeResponse(data) ;
    setTimeout(() => {
      navigateToReset(data.token) ;
    },1000)
    
  } catch(err) {
      setCodeError(err?.response?.data?.message)

    }
    finally {
      setCodeLoading(false) ;
     
    }
  }



  useFocusEffect(useCallback(() => {
      setEmail('') ;
      setResetCode('') ;
      setResponse('') ;
      setCodeResponse('') ;
      
  },[]))
  
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
     <Header />
   
    <ScrollView contentContainerStyle={styles.container}  keyboardShouldPersistTaps='handled'>
     
     
  <View>
    <Text style={styles.title} >Mot de passe oublié ?</Text>
    {   !keyboardVisible &&  <Animated.Image entering={RollInLeft.springify()} source={require('../../assets/forget.png')} style={styles.illustration} />
    }   
 <Text style={styles.description}>Nous vous enverrons un e-mail avec un code pour réinitialiser votre mot de passe</Text>
  </View>

   <TextInput label='Email' mode="outlined" style={styles.input} onChangeText={(entered) => setEmail(entered)} value={email}
     onKeyPress={() => setError('')}
    />
    {error && <HelperText type="error">{error}</HelperText> }
   <Button mode="contained-tonal" onPress={handleSendEmail}>{loading ? <ActivityIndicator /> :  response ? 'Réenvoyer un code' : 'Envoyer un code'}</Button>

  { response && <TextInput autoCapitalize="none" label='Code' mode="outlined" style={styles.input} onChangeText={(entered) => setResetCode(entered)} value={resetCode}
     onKeyPress={() => setCodeError('')}
    />}
    {codeError && <HelperText type="error">{codeError}</HelperText> }

  {response && <Button mode="contained-tonal" onPress={handleVerifyCode}>{codeLoading ? <ActivityIndicator /> : 'Vérifier le code'}</Button> }

   { response  && <Snackbar visible={snackbar} duration={3000} onDismiss={() => setSnackbar(false)}
   action={{
    label: 'OK',
    onPress: () => {
      setSnackbar(false) ;
     
    },
  }}
   >{response.message}</Snackbar> }

   
{ codeResponse  && <Snackbar visible={codeSnackbar} duration={1000} onDismiss={() => setCodeSnackbar(false)}
   action={{
    label: 'OK',
    onPress: () => {
     setCodeSnackbar(false) ;
     navigateToReset() ;
    },
  }}
   >{codeResponse.message}</Snackbar> }

    </ScrollView>
    </ScrollView>
  )
}

export default ForgetPasswordScreen


const styles = StyleSheet.create({
  container : {
    paddingBottom : 50,
    width  : '80%',
    marginHorizontal : 'auto',
    marginTop : 30,
    gap : 30,
    flex : 1,
  
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
description : {
  fontSize : 17,
  color :colors.DarkGray,
  textAlign : 'center'
},
input : {

}
})