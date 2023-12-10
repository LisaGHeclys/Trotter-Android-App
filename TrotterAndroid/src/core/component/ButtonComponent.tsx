import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";

export enum ThemeEnum {
  Primary,
  Secondary,
}

type ButtonParams = {
  title: string,
  theme?: ThemeEnum,
  onPress: () => void,
  disabled?: boolean,
}

type ButtonProps = {
  theme?: ThemeEnum,
  disabled?: boolean,
}

const ButtonComponent: React.FC<ButtonParams> = ({title, theme = ThemeEnum.Primary, onPress, disabled = false }) => {
  return (
    <Pressable style={styles({theme, disabled}).container} onPress={onPress} disabled={disabled}>
      <Text style={styles({theme, disabled}).title}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = ({theme, disabled}: ButtonProps) => StyleSheet.create({
  container: {
    height: 45,
    width: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme === ThemeEnum.Primary ? "transparent" : "#000000",
    backgroundColor: (() => {
      if (disabled) {
        return "grey";
      } else if (theme === ThemeEnum.Primary) {
        return "#6290C3";
      } else {
        return "#F3F4F8";
      }
    })(),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  title: {
    color: theme === ThemeEnum.Primary  ? "#F3F4F8" : "#000000",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
  }
});

export default ButtonComponent;