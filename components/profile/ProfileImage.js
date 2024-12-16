import useFetch from "../../hooks/useFetch";
import {   useEffect, useState  } from "react";
import ReusableImage from "../../components/shared/ReusableImage";
import { Text,  Platform , TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { ActivityIndicator, Button , Snackbar } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";


const ProfileImage = (props) => {
  
    const {response : imageResponse , loading : imageLoading  , error : imageError , fetchData : fetchImage } = useFetch('get','user/profileImage') ;
    const {response : uploadResponse , loading : uploadLoading  , error : uploadError , fetchData : uploadImage } = useFetch('post','user/upload/profileImage') ;


    const [image, setImage] = useState(null);

    const [snackbar,setSnackbar] = useState(true)


    const createFormData = (photo) => {
      const data = new FormData();

      data.append('profile', {
        name: photo.fileName,
        type: photo.mimeType,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
           
      
        return data;
      };


      const handleChoosePhoto =  async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
      
    
        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      };

      const handleUpload = async () => {
        
        await uploadImage(createFormData(image),{
          'Content-Type': 'multipart/form-data'
        });
        await fetchImage() ;
        setSnackbar(true)

      }
    
   
       useEffect(() => {
                
            if(!imageLoading && image && image.uri) 
                handleUpload()
              
        },[image])


          useEffect(() => {
            fetchImage() ;
          },[])

          useEffect(() => {
             props.setUpdateBtn(false) ;
          },[imageResponse])

          const styles = StyleSheet.create({
            container : {
              flexDirection : 'row',
               justifyContent : 'center',
               padding : 30
            },
            imageContainer : {
              width : 200, 
              height : 200 ,
              borderRadius : 200,
              position : 'relative',
              borderWidth : 2,
              borderColor : 'black',
              justifyContent : 'center',
              alignItems : 'center'
            },
            image :{
              width : 200,
              height : 200 ,
              borderRadius : 200 ,
              opacity : props.updateBtn ? 0.5 : 1,
              overflow : 'hidden'
            },
            button : {
              position : 'absolute',
              textAlign : 'center',
              top : 125,
              left : 125,
              transform : [
                {translateX : -95},
                {translateY : -50}
              ]        
            },
          
        })  
        
  
    return (
      <>
   <TouchableOpacity style={styles.container} onPress={() => props.setUpdateBtn(false)} >
    <TouchableOpacity style={styles.imageContainer} onPress={() => props.setUpdateBtn(prev => !prev)} >
       { imageLoading ? <ActivityIndicator /> : 
       ( imageResponse?.image ?
       <ReusableImage uri={imageResponse?.image} style={styles.image}  /> : <Image source={require('../../assets/avatar.png')} style={styles.image}  />)}
{ props.updateBtn &&  <Button style={styles.button}  mode='elevated' onPress={handleChoosePhoto}>{uploadLoading ? <ActivityIndicator /> : 'choisir photo'}</Button> }   

 </TouchableOpacity>
</TouchableOpacity>
{uploadResponse && <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={1500}
        action={{
          label: 'Succès',
         
        }}
        style={{position : 'absolute' , bottom : 100, zIndex : 100}}
        >
        {uploadResponse?.message }
      </Snackbar> }

</>
  )

}
export default ProfileImage


