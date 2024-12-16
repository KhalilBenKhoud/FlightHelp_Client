import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTicketsScreen from './screens/tickets/AllTicketsScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import ProfileScreen from './screens/profile/ProfileScreen';
import useLogout from './hooks/useLogout';
import {Ionicons} from '@expo/vector-icons'
import colors from './constants/colors';
import ForgetPasswordScreen from './screens/auth/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';
import ChatbotScreen from './screens/chatbot/ChatbotScreen';
import Notifications from './components/shared/Notifications';
import { View } from 'react-native';
import CreateTicketScreen from './screens/tickets/CreateTicketScreen';
import NotificationsScreen from './screens/notifications/NotificationsScreen';
import { useEffect } from 'react';
import * as Notification from 'expo-notifications'
import TicketDetailsScreen from './screens/tickets/TicketDetailsScreen';
import AnalyticsScreen from './screens/admin/AnalyticsScreen';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

export default function App() {
  
  const Stack = createNativeStackNavigator() ;
  const BottomTab = createBottomTabNavigator() ;

  useEffect(() => {
    const subscription1 = Notification.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      
    });

    return () => {
      subscription1.remove();
      
    };
  },[])


const TicketsScreens = () => {
  return <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="allTickets" component={AllTicketsScreen} />
      <Stack.Screen name="createTicket" component={CreateTicketScreen} />
      <Stack.Screen name="ticketDetails" component={TicketDetailsScreen} />

  </Stack.Navigator>
}


  const PostLoginScreens = () => {
    
     const handleLogout = useLogout() ;

     const auth = useSelector(state => state.authState) ;


     const HeaderButtons = () => <View style={{flexDirection : 'row' , gap : 10}}>
        <Notifications />
       <Button mode='elevated' icon='logout' onPress={handleLogout}>Déconnexion</Button>
     
     </View>



    return (
      <>
      <BottomTab.Navigator screenOptions={{headerRight : () => <HeaderButtons />  , tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray'}}>  
      <BottomTab.Screen name="AllTickets"  component={TicketsScreens} 
       options={{tabBarIcon : () => <Ionicons name='ticket' size={30} color={colors.DarkViolet} />, title: 'Tickets'}} 
      />
        <BottomTab.Screen name="Chatbot" component={ChatbotScreen} 
      options={{tabBarIcon : () => <Ionicons name='chatbubble' size={30} color={colors.DarkViolet} />  }} />


      <BottomTab.Screen name="Profil" component={ProfileScreen} 
      options={{tabBarIcon : () => <Ionicons name='man' size={30} color={colors.DarkViolet} />}} />
       
       <BottomTab.Screen name="allNotifications" options={{title : 'Notifications' , tabBarButton : () => {} }} component={NotificationsScreen} />

       {auth.role === 'ADMIN' && <BottomTab.Screen name="Analytics"  component={AnalyticsScreen}
         options={{tabBarIcon : () => <Ionicons name='analytics' size={30} color={colors.DarkViolet} />}}
       /> }

    </BottomTab.Navigator>
    </>
    )
  }


  const Screens = () => {
      
    const auth = useSelector(state => state.authState) ;

    return <>
      <Stack.Navigator >
      {   !auth.authenticated &&
         <>
        <Stack.Screen name="Login" component={LoginScreen} options={{title : "S'authentifier"}} />
        <Stack.Screen name="Register" component={RegisterScreen}  options={{title : "S'inscrire"}} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}  options={{title : "réinitialiser le mot de passe"}} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}  options={{title : "nouveau mot de passe"}} />


        </> }
        
        { auth.authenticated && <Stack.Screen name="PostLogin" component={PostLoginScreens} options={{headerShown : false}} />}
        </Stack.Navigator>   
    </>
  }


  
  return (
    <>
     <StatusBar style='auto'/>
       <Provider store={store} >
      <PaperProvider>
       <NavigationContainer>
        <Screens />
      </NavigationContainer>
      </PaperProvider>
      </Provider>
    </>
  );
}


