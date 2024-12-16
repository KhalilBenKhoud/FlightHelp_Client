import {  Keyboard   } from "react-native"
import { useState , useEffect } from "react";

const useKeyboard = () => {
  
    const [keyboardVisible, setKeyboardStatus] = useState(false);

    const hideKeyboard = () => {
       Keyboard.dismiss() ;
    }

    
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardStatus(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);


    return { keyboardVisible , hideKeyboard } ;
}

export default useKeyboard