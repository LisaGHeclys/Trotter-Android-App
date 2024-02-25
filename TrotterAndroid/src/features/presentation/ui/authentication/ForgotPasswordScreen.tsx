import {ScrollView, Text, View} from "react-native";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import {emailRegex} from "../../../../core/utils/RegexUtils.ts";

const ForgotPasswordScreen = ({navigation}: any) => {
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
      <View style={authenticationStyle.container}>
        <Text style={authenticationStyle.pageTitle}>
          {t("ForgotPassword.ForgotPassword")}
        </Text>
        <InputComponent value={email} placeholder={t("Email")} setValue={setEmail}/>
        {isSent && (
          <Text style={authenticationStyle.pageTitle}>
            {t("EmailSent")}
          </Text>
        )}
        <ButtonComponent title={t("Submit")} onPress={handleSendEmail} disabled={!emailRegex.test(email)} />
      </View>
      {isLoading && <LoadingComponent/>}
    </ScrollView>
  )
}

export default ForgotPasswordScreen;