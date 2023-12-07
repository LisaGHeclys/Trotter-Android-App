import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Register
      </Text>
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

export default RegisterScreen;