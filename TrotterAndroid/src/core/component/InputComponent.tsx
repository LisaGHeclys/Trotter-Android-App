import React from "react";
import {StyleSheet, Text, TextInput} from "react-native";

type InputParams = {
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  pwd?: boolean,
  iconRight?: string,
}

const InputComponent: React.FC<InputParams> = ({placeholder, value, setValue, pwd = false, iconRight }) => {
  return (
    <TextInput
      value={value}
      style={styles.container}
      placeholder={placeholder}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={pwd}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    height: 45,
    width: "80%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InputComponent;