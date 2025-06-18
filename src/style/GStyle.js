import { StyleSheet} from 'react-native'
import theme from './Constants';
import responsive from '../Components/Responsive';



const GStyle = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
    padding:responsive.padding(15)
},
logo: {
    height: responsive.height('20%'),
    width: responsive.width('35%'),
    resizeMode: 'cover',
  },
})

export default GStyle;
