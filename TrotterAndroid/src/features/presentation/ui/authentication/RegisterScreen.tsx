import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import {authenticationStyle} from "./AuthenticationStyle.tsx";
import TrotterLogo from "../../../../core/assets/TrotterLogo.tsx";

const RegisterScreen = ({navigation}: any) => {
  return (
    <View style={authenticationStyle.container}>
      <Text style={authenticationStyle.pageTitle}>
        Log In
      </Text>
      <TrotterLogo />
      <Text>
        Create a new account
      </Text>
      <ButtonComponent title={"Sign In"} onPress={() => navigation.navigate("Login")}/>
    </View>
  )
}

export default RegisterScreen;