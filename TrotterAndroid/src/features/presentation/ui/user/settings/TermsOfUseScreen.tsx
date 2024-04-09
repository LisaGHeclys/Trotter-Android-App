import React from "react";
import {ScrollView, Text, useColorScheme, View} from "react-native";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {settingStyle} from "./SettingStyle.tsx";
import DropdownSettings from "./components/DropdownSettings.tsx";

const TermsOfUseScreen = ({navigation}: any) => {
  const isDarkMode: boolean = useColorScheme() === 'dark';

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={settingStyle({isDarkMode: isDarkMode}).page} >
        <HeaderSettings title={"TermsOfUse"} navigation={navigation} />
        <ScrollView>
          <Text>
            Effective Date: 30th March 2024
          </Text>
          <DropdownSettings title={"TermsOfUse.WhatYouCanDo"} text={"TermsOfUse.WhatYouCanDoText"}/>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default TermsOfUseScreen;