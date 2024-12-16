import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, SegmentedButtons ,Banner , Snackbar} from 'react-native-paper';
import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import useFetch from '../../hooks/useFetch';
import {Ionicons} from '@expo/vector-icons'



const EditProfile = (props) => {
    const [value,setValue] = useState('information') ;


    const {response , error , fetchData ,loading} = useFetch('put','user/current/update') ;

    const [banner,setBanner] = useState({
      visible : false ,
      message : ''
    }) ;

    useEffect(() => {
        if(error)
        setBanner({visible : true, message : error?.response?.status === 400 ? 'erreur de saisie !' : "erreur d'envoi !"})
    },[error])


    const styles = StyleSheet.create({
      modal : {
         
          backgroundColor : 'white',
          borderRadius : 25,
          padding : 25,
          height : banner.visible ? '90%' : '70%',
          width : '90%',
         margin : 'auto',
         justifyContent : 'flex-start',
         gap : 30
      },
      segmented : {
          
      }
  })



  return (
    
    <Portal >
   
    <Modal visible={true} onDismiss={props.hideModal} contentContainerStyle={styles.modal} >

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

    <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segmented}
        buttons={[
          {
            value: 'information',
            label: 'informations',
            icon : 'information'
          },
          {
            value: 'password',
            label: 'mot de passe',
            icon : 'form-textbox-password'
          }
        ]}
      />
       { value === 'information' ? <EditInfo profile={props.profile} hideModal={props.hideModal} fetchUpdate={{fetchData,loading,error}} /> : <EditPassword hideModal={props.hideModal}   fetchUpdate={{fetchData,loading,error}} /> }

  

    </Modal>
  </Portal>
  
  )
}

export default EditProfile




