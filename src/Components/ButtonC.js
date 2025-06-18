import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {clr, FONTS, SIZES} from '../Constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconLibrary = {AntDesign, Entypo, FontAwesome5, EvilIcons, FontAwesome};

const ButtonC = ({
  height=45 || height ,
  width = '100%',
  backgroundColor = clr.bttonBg,
  flexDirection,
  onPress,
  title,
  color='#393a3b' || color,
  borderWidth,
  marginTop,
  borderColor,
  iconName,
  iconNameNext,
  iconFamily,
  size = 25,
  iconColor,
  left,
  fontSize,
  marginVertical,
  gap,
  fontWeight='bold' || fontWeight
}) => {
  const Icon = iconFamily ? IconLibrary[iconFamily] : null;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: height,
          width: width,
          backgroundColor: backgroundColor,
          flexDirection: flexDirection,
          borderWidth: borderWidth,
          marginTop: marginTop,
          borderColor: borderColor,
          marginVertical:marginVertical,
          gap:gap
        },
      ]}
      onPress={onPress}>
      {Icon && iconName && (
        <Icon name={iconName} size={size} color={iconColor} />
      )}

      <Text style={[SIZES.h1, {color: color,left:left,fontSize:fontSize,fontWeight:fontWeight}]}>{title}</Text>
      {Icon && iconNameNext && (
        <Icon name={iconNameNext} size={size} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonC;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
