import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text , View } from "react-native"
import useFetch from "../../hooks/useFetch";
import OneTicket from "../../components/tickets/OneTicket";
import EditTicketForm from "../../components/tickets/EditTicketForm";
import CloseTicketDialog from "../../components/tickets/CloseTicketDialog";
import { Button } from "react-native-paper";
import AddFeedback from "../../components/feedback/AddFeedback";
import OneFeedback from "../../components/feedback/OneFeedback";

import { LogBox } from 'react-native';


const TicketDetailsScreen = () => {
  
  const route = useRoute() ;
 
  const {response , loading , fetchData , error} = useFetch('get',`/ticket/${route.params?._id}`) ;
  
  const [details,setDetails] = useState({}) ;

  const [editModal,setEditModal] = useState(false) ;

  const [closeDialog,setCloseDialog] = useState(false) ;

  const [feedbackModal,setFeedbackModal] = useState(false) ;

  useFocusEffect(useCallback(() => {
     fetchData() ;
  },[])) 

  useEffect(() => {
    if(response)
   setDetails(response?.ticket)
  
  },[response])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  return (
    <>
   <ScrollView contentContainerStyle={styles.container}>
      {loading ? <ActivityIndicator style={{margin : 'auto'}} /> : 
       <>
        <OneTicket {...details} details={true} showEditModal={() => setEditModal(true)} onUpdate={fetchData}  showCloseDialog={() => setCloseDialog(true)} />
       { details?.solution && <View style={styles.solutionContainer}>
          <Text style={styles.title}>Solution : (résolu à : {new Date(details.resolvedAt)?.toLocaleString()} )</Text>
          <Text>{details.solution}</Text>
          <Button mode="elevated" style={styles.feedbackBtn} onPress={() => setFeedbackModal(true)}>Ajouter un feedback</Button>
        </View> }
        {
          details?.feedbacks && 
          <SafeAreaView>
          <FlatList   data={details?.feedbacks}
            renderItem={(itemData) => <OneFeedback onUpdate={fetchData} {...itemData.item} />}
             keyExtractor={(item) => item._id}
             contentContainerStyle={{ gap : 15}}
          />
          </SafeAreaView>
        }
       </>
      }
   </ScrollView>
   {editModal && <EditTicketForm visible={editModal} hideModal={() => setEditModal(false)} {...details} onUpdate={fetchData} /> }
   {closeDialog && <CloseTicketDialog visible={closeDialog} hideDialog={() => setCloseDialog(false)} title={details.title} _id={details._id} onUpdate={fetchData}  />}
    {feedbackModal && <AddFeedback visible={feedbackModal} hideModal={() => setFeedbackModal(false)} _id={details._id}  onUpdate={fetchData} />}
   </>
  )
}

export default TicketDetailsScreen


const styles = StyleSheet.create({
  container : {
    padding : 20,
     gap : 30
  },
  solutionContainer : {
       padding : 15,
      borderRadius : 10,
      borderWidth : 1,
      backgroundColor : 'white',
      gap : 10
  },
  title : {
    fontWeight : 'bold'
  },
  feedbackBtn : {
    alignSelf: 'center'
  }

})