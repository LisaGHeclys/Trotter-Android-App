import {StyleSheet, Text, useColorScheme, View} from "react-native";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {settingStyle} from "./SettingStyle.tsx";
import DropDownPicker from "react-native-dropdown-picker";
import i18next from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum changeModeType {
  "light" = "light",
  "dark" = "dark",
  "device" = "device",
}

const GeneralSettingsScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeMode, setChangeMode] = useState<changeModeType>(changeModeType.device);
  const [openMode, setOpenMode] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18next.language);
  const [items, setItems] = useState([
    { label: 'Français', value: 'fr' },
    { label: 'English', value: 'en' },
  ]);
  const { t } = useTranslation();
  const isDarkMode: boolean = useColorScheme() === 'dark';

  return (
    <View style={settingStyle({isDarkMode: isDarkMode}).page} >
      <HeaderSettings title={"GeneralSettings"} navigation={navigation} />
      {/*<View style={styles.container}>*/}
      {/*  <Text>{t("Language.Language")}</Text>*/}
      {/*  <DropDownPicker*/}
      {/*    open={openMode}*/}
      {/*    value={selectedLanguage}*/}
      {/*    items={items}*/}
      {/*    setOpen={setOpenMode}*/}
      {/*    setValue={setSelectedLanguage}*/}
      {/*    setItems={setItems}*/}
      {/*    onChangeValue={() => {}}*/}
      {/*    theme={isDarkMode ? "DARK" : "LIGHT"}*/}
      {/*  />*/}
      {/*</View>*/}
      <View style={styles.container}>
        <Text>{t("Language.Language")}</Text>
        <DropDownPicker
          open={openLanguage}
          value={selectedLanguage}
          items={items}
          setOpen={setOpenLanguage}
          setValue={setSelectedLanguage}
          setItems={setItems}
          onChangeValue={(value) => {
            i18next.changeLanguage(value ? value : "en");
            AsyncStorage.setItem('language', value ? value : "en");
          }}
          theme={isDarkMode ? "DARK" : "LIGHT"}
        />
      </View>
      <View>
        {/*delete account*/}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    width: "80%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
})

export default GeneralSettingsScreen;