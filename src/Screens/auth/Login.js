import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { clr, SIZES } from '../../Constants/theme';
import GStyle from '../../style/GStyle';
import responsive from '../../Components/Responsive';
import InputC from '../../Components/InputC';
import ButtonC from '../../Components/ButtonC';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginEmail, setLoginEmail] = useState();
  // const [loginPassword, setLoginPassword] = useState();

  const Images = [
    { img: require('../../assets/images/Facebook.png') },
    { img: require('../../assets/images/Google.png') },
    { img: require('../../assets/images/LinkedIn.png') },
  ];

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Validation Error", "Please enter both email and password");
    return;
  }

  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    Alert.alert("Login Successful", "Welcome back!");
    navigation.navigate('Home')
  } catch (error) {
    console.error("Firebase Login Error:", error.message);
    Alert.alert('Login Failed', error.message);
  }
};

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          GStyle.container,
          {
            justifyContent: 'space-evenly',
            alignItems: 'center',
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={GStyle.logo}
          source={require('../../assets/images/logo.png')}
        />
        <View style={{gap:5}}>
          <Text style={styles.heading}>Welcome back!</Text>
          <Text style={styles.subHeading}>Login to your account</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputC
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            backgroundColor="white"
            borderColor="black"
            placeholderTextColor="black"
          />
          <InputC
            placeholder="Password"
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            backgroundColor="white"
            borderColor="black"
            placeholderTextColor="black"
          />
        </View>

        <ButtonC
          title={'Login'}
          color="white"
          fontSize={responsive.fontSize(14)}
          onPress={handleLogin}
        />
        <TouchableOpacity>
          <Text style={[styles.subHeading, styles.forgotPassword]}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <View style={styles.socialRow}>
          {Images.map((item, index) => (
            <TouchableOpacity key={index} style={styles.socialIconWrapper}>
              <Image source={item.img} style={styles.SocialIcons} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.signUpText}>
          <Text style={styles.subHeading}>Don’t have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.subHeading, { color: '#606060' }]}>
              {'  '}Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  
  
  heading: {
    fontSize: SIZES.h1,
    fontWeight: '600',
  },
  subHeading: {
    fontSize: SIZES.h3,
    color: clr.Text2,
    textAlign: 'center',
    marginBottom: responsive.margin(10),
  },
  inputContainer: {
    width: '100%',
    gap: responsive.margin(20),
    marginVertical: responsive.margin(20),
  },
  forgotPassword: {
    color: '#706e6e',
    marginVertical: responsive.margin(20),
  },
  SocialIcons: {
    height: responsive.height(50),
    width: responsive.width(50),
    resizeMode: 'contain',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: responsive.margin(20),
  },
  socialIconWrapper: {
    padding: 5,
  },
  signUpText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
