import {  StyleSheet, Text, TouchableOpacity, ScrollView, View, ActivityIndicator } from "react-native"
import useFetch from "../../hooks/useFetch";
import { useState, useEffect  } from "react";
import ProfileImage from "../../components/profile/ProfileImage";
import colors from "../../constants/colors";
import { Avatar, Button, Card, IconButton } from 'react-native-paper';
import EditProfile from "../../components/profile/EditProfile";



const ProfileScreen = () => {
  
   const {response , loading  , error , fetchData } = useFetch('get','user/current') ;

   const [showUpdateButton,setShowUpdateButton] = useState(false) ;

   const [profile,setProfile] = useState({}) ;

   const [editModal,setEditModal] = useState(false) ;
   
  useEffect(() => {
    
   fetchData() ;
 
  },[editModal])

  useEffect(() => {
    setProfile(response?.profile || {}) ;
  },[response])


  return (
   
    <ScrollView onPress={() => setShowUpdateButton(false)}>
     

       <ProfileImage updateBtn={showUpdateButton} setUpdateBtn={setShowUpdateButton} />
        <View style={styles.infoContainer}>
       <Text style={styles.name} >{profile?.fullname}</Text> 
       <Text style={styles.openTickets} >{profile?.openTickets} tickets ouverts</Text> 

       <Card.Title style={{backgroundColor : 'whitesmoke' , borderRadius : 20, margin :10}}
    title={<Text style={{fontWeight : 'bold'}}>Email :</Text>}
    subtitle={loading ? <ActivityIndicator /> : profile?.email}
    left={() => <Avatar.Icon style={{transform : [{scale : 0.5}] }}  icon="email" />}
    //right={(props) => <IconButton  icon="dots-vertical" onPress={() => {}} />}
  />

<Card.Title style={{backgroundColor : 'whitesmoke' , borderRadius : 20, margin :10}}
    title={<Text style={{fontWeight : 'bold'}}>Identifiant Tunisair :</Text>}
    subtitle={loading ? <ActivityIndicator /> : profile?.tunisairId}
    left={() => <Avatar.Icon style={{transform : [{scale : 0.5}] }}  icon='identifier' />}
  />


<Card.Title style={{backgroundColor : 'whitesmoke' , borderRadius : 20, margin :10}}
    title={<Text style={{fontWeight : 'bold'}}>Crée à :</Text>}
    subtitle={ loading ? <ActivityIndicator /> : new Date(profile?.createdAt).toString()}
    left={() => <Avatar.Icon style={{transform : [{scale : 0.5}] }}  icon='creation' />}
  />

<Card.Title style={{backgroundColor : 'whitesmoke' , borderRadius : 20, margin :10}}
    title={<Text style={{fontWeight : 'bold'}}>Mis à jour à :</Text>}
    subtitle={ loading ? <ActivityIndicator /> : new Date(profile?.updatedAt).toString()}
    left={() => <Avatar.Icon style={{transform : [{scale : 0.5}] }}  icon='update' />}
  />

        <Button icon='information' mode='outlined' style={styles.editButton} onPress={() => setEditModal(true)}>Modifier</Button>
       </View>
      { editModal && <EditProfile profile={profile} hideModal={() => setEditModal(false)} /> }
    </ScrollView>
    
  )
}

export default ProfileScreen


const styles = StyleSheet.create({
    name : {
      fontWeight : 'bold',
      fontSize : 25,
      color : 'midnightblue',
      textAlign : 'center',
      textDecorationLine : 'underline'
    },
    openTickets : {
       color : '#9e9148',
       textAlign : 'center',
       fontWeight : 'bold',
      fontSize : 18,
      marginBottom : 30
    },
    infoContainer  : {
      backgroundColor : colors.Lavender,
      width : '85%',
      margin : 'auto',
      borderRadius : 25, 
      marginBottom : 25
    },
    editButton : {
       alignSelf : 'flex-end',
       margin : 10
    }
})