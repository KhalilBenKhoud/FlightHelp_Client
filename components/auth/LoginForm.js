import {   StyleSheet, Text, View  } from "react-native"
import { TextInput , Button , Chip , HelperText} from 'react-native-paper';
import { useState , useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import Animated , {   RollInLeft} from 'react-native-reanimated';
import useKeyboard from "../../hooks/useKeyboard";

const LoginForm = (props) => {
  
    const [hidePassword,setHidePassword] = useState(true) ;
    

    const [email,setEmail] = useState('') ;

    const [emailFocused,setEmailFocused] = useState(false)

    const [password,setPassword] = useState('') ;

    const navigation = useNavigation() ;

    const { keyboardVisible } = useKeyboard() ;


  
    const emailIsValid = () =>  emailFocused && (!email.includes('@') || !email.includes('.'))  ;
    
    const submit = () => props.onSubmit({email,password}) ;

    return (
    <View style={styles.form} > 
        
    <View>
    <Text style={styles.title} >FlightHelp à votre service</Text>
  
   { !keyboardVisible &&  
   <Animated.Image entering={RollInLeft.springify()} source={require('../../assets/login-helpdesk.gif')} style={styles.illustration} />
   
  
   }
    </View>
    
    <View>
   <TextInput label="Email" onChangeText={(entered) => setEmail(entered)} value={email} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}  />
    {emailFocused && <HelperText type="error" visible={emailIsValid()} >Email invalide</HelperText>}
   </View>

  
   <TextInput
    label="Mot de passe"
    secureTextEntry={hidePassword}
    right={<TextInput.Icon icon={!hidePassword ? 'eye' : 'eye-off'} onPress={() => setHidePassword(prev => !prev)} />}
    onChangeText={(enterd) => setPassword(enterd)} value={password}
    />
 
    
   
    <Button icon="account" mode="contained" onPress={submit}>
        S'authentifier
    </Button>
  
    <Animated.Text entering={RollInLeft.springify()} >
        <HelperText style={styles.goToRegister} onPress={() => navigation.navigate('Register')}> Vous n'avez pas de compte? <Text style={{color : colors.DeepViolet, }}>Inscrivez-vous</Text></HelperText>
    </Animated.Text> 

    
    <Animated.Text entering={RollInLeft.springify()} >
        <HelperText style={styles.goToRegister} onPress={() => navigation.navigate('ForgetPassword')}> Vous avez oublié votre mot de passe? <Text style={{color : colors.DeepViolet, }}>réinitialisez-le</Text></HelperText>
    </Animated.Text> 
        
    
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
   
    form : {
       marginHorizontal : 'auto',
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
 
    goToRegister : {
     color : colors.DarkGray,
      fontWeight : 'bold'
    }
  
})