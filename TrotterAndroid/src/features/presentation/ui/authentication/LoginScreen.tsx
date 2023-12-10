import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import {textStyle} from "../../../../core/utils/GlobalStyle.tsx";
import {emailRegex} from "../../../../core/utils/RegexUtils.ts";
import TrotterLogo from "../../../../core/assets/TrotterLogo.tsx";
import AuthenticationRepositoryImpl from "../../../data/AuthenticationRepositoryImpl.tsx";
import {authenticationStyle} from "./AuthenticationStyle.tsx";

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await AuthenticationRepositoryImpl.login(email, password, {
        onSuccess: async (response) => {
          try {
            const resToJSON = await response.json();
            if (response.ok) {
              await AsyncStorage.setItem("token", resToJSON.accessToken)
              navigation.navigate("Home");
            } else {
              throw new Error(resToJSON?.Message || 'Unknown error');
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={authenticationStyle.container}>
        <Text style={authenticationStyle.pageTitle}>
          Sign Up
        </Text>
        <TrotterLogo />
        <Text style={textStyle.title}>
          Welcome back !
        </Text>
        <InputComponent value={email} placeholder={"Email"} setValue={setEmail}/>
        <InputComponent value={password} placeholder={"Password"} setValue={setPassword} pwd/>
        <View style={authenticationStyle.underContainer}>
          {error && (
            <View style={authenticationStyle.errorContainer}>
              <FontAwesomeIcon icon={faCircleExclamation} color={"red"}/>
              <Text style={authenticationStyle.errorText}>
                Couldn't find your Trotter Account
              </Text>
            </View>
          )}
          {/*<Text style={authenticationStyle.forgotPasswordText}>
            Forgot Password ?
          </Text>*/}
        </View>
        <ButtonComponent title={"Log In"} onPress={handleLogin} disabled={!emailRegex.test(email)} />
      </View>
      {isLoading && <LoadingComponent/>}
    </>
  )
}

export default LoginScreen;