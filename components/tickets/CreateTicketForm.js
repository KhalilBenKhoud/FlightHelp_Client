import { ActivityIndicator, ScrollView, StyleSheet , Text, View } from "react-native"
import { TextInput , SegmentedButtons , Searchbar , Button} from "react-native-paper"
import { useCallback , useEffect, useRef, useState} from "react"
import useFetch from "../../hooks/useFetch";
import useKeyboard from "../../hooks/useKeyboard";
import * as ImagePicker from 'expo-image-picker';


const CreateTicketForm = (props) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [usersToTag,setUsersToTag] = useState([]) ;

    const {hideKeyboard} = useKeyboard()

  

    const {response , loading , error , fetchData} = useFetch('post','ticket/search/users') ;

  
    const [form,setForm] = useState({
         title: '',
         description : '' ,
         priority : '',
         taggedUsers : [],
         image : ''
      })



      const updateForm = useCallback((key,value) => {
      
        setForm( prev => {
            return {...prev, [key] : value}
        }
        )
    },[])

    const handleSearch = async (entered) => {
        setSearchQuery(entered) ;
        if(entered.length > 4) {
          const regex = `.*${entered}.*`;  
          await fetchData({query : regex}) ;
          if(response) setUsersToTag(response?.users) ;
          else setUsersToTag([]) ;
          hideKeyboard() ;
        }
        else {
          setUsersToTag([]) ;
        }
    }

   

    const pickImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });

      if (!result.canceled) {
       console.log(result.assets[0]); // Store the selected image
       updateForm('image',result.assets[0]) ;
      }
  };

    
 

  

    return (
     <ScrollView contentContainerStyle={styles.form} >
    <Text style={styles.title} >Créer un ticket :</Text>
     <TextInput label='titre' onChangeText={entered => updateForm('title',entered)}/>
     <TextInput label='description' multiline={true} onChangeText={entered => updateForm('description',entered)}/>
     <Text style={styles.label}>Priorité</Text>
     <View style={{gap : 10}}>

     <SegmentedButtons
        value={form.priority}
        onValueChange={(entered) => updateForm('priority',entered)}
        buttons={[
          {
            value: 'low',
            label: 'low',
          },
          {
            value: 'medium',
            label: 'medium',
          }
        ]}
      />
     <SegmentedButtons
        value={form.priority}
        onValueChange={(entered) => updateForm('priority',entered)}
        buttons={[
          { 
            value: 'high',
            label: 'high'
         },
         {
             value: 'critical',
            label: 'critical'
         }
        ]}
      />
      </View>
      <Button mode="contained-tonal" icon='camera' onPress={pickImage}>{form.image ? 'prise, changer ?' :'Attacher une image'}</Button>
      <Text style={styles.label}>Administratifs concernés</Text>
     
      {form.taggedUsers?.length > 0 
  ? form.taggedUsers?.map(e => {return {_id : e._id , email : e.email}}).map((tagged, index) => (
      <Button
        style={styles.tagged}
        key={tagged._id}
        mode='contained'
        onPress={() => {
          setForm(prev => ({
            ...prev,
            taggedUsers: prev.taggedUsers?.filter(e => e._id !== tagged._id),
          }));
          setUsersToTag(prev => [...prev, tagged]);
        }}
      >
        {tagged?.email || "Unknown Email"}
      </Button>
    )) 
  : <Button style={styles.tagged} mode='contained'>Aucun</Button>}
      
      {/* submit button */}
      {/*  */}
      <Button buttonColor="#0c770c" textColor="white" onPress={() => {console.log(form) ; props.handleSubmit(form) }}>Créer</Button> 


    <Searchbar
      placeholder="rechercher les autres"
      onChangeText={handleSearch}
      value={searchQuery}
    />
   <Text>(Non séléctionnés)</Text>
   {loading && <ActivityIndicator /> }
{  usersToTag?.map((tagged,index) => <Button style={styles.tagged} key={tagged._id} mode='elevated' 
onPress={() =>
 { updateForm('taggedUsers',[...form.taggedUsers, {_id : tagged._id, email : tagged.email}]) ; usersToTag.splice(index,1) ;} } >
  {tagged?.email}</Button>) } 

     </ScrollView>
  )
}

export default CreateTicketForm

const styles = StyleSheet.create({
  form : {
    marginHorizontal : 'auto',
    width : '80%',
    gap : 30,
    paddingBottom : 30
  },
  title : {
    fontSize : 25,
    fontWeight : 'bold',
    textAlign : 'center'
 },
 label : {
    fontWeight : 'bold',
 },
 tagged : {
  alignSelf : 'flex-start'
}

})