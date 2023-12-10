import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSettingsScreen = ({navigation}: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Landing");
  }

  return (
    <View>
      <Text>
        User Settings
      </Text>
      <ButtonComponent title={"Log out"} onPress={handleLogout}/>
    </View>
  )
}

export default UserSettingsScreen;