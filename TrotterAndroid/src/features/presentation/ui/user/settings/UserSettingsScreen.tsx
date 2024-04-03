import React from 'react';
import {View, Text, StyleSheet, Pressable, useColorScheme, ScrollView} from 'react-native';
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import LanguageComponent from '../../../../../core/component/LanguageComponent.tsx';
import {ChangeScreen} from "../../../../../core/utils/GlobalUtils.ts";
import DividerComponent from "../../../../../core/component/DividerComponent.tsx";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {GlobalColors} from "../../../../../core/utils/style/GlobalStyle.tsx";
import {settingStyle} from "./SettingStyle.tsx";

type UserSettingsStyleParams = {
  isDarkMode: boolean,
}

const UserSettingsScreen = ({navigation}: any) => {
  const drawerComponents : string[] = [
    "PersonalInformation",
    "GeneralSettings",
    "HelpCenter",
    "GiveUsFeedbacks",
    "TermsOfUse",
    "PrivacyAndPolicy",
  ]
  const {t} = useTranslation();
  const isDarkMode: boolean = useColorScheme() === 'dark';

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={settingStyle({isDarkMode: isDarkMode}).page}>
        <HeaderSettings title={"Parameters"} navigation={navigation} />
        <View style={styles({isDarkMode: isDarkMode}).profilePhotoContainer}>
          <Text style={styles({isDarkMode: isDarkMode}).profilePhotoTitle}>
            {t("User.EmailInput")}
          </Text>
        </View>
        <DividerComponent />
        <View style={styles({isDarkMode: isDarkMode}).container}>
          {drawerComponents.map((title, index) => {
            return (
              <Pressable
                key={index}
                style={styles({isDarkMode: isDarkMode}).drawerComponent}
                onPress={() => {ChangeScreen({navigation, destination: title})}}>
                <Text style={styles({isDarkMode: isDarkMode}).drawerText} >
                   {t("Settings." + title)}
                </Text>
                <FontAwesomeIcon icon={faChevronRight} size={20} />
              </Pressable>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = ({isDarkMode}: UserSettingsStyleParams) => StyleSheet.create({
  profilePhotoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "20%",
    width: "90%",
    backgroundColor: isDarkMode ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
    borderRadius: 16,
    elevation: 2,
  },
  profilePhotoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
  },
  container: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
  },
  drawerComponent: {
    margin: 1,
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    elevation: 1,
    backgroundColor: isDarkMode ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
  },
  drawerText: {
    fontSize: 16,
    fontWeight: "500",
    color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
  }
})

export default UserSettingsScreen;