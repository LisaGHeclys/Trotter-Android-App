import React, {useState} from "react";
import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {GlobalColors, textStyle} from "../../../../../../core/utils/style/GlobalStyle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { Animated } from "react-native";

type DropdownParams = {
  title: string,
  text: string,
}

type HeaderStyleProps = {
  isDarkMode: boolean,
  isOpen: boolean,
}

const DropdownSettings = ({title, text}: DropdownParams) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const [animation] = useState(new Animated.Value(0));

  const toggleAnimation = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const animatedStyle = {
    height: heightInterpolate,
    flex: isOpen ? 1 : 0,
  };

  return (
    <View style={styles({isDarkMode, isOpen}).dropdownContainer}>
      <Pressable style={styles({isDarkMode, isOpen}).dropdownButton} onPress={toggleAnimation}>
        <Text style={textStyle({isDarkMode}).subtitle}>
          {t(title)}
        </Text>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown}/>
      </Pressable>
      <Animated.View style={[styles({isDarkMode, isOpen}).dropdownTextContainer, animatedStyle]}>
        <Text style={textStyle({isDarkMode}).text}>
          {t(text)}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = ({isDarkMode, isOpen}: HeaderStyleProps) => StyleSheet.create({
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: 2,
    maxHeight: isOpen ? undefined : 45,
    flexGrow: 1,
  },
  dropdownButton: {
    maxHeight: 45,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTextContainer: {
    width: "100%",
  },
})

export default DropdownSettings;