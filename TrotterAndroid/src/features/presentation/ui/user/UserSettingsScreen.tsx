import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSettingsScreen = ({navigation}: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Landing");
  }

  //follow classic layer with profile photo of user
  return (
    <View style={styles.page}>
      <View style={styles.profilePhotoContainer}>
        <Text style={styles.profilePhotoTitle}>
          User email to input
        </Text>
      </View>
      <View style={styles.container}>
        <Text>
          In development
        </Text>
      </View>
      <ButtonComponent title={"Log out"} onPress={handleLogout}/>
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