/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from "./src/core/component/LoadingComponent";
import LoginScreen from "./src/features/presentation/ui/authentication/LoginScreen.tsx";
import RegisterScreen from './src/features/presentation/ui/authentication/RegisterScreen.tsx';
import LandingScreen from "./src/features/presentation/ui/LandingScreen.tsx";
import UserSettingsScreen from "./src/features/presentation/ui/user/UserSettingsScreen.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getToken = async () => {
    setIsLoading(true);
    try {
      const retrieveToken = await AsyncStorage.getItem('token');
      setToken(retrieveToken as string);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getToken();
  }, []);


  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingComponent opacity={1}/>
      </SafeAreaView>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={token === ""  || token === null ? "Landing" : "Home"}
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={UserSettingsScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;