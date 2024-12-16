import {  Text, View } from "react-native"
import {  useState  } from "react";
import {  Button, IconButton } from "react-native-paper";
import { List } from 'react-native-paper';
import AllTickets from "../../components/tickets/AllTickets";
import UserTickets from "../../components/tickets/UserTickets";
import { useNavigation } from "@react-navigation/native";


const AllTicketsScreen = () => {
  
   
  const [selected,setSelected] = useState('all') ;
  const [expanded,setExpanded] = useState(false) ;

  const navigation = useNavigation() ;

  return (
    <View style={{flex : 1, padding : 10}}>
      
      <Button style={{margin : 10}} icon='open-in-new' mode="contained" onPress={() => navigation.navigate('createTicket')}>Créer un ticket</Button>
        
        <List.Accordion
        title={<Text style={{fontWeight : 'bold'}}>Filtrer</Text>}
        left={props => <List.Icon {...props} icon='ticket' />} 
        expanded={expanded}
        onPress={() => setExpanded(prev => !prev)}
        >
        <List.Item 
         left={props => <List.Icon {...props} icon='all-inclusive' />} 
        title='Tous les tickets' onPress={() => { setSelected('all') ; setExpanded(false) ; }  }/>
        <List.Item  
        left={props => <List.Icon {...props} icon='account-box' />} 
        title='Mes tickets'
        onPress={() => {setSelected('mine') ; setExpanded(false) ;  } } />
      </List.Accordion>


       {selected === 'all' ? <AllTickets /> : <UserTickets />}
  
    </View>
  )
}

export default AllTicketsScreen