import { Image, StyleSheet, View ,Text} from "react-native"


const Header = () => {
  return (
    <View style={styles.container}>
         <View style={styles.logosContainer}>
        <Image source={require('../../assets/logo1.png')} style={styles.Flogo} />
        <Image source={require('../../assets/tunisairLogo.png')} style={styles.Tlogo}  />
        </View>
       
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  
    logosContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      padding : 5
    },
    Tlogo :  {
        width : '100%',
        maxWidth : 150,
        height : 100
    },
    Flogo :  {
        width : 100,
        maxWidth : 150,
        height : 100
    },
    title : {
        fontSize : 25,
        fontWeight : 'bold'
    }
})