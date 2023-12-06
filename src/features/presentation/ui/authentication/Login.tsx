import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Login
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default LoginScreen;