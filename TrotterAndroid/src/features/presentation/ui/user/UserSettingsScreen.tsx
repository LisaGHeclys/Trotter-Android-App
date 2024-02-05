import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import LanguageComponent from '../../../../core/component/LanguageComponent.tsx';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const UserSettingsScreen = ({navigation}: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Landing");
  }
  const {t} = useTranslation();

  //follow classic layer with profile photo of user
  return (
    <View style={styles.page}>
      <View style={styles.profilePhotoContainer}>
        <Text style={styles.profilePhotoTitle}>
          {t("User.EmailInput")}
        </Text>
      </View>
      <View style={styles.container}>
        <Text>
          {t("WIP")}
        </Text>
      </View>
      <View style={styles.profilePhotoContainer}>
        <LanguageComponent/>
      </View>
      <ButtonComponent title={t("User.LogOut")} onPress={handleLogout}/>
    </View>
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
  profilePhotoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "30%",
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
  },
  profilePhotoTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "beige",
    marginBottom: 10,
  }
})

export default UserSettingsScreen;