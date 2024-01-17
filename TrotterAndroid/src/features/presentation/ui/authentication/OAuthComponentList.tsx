import React, {useState} from "react";
import {Linking, Pressable, StyleSheet, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faFacebook, faGoogle, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import AuthenticationRepositoryImpl from "../../../data/AuthenticationRepositoryImpl.tsx";

type OAuthComponentProps = {
  setIsLoading: (isLoading: boolean) => void,
}

type OAuthParams = {
  title: string,
  icon: IconDefinition,
  setIsLoading: (isLoading: boolean) => void,
}

const OAuthComponent = ({title, icon, setIsLoading}: OAuthParams) => {
  const handleOAuth = async () => {
    setIsLoading(true);
    try {
      await AuthenticationRepositoryImpl.oAuth(title, {
        onFailure: (error) => {
          console.error(`${title} oAuth failed. Error:`, error)
        }
      })
    } catch (error) {
      console.error(`Unexpected error during oAuth of ${title}:`, error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Pressable onPress={handleOAuth}>
      <FontAwesomeIcon icon={icon} size={45}/>
    </Pressable>
  )
}

const OAuthComponentList = ({setIsLoading}: OAuthComponentProps) => {
  return (
    <View style={styles.container}>
      <OAuthComponent setIsLoading={setIsLoading} title={"facebook"} icon={faFacebook}/>
      <OAuthComponent setIsLoading={setIsLoading} title={"twitter"} icon={faTwitter}/>
      <OAuthComponent setIsLoading={setIsLoading} title={"google"} icon={faGoogle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default OAuthComponentList;