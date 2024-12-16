import { StyleSheet, Text, View } from "react-native"
import { TextInput , Button  , HelperText ,Avatar} from 'react-native-paper';
import { useState , useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import Animated , {  RollInLeft} from 'react-native-reanimated';




const RegisterForm = (props) => {
  
    const [hidePassword,setHidePassword] = useState(true) ;
    const [hideConfirmPassword,setHideConfirmPassword] = useState(true) ;

    const [form,setForm] = useState({
       tunisairId: '',
        fullname : '' ,
        email : '',
        password : '',
        confirmPassword : ''
    })

    const [focusedInput,setFocusedInput] = useState({
       tunisairId: false,
        fullname : false ,
        email : false,
        password : false,
        confirmPassword : false
    }) ;
     
    const updateForm = useCallback((key,value) => {
      
        setForm( prev => {
            return {...prev, [key] : value}
        }
        )
    },[])

    const focusOrBlur = useCallback((operation,key)=> {
         if(operation === 'focus') {
             setFocusedInput(prev => {return {...prev, [key] : true}})
         }
         else {
            setFocusedInput(prev => {return {...prev, [key] : false}}) 
         }
    },[])

    const navigation = useNavigation() ;
  
    return (
    <View style={styles.form}> 
        
       
        <Text style={styles.title} >créez un compte !   <Avatar.Icon size={24} icon='account-plus-outline' />
        </Text>
       
        
       <TextInput label="Identifiant" value={form.tunisairId} onChangeText={(entered) => updateForm('tunisairId',entered)}/>
     
        <View>
       <TextInput label="Nom et prénom" value={form.fullname} onChangeText={(entered) => updateForm('fullname',entered)} onKeyPress={() => focusOrBlur('focus','fullname') } onBlur={() => focusOrBlur('blur','fullname')} />
       {focusedInput.fullname &&<HelperText type="error" visible={form.fullname.length < 6 || form.fullname.length > 35} >le Nom doit contenir entre 6 et 35 charactères !</HelperText>}
       </View>

       <View>
       <TextInput label="Email" value={form.email} onChangeText={(entered) => updateForm('email',entered)} onKeyPress={() => focusOrBlur('focus','email') } onBlur={() => focusOrBlur('blur','email')}/>
      { focusedInput.email && <HelperText type="error" visible={!form.email.includes('@') || !form.email.includes('.')  } >Email invalide !</HelperText>}
       </View>
      


       <TextInput
        label="Mot de passe"
        secureTextEntry={hidePassword}
        right={<TextInput.Icon icon={!hidePassword ? 'eye' : 'eye-off'} onPress={() => setHidePassword(prev => !prev)} />} 
        value={form.password} onChangeText={(entered) => updateForm('password',entered)}
        
        />
     
     <View>
     <TextInput
        label="Confirmer Mot de passe"
        secureTextEntry={hideConfirmPassword}
        right={<TextInput.Icon icon={!hideConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setHideConfirmPassword(prev => !prev)} />} 
        value={form.confirmPassword} onChangeText={(entered) => updateForm('confirmPassword',entered)}
        onKeyPress={() => focusOrBlur('focus','confirmPassword') } onBlur={() => focusOrBlur('blur','confirmPassword')}
        />
      { focusedInput.confirmPassword && <HelperText type="error" visible={form.confirmPassword !== form.password  } >ça ne correspond pas avec le mot de passe que vous avez saisi !</HelperText>}
       </View>

        <Button icon="account" mode="contained" onPress={() => props.onSubmit(form)}>
            S'inscrire
        </Button>
       
      
        <Animated.Text entering={RollInLeft.springify()} >
                    <HelperText style={styles.goToLogin} onPress={() => navigation.navigate('Login')}> Vous avez déjà un compte? <Text style={{color : colors.DeepViolet, }}>Connectez-vous</Text></HelperText>
        </Animated.Text> 
            
            
                
        
        </View>
  )
}

export default RegisterForm


const styles = StyleSheet.create({
    
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