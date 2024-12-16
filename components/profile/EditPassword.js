import {useState , useCallback} from 'react'
import { Text, View , StyleSheet ,ScrollView, ActivityIndicator } from 'react-native'
import { TextInput , Button  , HelperText ,Avatar} from 'react-native-paper';
import Animated , {  RollInLeft} from 'react-native-reanimated';

const EditPassword = (props) => {
    
    const [passwords,setPasswords] = useState({
        password : '',
        confirmPassword : ''
    })

    const [hidePassword,setHidePassword] = useState(true) ;
    const [hideConfirmPassword,setHideConfirmPassword] = useState(true) ;
    const [passwordsMismatch,setPasswordsMismatch] = useState(false) ;

    const fetch = props.fetchUpdate ;


    const handleUpdate = async() => {
        if(passwords.password !== passwords.confirmPassword) {
            setPasswordsMismatch(true)
            return ;
        }
        await fetch.fetchData({password : passwords.password})
        if(!fetch.error) {
            console.info('mot de passe mis à jour') ;
            props.hideModal() ;
        }

    }
  
    return (
 
        <ScrollView contentContainerStyle={styles.form}>
       { fetch.loading ? <ActivityIndicator style={{margin : 'auto'}} /> : <View style={styles.inputs}>
        
        
        <Animated.View entering={RollInLeft.springify()} >
        <View style={styles.titleContainer} >
         <Text style={styles.title}>modifiez vos informations ! </Text> 
        <Avatar.Icon size={28} icon='update' /></View>
       </Animated.View>
    
        <TextInput
        label="Nouveau mot de passe"
        secureTextEntry={hidePassword}
        right={<TextInput.Icon icon={!hidePassword ? 'eye' : 'eye-off'} onPress={() => setHidePassword(prev => !prev)} />} 
        value={passwords.password} onChangeText={(entered) => setPasswords(prev => {return {...prev,password : entered}})}
        
        />

       <TextInput
        label="Confirmer le mot de passe"
        secureTextEntry={hideConfirmPassword} 
        right={<TextInput.Icon icon={!hideConfirmPassword ? 'eye' : 'eye-off'} onPress={() => setHideConfirmPassword(prev => !prev)} />} 
        value={passwords.confirmPassword} onChangeText={(entered) => setPasswords(prev => {return {...prev,confirmPassword : entered}})} onKeyPress={() => setPasswordsMismatch(false)}  />
        
        {passwordsMismatch && <HelperText type='error'>Les mots de passes ne correspondent pas</HelperText> }

        </View>}

        <View style={styles.buttons}>
        <Button mode='contained' buttonColor='red' onPress={props.hideModal}>Annuler</Button>
        <Button mode='contained' buttonColor='green' onPress={handleUpdate}>Confirmer</Button>
     </View>


        </ScrollView>
   
  )
}

export default EditPassword


const styles = StyleSheet.create({
    
    form : {
    flex : 1,
    justifyContent : 'space-between'      
    },
    inputs : {
        gap : 30
    },
    titleContainer : {
       flexDirection : 'row',
       alignItems : 'center'
    },
    title : {
      fontWeight : 'bold',
      fontSize : 16
    },
     buttons : {
        flexDirection : 'row',
        gap : 15,
        alignSelf : 'flex-end',
        marginTop : 30
     }
})