import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import {textStyle} from "../../../../core/utils/GlobalStyle.tsx";
import {emailRegex} from "../../../../core/utils/RegexUtils.ts";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import TrotterLogo from "../../../../core/assets/TrotterLogo.tsx";
import AuthenticationRepositoryImpl from "../../../data/AuthenticationRepositoryImpl.tsx";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import DividerComponent from "../../../../core/component/DividerComponent.tsx";
import OAuthComponent from "./OAuthComponentList.tsx";
import { useTranslation } from "react-i18next";

const LoginScreen = ({navigation}: any) => {
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
              console.log(resToJSON?.accessToken);
              await AsyncStorage.setItem("token", resToJSON?.accessToken)
              navigation.navigate("UserTabs");
            } else {
              throw new Error(resToJSON?.Message || 'Unknown error.');
            }
          } catch (jsonError) {
            setError(true);
          }
        },
        onFailure: (error) => {
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
      <View style={authenticationStyle.container}>
        <Text
          style={authenticationStyle.pageTitle}
          onPress={() => {ChangeScreen({navigation, destination: "Register", functionsToClear: [setEmail, setPassword]})}}
        >
          {t("Register.SignUp")}
        </Text>
        <TrotterLogo />
        <Text style={textStyle.title}>
          {t("Login.WelcomeBack")}
        </Text>
        <InputComponent value={email} placeholder={t("Email")} setValue={setEmail}/>
        <InputComponent
          value={password}
          placeholder={t("Password")}
          setValue={setPassword}
          pwd
        />
        <View style={authenticationStyle.underContainer}>
          {error && (
            <View style={authenticationStyle.errorContainer}>
              <FontAwesomeIcon icon={faCircleExclamation} color={"red"}/>
              <Text style={authenticationStyle.errorText}>
                {t("Login.NotFound")}
              </Text>
            </View>
          )}
          {/*<Text style={authenticationStyle.forgotPasswordText}>
               {t("Login.ForgotPassword")}
             </Text>*/}
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