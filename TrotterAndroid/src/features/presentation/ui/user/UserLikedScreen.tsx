import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ChangeScreen} from "../../../../core/utils/GlobalUtils.ts";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import InputComponent from "../../../../core/component/InputComponent.tsx";

const UserLikedScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const {t} = useTranslation();

  return (
    <View style={styles.page}>
      <Text>
        User Likes
      </Text>
      <Text>
        {t("WIP")}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
  },
})

export default UserLikedScreen;