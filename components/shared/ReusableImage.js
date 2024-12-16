import { Image } from "react-native"
import { Buffer } from 'buffer';


const ReusableImage = (props) => {
  return (
    <Image source={{uri :  `data:image/jpeg;base64,${props.uri || ''}` }}  style={props.style} />
  )
}

export default ReusableImage