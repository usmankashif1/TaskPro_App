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

const SignUp = ({ navigation }) => {
  const Images = [
    { img: require('../../assets/images/Facebook.png') },
    { img: require('../../assets/images/Google.png') },
    { img: require('../../assets/images/LinkedIn.png') },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, Password)
      .then(() => {
        Alert.alert('Account', 'User account created');
        navigation.navigate('Login')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Account', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Account', 'That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          GStyle.container,
          {
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={GStyle.logo}
          source={require('../../assets/images/logo.png')}
        />
        <View style={styles.welcomeContainer}>
          <Text style={styles.heading}>Welcome</Text>
          <Text style={styles.subHeading}>Create your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <InputC
            placeholder="Name"
            value={name}
            onChangeText={setName}
            backgroundColor="white"
            borderColor="black"
            placeholderTextColor="black"
          />
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
            value={Password}
            onChangeText={setPassword}
            backgroundColor="white"
            borderColor="black"
            placeholderTextColor="black"
          />
        </View>

        <ButtonC
          title={'Sign Up'}
          color="white"
          fontSize={responsive.fontSize(14)}
          onPress={createUser}
        />

        <TouchableOpacity>
          <Text style={[styles.subHeading, styles.forgotPassword]}>
            _______________________{'   '}or{'   '}_______________________
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
          <Text style={styles.subHeading}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.subHeading, { color: '#606060' }]}>
              {'  '}Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
    gap: 20,
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
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
