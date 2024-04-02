import React, {useRef, useState} from "react";
import {Animated, DimensionValue, Pressable, StyleSheet, TextInput, View} from "react-native";
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
  width?: DimensionValue | undefined,
  height?: DimensionValue | undefined,
}

type InputProps = {
  backgroundColor?: string,
  width?: DimensionValue | undefined,
  height?: DimensionValue | undefined,
}

const InputComponent: React.FC<InputParams> =
  ({
     placeholder,
     value,
     setValue,
     pwd = false,
     iconRight,
     backgroundColor= "transparent",
     width = "80%",
     height = 45,
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
    <View style={styles({backgroundColor, width, height}).container}>
      <TextInput
        style={styles({height}).inputContainer}
        value={value ? value : ""}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        secureTextEntry={showPwd}
        multiline={height != 45}
        numberOfLines={height != 45 ? 6 : 1}
        maxLength={height != 45 ? 280 : 40}
        textAlignVertical={height != 45 ? "top" : "auto"}
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

const styles = ({backgroundColor, width, height}: InputProps) => StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    height: height,
    width: width,
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 10,
    alignItems: height != 45 ? "flex-start" : "center",
  },
  inputContainer: {
    width: height == 45 || width == "80%" ? "80%" : "100%",
    height: height != 45 ? "100%" : height,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
});

export default InputComponent;