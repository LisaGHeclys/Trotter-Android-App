import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  useColorScheme
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import {textStyle} from "../../../../core/utils/style/GlobalStyle.tsx";
import {emailRegex} from "../../../../core/utils/RegexUtils.ts";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import TrotterLogo from "../../../../core/assets/TrotterLogo.tsx";
import AuthenticationRepositoryImpl from "../../../data/AuthenticationRepositoryImpl.tsx";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import DividerComponent from "../../../../core/component/DividerComponent.tsx";
import OAuthComponent from "./OAuthComponentList.tsx";
import { useTranslation } from "react-i18next";
import Toaster from "../../../../core/utils/toaster/Toaster.tsx";

const LoginScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {t} = useTranslation();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await AuthenticationRepositoryImpl.login(email, password, {
        onSuccess: async (response) => {
          try {
            const resToJSON = await response.json();
            if (response.ok) {
              await AsyncStorage.setItem("token", resToJSON?.accessToken)
              await AsyncStorage.setItem("isTourGuideDone", 'true')
              navigation.navigate("UserTabs");
              Toaster({type: 'success', title: t("Login.WelcomeBack")});
            } else {
              throw new Error(resToJSON?.Message || 'Unknown error.');
            }
          } catch (jsonError) {
            setError(true);
          }
        },
        onFailure: (error) => {
          Toaster({type: 'error', title: "Login.LoginFailed", text: t("Login.LoginFailedText")});
          console.error('Login failed. Error:', error);
        },
      });
    } catch (error) {
      console.error('Unexpected error during login:', error);
    } finally {
      setError(false);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={authenticationStyle({isDarkMode}).container}>
        <Text
          style={authenticationStyle({isDarkMode}).pageTitle}
          onPress={() => {ChangeScreen({navigation, destination: "Register", functionsToClear: [setEmail, setPassword]})}}
        >
          {t("Register.SignUp")}
        </Text>
        <TrotterLogo />
        <Text style={textStyle({isDarkMode}).title}>
          {t("Login.WelcomeBack")}
        </Text>
        <InputComponent value={email} placeholder={t("Email")} setValue={setEmail}/>
        <InputComponent
          value={password}
          placeholder={t("Password")}
          setValue={setPassword}
          pwd
        />
        <View style={authenticationStyle({isDarkMode}).underContainer}>
          {error && (
            <View style={authenticationStyle({isDarkMode}).errorContainer}>
              <FontAwesomeIcon icon={faCircleExclamation} color={"red"}/>
              <Text
                style={authenticationStyle({isDarkMode}).errorText}
                onPress={() => {ChangeScreen({navigation, destination: "ForgotPassword", functionsToClear: [setEmail, setPassword]})}}
              >
                {t("Login.NotFound")}
              </Text>
            </View>
          )}
          <Text style={authenticationStyle({isDarkMode}).forgotPasswordText}>
            {t("Login.ForgotPassword")}
          </Text>
        </View>
        <ButtonComponent title={t("Login.LogIn")} onPress={handleLogin} disabled={!emailRegex.test(email) || password === ""} />
        <DividerComponent text={t("OrWith")}/>
        <OAuthComponent setIsLoading={setIsLoading}/>
      </View>
      {isLoading && <LoadingComponent/>}
    </ScrollView>
  )
}

export default LoginScreen;