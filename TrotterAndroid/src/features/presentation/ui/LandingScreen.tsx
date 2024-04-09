import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import TrotterLogo from "../../../core/assets/TrotterLogo.tsx";
import {textStyle} from "../../../core/utils/style/GlobalStyle.tsx";
import ButtonComponent, {ThemeEnum} from "../../../core/component/ButtonComponent.tsx";
import { useTranslation } from "react-i18next";

const LandingScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TrotterLogo />
      <Text style={textStyle({isDarkMode}).title}>
        {t("WelcomeToTrotter")}
      </Text>
      <ButtonComponent title={"Sign In"} onPress={() => navigation.navigate("Login")}/>
      <View style={styles.spacer}/>
      <ButtonComponent title={"Sign Up"} theme={ThemeEnum.Secondary} onPress={() => navigation.navigate("Register")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: 20,
  }
});

export default LandingScreen;