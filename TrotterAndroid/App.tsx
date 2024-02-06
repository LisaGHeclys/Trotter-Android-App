import React, { useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "./src/core/component/LoadingComponent";
import LoginScreen from "./src/features/presentation/ui/authentication/LoginScreen.tsx";
import RegisterScreen from './src/features/presentation/ui/authentication/RegisterScreen.tsx';
import LandingScreen from "./src/features/presentation/ui/LandingScreen.tsx";
import UserSettingsScreen from "./src/features/presentation/ui/user/UserSettingsScreen.tsx";
import UserHomeScreen from "./src/features/presentation/ui/user/UserHomeScreen.tsx";
import { TourGuideProvider } from 'rn-tourguide';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import "./src/core/i18n/config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserHomeScreen}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMapLocationDot} size={25} />
            //need to put active and inactive colors
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserSettingsScreen}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faGear} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const InitI18N = async () => {
  const language = await AsyncStorage.getItem('language');
  if (language) {
    i18next.changeLanguage(language);
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { t } = useTranslation();
  //to define later with Justine

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

  InitI18N();

  useEffect(() => {
    if (!i18next.isInitialized)
      InitI18N();
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <LoadingComponent opacity={1} />
      </SafeAreaView>
    )
  } else {
    return (
      <TourGuideProvider androidStatusBarVisible={true} {...{ tooltipStyle: style } } {...{ labels: {previous: t("AppTour.Prev"), next: t("AppTour.Next"), skip: t("AppTour.Skip"), finish: t("AppTour.Done"),},}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={token != null ? "UserTabs" : "Landing"}
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="UserTabs" component={TabsNavigation} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TourGuideProvider>
    );
  }
}

const style = {
  borderRadius: 16,
}

export default App;