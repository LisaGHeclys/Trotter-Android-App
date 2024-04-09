import {StyleSheet} from "react-native";
import {GlobalColors} from "../../../../../core/utils/style/GlobalStyle.tsx";

type SettingStyleParams = {
  isDarkMode: boolean
}

export const settingStyle = ({isDarkMode}: SettingStyleParams) => StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: isDarkMode ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
  },
})