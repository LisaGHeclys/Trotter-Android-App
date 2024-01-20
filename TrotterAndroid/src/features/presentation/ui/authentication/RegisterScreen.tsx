import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
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

const RegisterScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const headerHeight = useHeaderHeight();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      setIsLoading(true);
      try {
        await AuthenticationRepositoryImpl.register(email, password, {
          onSuccess: async (response) => {
            try {
              const resToJSON = await response.json();
              if (response.ok) {
                await AsyncStorage.setItem("token", resToJSON?.accessToken)
                navigation.navigate("UserTabs");
              } else {
                throw new Error(resToJSON?.Message || 'Unknown error.');
              }
            } catch (jsonError) {
              console.error('JSON parse failed. Error:', jsonError);
            }
          },
          onFailure: (error) => {
            console.error('Register failed. Error:', error);
          },
        });
      } catch (error) {
        console.error('Unexpected error during sign up:', error);
      } finally {
        setError(false);
        setIsLoading(false);
      }
    } else {
      setError(true);
    }
  }

  return (
    <ScrollView>
      <View style={authenticationStyle.container}>
        <Text
          style={authenticationStyle.pageTitle}
          onPress={() => {ChangeScreen({navigation, destination: "Login", functionsToClear: [setEmail, setPassword, setConfirmPassword]})}}
        >
          Log In
        </Text>
        <TrotterLogo />
        <Text style={textStyle.title}>
          Create a new account !
        </Text>
        <InputComponent value={email} placeholder={"Email"} setValue={setEmail}/>
        <InputComponent value={password} placeholder={"Password"} setValue={setPassword} pwd/>
        <InputComponent value={confirmPassword} placeholder={"Confirm Password"} setValue={setConfirmPassword} pwd/>
        <View style={authenticationStyle.underContainer}>
          {error && (
            <View style={authenticationStyle.errorContainer}>
              <FontAwesomeIcon icon={faCircleExclamation} color={"red"}/>
              <Text style={authenticationStyle.errorText}>
                The passwords doesn't match.
              </Text>
            </View>
          )}
        </View>
        <ButtonComponent title={"Sign Up"} onPress={handleRegister} disabled={!emailRegex.test(email) || password === "" || confirmPassword === ""} />
        <DividerComponent text={"Or With"}/>
        <OAuthComponent setIsLoading={setIsLoading}/>
      </View>
      {isLoading && <LoadingComponent/>}
    </ScrollView>
  )
}

export default RegisterScreen;