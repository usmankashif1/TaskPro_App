import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import responsive from '../Components/Responsive';

const Splash = () => {
  return (
    <View style={styles.Contianer}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
   Contianer:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        height:responsive.height('30%'),
        width:responsive.width('45%'),
        resizeMode:'cover'
    }
   
})