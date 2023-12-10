import React, {useEffect, useRef} from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import TrotterLogo from "../assets/TrotterLogo";

type LoadingComponentParams = {
  opacity?: number,
}

const LoadingComponent = ({opacity = 0.75}: LoadingComponentParams) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles({opacity}).container}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TrotterLogo />
      </Animated.View>
    </View>
  )
}

const styles = ({opacity}: LoadingComponentParams) => StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    zIndex: 5,
  }
});

export default LoadingComponent;