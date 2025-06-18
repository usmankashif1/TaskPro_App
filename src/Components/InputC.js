import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {clr, FONTS} from '../Constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconLibrary = {
  AntDesign,
  Entypo,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
  Feather,
  Ionicons,
  MaterialCommunityIcons
};

const InputC = ({
  iconFamily,
  iconName,
  iconNextName,
  iconColor = clr.Text2,
  backgroundColor = backgroundColor,
  width = '100%',
  height = 52,
  radius = 10,
  borderColor = '#d7d7d7',
  borderWidth = 1 || borderWidth,
  placeholder = 'Enter Name',
  placeholderTextColor = clr.Text2,
  value,
  onChangeText,
  isPassword = false,
  size = 25,
  marginTop,
  keyboardType,
  marginVertical,
  fontSize = 12,
  editable,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderRightWidth,
  multiline,
  alignItems,
  justifyContent,
  onSubmitEditing
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const Icon = iconFamily ? IconLibrary[iconFamily] : null;

  return (
    <View
      style={{
        backgroundColor,
        width,
        height,
        borderRadius: radius,
        flexDirection: 'row',
        alignItems: 'center' || alignItems,
        justifyContent:justifyContent,
        borderWidth: borderWidth,
        borderColor,
        paddingHorizontal: 10,
        marginTop: marginTop,
        marginVertical: marginVertical,
        borderTopRightRadius:borderTopRightRadius,
        borderBottomRightRadius:borderBottomRightRadius,
        borderBottomLeftRadius:borderBottomLeftRadius,
        borderTopLeftRadius:borderTopLeftRadius,
        borderRightWidth:borderRightWidth,
        
      }}>
      {Icon && iconName && (
        <Icon name={iconName} size={size} color={iconColor} />
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[FONTS.h4, styles.input, {fontSize: fontSize}]}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <FontAwesome5
            name={secureTextEntry ? 'eye-slash' : 'eye'}
            size={20}
            color={clr.Text2}
          />
        </TouchableOpacity>
      )}
      {Icon && iconNextName && (
        <Icon name={iconNextName} size={size} color={iconColor} />
      )}
    </View>
  );
};

export default InputC;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: 'black',
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#FFFFF ',
  },
});
