import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {ChangeScreen} from "../../../../../../core/utils/GlobalUtils.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowRightFromBracket, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalColors} from "../../../../../../core/utils/style/GlobalStyle.tsx";
import Toaster from "../../../../../../core/utils/toaster/Toaster.tsx";

type HeaderParams = {
  navigation?: any,
  title: string,
}

type HeaderStyleProps = {
  isDarkMode: boolean,
}

const HeaderSettings = ({navigation, title}: HeaderParams) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {t} = useTranslation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Landing");
    Toaster({type: 'success', title: "Settings.LogOut"});
  }

  return (
    <View style={styles({isDarkMode}).headerContainer}>
      <Pressable onPress={() => {ChangeScreen({navigation, destination: title == "Parameters" ? "Home" : "Settings"})}}>
        <FontAwesomeIcon icon={faChevronLeft} size={25} />
      </Pressable>
      <Text style={styles({isDarkMode}).headerTitle}>
        {t("Settings." + title)}
      </Text>
      {title == "Parameters" ? (
        <Pressable onPress={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size={25} />
        </Pressable>
      ) : (
        <View/>
      )}
    </View>
  )
}

const styles = ({isDarkMode}: HeaderStyleProps) => StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "8%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerTitle: {
    color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
    textAlign: "center",
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: "600",
  },
})

export default HeaderSettings;