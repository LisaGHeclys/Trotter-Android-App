import React, {useRef, useState} from "react";
import {Animated, Pressable, StyleSheet, TextInput, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

type InputParams = {
  placeholder: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  pwd?: boolean,
  iconRight?: IconDefinition,
  backgroundColor?: string,
}

type InputProps = {
  backgroundColor?: string,
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
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [showPwd, setShowPwd] = useState<boolean>(pwd);

  const togglePassword = () => {
    setShowPwd(prevState => !prevState)
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    };

  return (
    <View style={styles({backgroundColor}).container}>
      <TextInput
        style={styles({}).inputContainer}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        secureTextEntry={showPwd}
      />
      {pwd && (
        <Pressable onPress={togglePassword}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <FontAwesomeIcon icon={showPwd ? faEye : faEyeSlash} size={20}/>
          </Animated.View>
        </Pressable>
      )}
      {iconRight && (
        <FontAwesomeIcon icon={iconRight} size={20}/>
      )}
    </View>
  )
}

const styles = ({backgroundColor}: InputProps) => StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    height: 45,
    width: "80%",
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  }
});

export default InputComponent;