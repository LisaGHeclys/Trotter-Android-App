import {ScrollView, Text, View} from "react-native";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import InputComponent from "../../../../core/component/InputComponent.tsx";

const ForgotPasswordScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const {t} = useTranslation();

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      // send email
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      <View style={authenticationStyle.container}>
        <Text style={authenticationStyle.pageTitle}>
          {t("Login.ForgotPassword")}
        </Text>
        <InputComponent value={email} placeholder={t("Email")} setValue={setEmail}/>
      </View>
      {isLoading && <LoadingComponent/>}
    </ScrollView>
  )
}

export default ForgotPasswordScreen;