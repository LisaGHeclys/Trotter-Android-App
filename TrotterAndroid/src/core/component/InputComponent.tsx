import React from "react";
import {StyleSheet, Text, TextInput} from "react-native";

type InputParams = {
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  pwd?: boolean,
  iconRight?: string,
  backgroundColor?: string,
}

type InputProps = {
  backgroundColor: string,
}

const InputComponent: React.FC<InputParams> =
  ({
     placeholder,
     value,
     setValue,
     pwd = false,
     iconRight,
     backgroundColor= "transparent",
  }) => {
  return (
    <TextInput
      value={value}
      style={styles({backgroundColor}).container}
      placeholder={placeholder}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={pwd}
    />
  )
}

const styles = ({backgroundColor}: InputProps) => StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    height: 45,
    width: "80%",
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InputComponent;