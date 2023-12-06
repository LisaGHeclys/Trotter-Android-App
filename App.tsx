/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoadingComponent from "./src/core/component/LoadingComponent";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/features/presentation/ui/authentication/Login";

const Stack = createNativeStackNavigator();

const App = () => {
  let token: string | null = "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getToken = async () => {
    token = await AsyncStorage.getItem("token");
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingComponent/>
      </SafeAreaView>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
