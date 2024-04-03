import React, { useEffect, useState } from 'react';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { TourGuideProvider } from 'rn-tourguide';
import { useTranslation } from "react-i18next";
import LoadingComponent from "./src/core/component/LoadingComponent";
import LoginScreen from "./src/features/presentation/ui/authentication/LoginScreen.tsx";
import RegisterScreen from './src/features/presentation/ui/authentication/RegisterScreen.tsx';
import LandingScreen from "./src/features/presentation/ui/LandingScreen.tsx";
import ForgotPasswordScreen from "./src/features/presentation/ui/authentication/ForgotPasswordScreen.tsx";
import UserBottomBarNavigation from "./src/core/navigation/UserBottomBarNavigation.tsx";
import "./src/core/i18n/config";
import UserSavedTripsScreen from "./src/features/presentation/ui/user/UserSavedTripsScreen.tsx";
import GetToken from "./src/core/utils/api/GetToken.tsx";
import Toast from 'react-native-toast-message';
import { addRandomNotification } from './src/core/utils/notifications/easyNotifications.tsx';

const Authentication = createNativeStackNavigator();

const App = () => {
  

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const { t } = useTranslation();
  const colorScheme = useColorScheme();



  const InitI18N = async () => {
    setIsLoading(true);

    try {
      const language = await AsyncStorage.getItem('language');
      if (language) {
        i18next.changeLanguage(language);
      }
    } catch (error) {
      console.error('Error while setting up i18n:', error);
      return null;
    }
    setIsLoading(false);
  }

  useEffect(() => {
    GetToken({setIsLoading, setToken});
    //addRandomNotification();
    InitI18N();
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
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Authentication.Navigator
            initialRouteName={token != null ? "UserTabs" : "Landing"}
            screenOptions={{
              headerShown: false
            }}
          >
            <Authentication.Screen name="UserTabs" component={UserBottomBarNavigation} />
            <Authentication.Screen name="Landing" component={LandingScreen} />
            <Authentication.Screen name="Login" component={LoginScreen} />
            <Authentication.Screen name="Register" component={RegisterScreen} />
            <Authentication.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </Authentication.Navigator>
        </NavigationContainer>
        <Toast />
      </TourGuideProvider>
    );
  }
}

const style = {
  borderRadius: 16,
}

export default App;
