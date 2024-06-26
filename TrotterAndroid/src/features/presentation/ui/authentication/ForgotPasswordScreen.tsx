import {ScrollView, Text, useColorScheme, View} from "react-native";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import {emailRegex} from "../../../../core/utils/RegexUtils.ts";
import TrotterLogo from "../../../../core/assets/TrotterLogo.tsx";
import {textStyle} from "../../../../core/utils/style/GlobalStyle.tsx";

const ForgotPasswordScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const {t} = useTranslation();

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      // send email
      setIsSent(true);
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
    } finally {
      setIsLoading(false);
      //ChangeScreen({navigation, destination: "Login", functionsToClear: [setEmail]})
    }
  }

  return (
    <ScrollView>
      <View style={authenticationStyle({isDarkMode}).container}>
        <Text
          style={authenticationStyle({isDarkMode}).pageTitle}
          onPress={() => {ChangeScreen({navigation, destination: "Login", functionsToClear: [setEmail]})}}
        >
          {t("Login.LogIn")}
        </Text>
        <TrotterLogo />
        <Text style={textStyle({isDarkMode}).title}>
          {t("Login.ForgotPassword")}
        </Text>
        <InputComponent value={email} placeholder={t("Email")} setValue={setEmail}/>
        {isSent && (
          <Text style={authenticationStyle({isDarkMode}).pageTitle}>
            {t("Login.EmailSent")}
          </Text>
        )}
        <ButtonComponent title={t("Submit")} onPress={handleSendEmail} disabled={!emailRegex.test(email)} />
      </View>
      {isLoading && <LoadingComponent/>}
    </ScrollView>
  )
}

export default ForgotPasswordScreen;
