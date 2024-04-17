import {Animated, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import React from "react";
import {GlobalColors, textStyle} from "../../../../../../core/utils/style/GlobalStyle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEye, faEyeSlash, faMagnifyingGlass, faSliders, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {TransportationTypes} from "../UserHomeScreen.tsx";
import FilterModal from "./FilterModal.tsx";
import InputComponent from "../../../../../../core/component/InputComponent.tsx";
import ButtonComponent from "../../../../../../core/component/ButtonComponent.tsx";
import DividerComponent from "../../../../../../core/component/DividerComponent.tsx";

type SearchModalProps = {
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  openSearch: boolean,
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>,
  days: number,
  setDays: React.Dispatch<React.SetStateAction<number>>,
  openSettings: boolean,
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>,
  transportationType: TransportationTypes,
  setTransportationType: React.Dispatch<React.SetStateAction<TransportationTypes>>,
  radiusArea: number;
  setRadiusArea: React.Dispatch<React.SetStateAction<number>>;
  handleSearchCity(): Promise<void>
}

type BottomParams = {
  toClear?: boolean
}

const SearchModal = (
  {
    city,
    setCity,
    openSearch,
    setOpenSearch,
    days,
    setDays,
    openSettings,
    setOpenSettings,
    transportationType,
    setTransportationType,
    radiusArea,
    setRadiusArea,
    handleSearchCity,
  }: SearchModalProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();

  const handleClearAll = () => {
    setCity("");
    setDays(0);
  }

  const handleSearch = () => {
    setOpenSearch(false)
    handleSearchCity();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openSearch}
      onRequestClose={() => setOpenSearch(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Pressable onPress={() => setOpenSearch(false)}>
            <FontAwesomeIcon icon={faXmark} size={20} />
          </Pressable>
          <Text style={textStyle({isDarkMode}).subtitle}>Generate your trip</Text>
          <FilterModal
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            transportationType={transportationType}
            setTransportationType={setTransportationType}
            radiusArea={radiusArea}
            setRadiusArea={setRadiusArea}
          />
          <Pressable style={styles.filtersButton} onPress={() => setOpenSettings(true)}>
            <FontAwesomeIcon icon={faSliders} size={20} />
          </Pressable>
        </View>
        <ScrollView>
          {/*<TourGuideZone zone={1} text={t("AppTour.Search")} borderRadius={16}>*/}
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Where to ?</Text>
            <Text style={styles.filtersSubtitle}>Input a city you want to visit</Text>
            <View style={searchStyles.container}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={20} />
              <TextInput
                style={searchStyles.input}
                value={city ? city : ""}
                placeholder={"ex: Lyon"}
                onChangeText={(text) => setCity(text)}
                maxLength={40}
              />
            </View>
          </View>
          <View style={styles.dividerContainer}>
            <DividerComponent/>
          </View>
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>When ?</Text>
            <Text style={styles.filtersSubtitle}>Input the dates of your trip</Text>
            {/*<View style={searchStyles.container}>*/}
            {/*  <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color={"#AAA"} />*/}
            {/*  <TextInput*/}
            {/*    style={searchStyles.input}*/}
            {/*    value={city ? city : ""}*/}
            {/*    placeholder={"ex: Lyon"}*/}
            {/*    onChangeText={(text) => setCity(text)}*/}
            {/*    maxLength={40}*/}
            {/*  />*/}
            {/*</View>*/}
          </View>
        </ScrollView>
        <View style={bottomStyles({}).bottomContainer}>
          <Pressable onPress={handleClearAll}>
            <Text style={bottomStyles({toClear: city == "" && days == 0}).bottomClearAllText}>{t("Filter.ClearAll")}</Text>
          </Pressable>
          <ButtonComponent onPress={handleSearch} disabled={city == ""} title={t("Submit")}/>
        </View>
      </View>
    </Modal>
  )
}

const bottomStyles = ({toClear}: BottomParams) => StyleSheet.create({
  bottomContainer: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    borderTopColor: "#AAA",
    borderTopWidth: 1,
  },
  bottomClearAllText: {
    color: toClear ? "#AAA" : GlobalColors.writingColor.light,
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    textDecorationLine: "underline",
  }
})

const searchStyles = StyleSheet.create({
  container: {
    height: 45,
    width: "100%",
    backgroundColor: GlobalColors.backgroundColor.light,
    display: "flex",
    paddingLeft: 20,
    gap: 10,
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#AAA",
    borderWidth: 1,
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
})

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: GlobalColors.backgroundColor.light,
    height: "100%",
  },
  titleContainer: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomColor: "#AAA",
    borderBottomWidth: 1,
  },
  dividerContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  filtersContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 20,
  },
  filtersTitle: {
    color: GlobalColors.writingColor.light,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
  },
  filtersSubtitle: {
    color: GlobalColors.writingColor.light,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    paddingBottom: 20,
  },
  filtersButton: {
    height: 45,
    width: 45,
    backgroundColor: GlobalColors.backgroundColor.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default SearchModal;