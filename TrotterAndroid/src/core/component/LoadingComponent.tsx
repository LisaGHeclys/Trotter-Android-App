import React, {useEffect, useRef} from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import TrotterLogo from "../assets/TrotterLogo";

const LoadingComponent = () => {
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
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TrotterLogo />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default LoadingComponent;