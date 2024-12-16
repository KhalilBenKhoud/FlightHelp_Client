import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { useCallback,  useEffect,  useState } from "react"
import { ScrollView, Text , StyleSheet , View } from "react-native"
import Animated , {   RollInLeft} from 'react-native-reanimated';
import colors from "../../constants/colors";
import { TextInput , Button  , HelperText , Snackbar, ActivityIndicator} from 'react-native-paper';
import { resetPassword } from "../../services/auth.service";



const ResetPasswordScreen = () => {
  
  const route = useRoute() ;
  const navigation = useNavigation() ;

  const [resetCode,setResetCode] = useState('')
  
  const [hidePassword,setHidePassword] = useState(true) ;
  const [hideConfirmPassword,setHideConfirmPassword] = useState(true) ;

  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const [passwordsMismatch,setPasswordsMismatch] = useState(false)

  const [response,setResponse] = useState('')
  const [loading,setLoading] = useState(false) ;
  const [error,setError] = useState('') ;

  const [snackbar,setSnackbar] = useState(true)


 useFocusEffect(
  useCallback(() => {
    
   setResetCode(route?.params?.token)
  
 },[]))

 const handleSubmit = async () => {
     if(password !== confirmPassword) {
      setPasswordsMismatch(true) ;
      return ;
     }
    try {
      setLoading(true) ;
      setSnackbar(true) ;
     const response = await resetPassword(resetCode,password) ;
     const data = response.data ;
     setResponse(data) ;
     setTimeout(() => {
       navigation.navigate('Login')
     },1500)
    }catch(err) {
      setError(err?.response?.data) ;
    }finally {
      setLoading(false) ;
    }
 }

 
  return (
   <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container}>
    <View>
    <Text style={styles.title} >Réinitialiser votre mot de passe</Text>
     <Animated.Image entering={RollInLeft.springify()} source={require('../../assets/newPassword.png')} style={styles.illustration} />
     </View>
     
     <TextInput
        label="Mot de passe"
        mode="outlined"
        secureTextEntry={hidePassword}
        right={<TextInput.Icon icon={!hidePassword ? 'eye' : 'eye-off'} onPress={() => setHidePassword(prev => !prev)} />} 
        value={password} onChangeText={(entered) => setPassword(entered)}
        
        />
     
     
     <TextInput
        label="Confirmer Mot de passe"
        mode="outlined"
        secureTextEntry={hideConfirmPassword}
        right={<TextInput.Icon icon={!hideConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setHideConfirmPassword(prev => !prev)} />} 
        value={confirmPassword} onChangeText={(entered) => setConfirmPassword(entered)}
        onKeyPress={() => setPasswordsMismatch(false)}
      />

    { passwordsMismatch && <HelperText type="error">Les mots de passe ne correspondent pas !</HelperText> }
  
    <Button  mode="elevated" onPress={handleSubmit}>{ loading ? <ActivityIndicator /> : 'Confirmer'}</Button>
   { (response || error) && <Snackbar visible={snackbar} duration={1500} onDismiss={() => setSnackbar(false)}
   action={{
    label: 'OK',
    onPress: () => {
    
      setSnackbar(false) ;
      if(response)
      navigation.navigate('Login')
      
    },
  }}
   >{response?.message || error?.message}</Snackbar> }
   </ScrollView>
  )
}

export default ResetPasswordScreen


const styles = StyleSheet.create({
  container : {
    paddingVertical : 50,
    width  : '80%',
    marginHorizontal : 'auto',
   
    gap : 30,
    flex : 1,
    justifyContent : 'center'
  
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