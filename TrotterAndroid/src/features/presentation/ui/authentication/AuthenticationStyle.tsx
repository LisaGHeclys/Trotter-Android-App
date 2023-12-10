import {StyleSheet} from "react-native";

export const authenticationStyle = StyleSheet.create({
  pageTitle: {
    padding: 10,
    width: "100%",
    color: "#000",
    textAlign: "right",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
    zIndex: 1,
  },
  container: {
    height: "100%",
    display: "flex",
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
    color: "#16161A",
    textAlign: "right",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
  }
})
