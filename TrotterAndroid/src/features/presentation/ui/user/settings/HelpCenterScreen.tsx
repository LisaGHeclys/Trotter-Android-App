import {ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {settingStyle} from "./SettingStyle.tsx";

const HelpCenterScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {t} = useTranslation();
  const isDarkMode: boolean = useColorScheme() === 'dark';

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={settingStyle({isDarkMode: isDarkMode}).page} >
        <HeaderSettings title={"HelpCenter"} navigation={navigation} />
        <Text>
          {t("WIP")}
        </Text>
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

export default HelpCenterScreen;