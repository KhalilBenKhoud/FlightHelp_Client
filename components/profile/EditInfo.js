import {useState , useCallback} from 'react'
import { Text, View , StyleSheet ,ScrollView, ActivityIndicator } from 'react-native'
import { TextInput , Button  , HelperText ,Avatar} from 'react-native-paper';
import Animated , {  RollInLeft} from 'react-native-reanimated';


const EditInfo = (props) => {
 
 
    const [form,setForm] = useState({
        tunisairId : props.profile.tunisairId,
        fullname : props.profile.fullname ,
        email : props.profile.email,
    })

    const updateForm = useCallback((key,value) => {
      
        setForm( prev => {
            return {...prev, [key] : value}
        }
        )
    },[])
   
    const fetch = props.fetchUpdate ;

    const handleUpdate = async () => {
       await fetch.fetchData(form) ;
       if(!fetch.error) props.hideModal() ;
    }
 
    return (
   <ScrollView contentContainerStyle={styles.form}>
   { fetch.loading ? <ActivityIndicator style={{margin : 'auto'}} />  : <View style={styles.inputs}>
    <Animated.View entering={RollInLeft.springify()} >
    <View style={styles.titleContainer} >
         <Text style={styles.title}>modifiez vos informations ! </Text> 
        <Avatar.Icon size={28} icon='update' /></View>
    </Animated.View>
    
    <TextInput label="Identifiant" value={form.tunisairId} onChangeText={(entered) => updateForm('tunisairId',entered)}/>

    <TextInput label="Nom et prénom" value={form.fullname} onChangeText={(entered) => updateForm('fullname',entered)} />

    <TextInput label="Email" value={form.email} onChangeText={(entered) => updateForm('email',entered)} />
    </View>
}


     <View style={styles.buttons}>
        <Button mode='contained' buttonColor='red' onPress={props.hideModal}>Annuler</Button>
        <Button mode='contained' buttonColor='green' onPress={handleUpdate}>Confirmer</Button>
     </View>
   </ScrollView>
  )
}

export default EditInfo


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
        alignSelf : 'flex-end'
     }
})
