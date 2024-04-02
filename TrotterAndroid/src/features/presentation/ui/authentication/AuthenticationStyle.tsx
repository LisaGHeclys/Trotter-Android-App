import {StyleSheet, useColorScheme} from "react-native";
import {GlobalColors} from "../../../../core/utils/style/GlobalStyle.tsx";

const isDarkMode = useColorScheme() === 'dark';

export const authenticationStyle = StyleSheet.create({
  pageTitle: {
    padding: 10,
    width: "100%",
    color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
    textAlign: "right",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
    zIndex: 1,
  },
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: isDarkMode ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
    flex: 1,
    alignItems: "center",
  },
  underContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  errorContainer: {
    width: "64%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
  },
  forgotPasswordText: {
    color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
    textAlign: "right",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
  }
})
