import {ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {settingStyle} from "./SettingStyle.tsx";
import InputComponent from "../../../../../core/component/InputComponent.tsx";

const PersonalInformationScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [pwd , setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [pdp, setPdp] = useState<string>("");
  const {t} = useTranslation();
  const isDarkMode: boolean = useColorScheme() === 'dark';

  // pdp
  // email
  // password

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={settingStyle({isDarkMode: isDarkMode}).page} >
        <HeaderSettings title={"PersonalInformation"} navigation={navigation} />
        <InputComponent placeholder={t("Email")} value={email} setValue={setEmail}/>
        <InputComponent placeholder={t("Password")} value={pwd} setValue={setPwd}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
  },
})

export default PersonalInformationScreen;