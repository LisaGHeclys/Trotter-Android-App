import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrotterLogo from "../../../core/assets/TrotterLogo.tsx";
import {textStyle} from "../../../core/utils/GlobalStyle.tsx";
import ButtonComponent, {ThemeEnum} from "../../../core/component/ButtonComponent.tsx";

const LandingScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TrotterLogo />
      <Text style={textStyle.title}>
        Welcome to Trotter !
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