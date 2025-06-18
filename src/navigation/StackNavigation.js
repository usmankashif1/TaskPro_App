import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/auth/Login';
import SignUp from '../Screens/auth/SignUp';
import Home from '../Screens/Home';
import AddTask from '../Screens/AddTask';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        {showSplash ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTask}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
