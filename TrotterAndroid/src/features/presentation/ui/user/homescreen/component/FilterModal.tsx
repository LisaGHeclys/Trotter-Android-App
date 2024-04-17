import {Modal, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import React from "react";
import {GlobalColors, textStyle} from "../../../../../../core/utils/style/GlobalStyle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCarSide, faPersonBiking, faPersonWalking, faXmark} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "../../../../../../core/component/ButtonComponent.tsx";
import DividerComponent from "../../../../../../core/component/DividerComponent.tsx";
import {TransportationTypes} from "../UserHomeScreen.tsx";
import Slider from "@react-native-community/slider";
import {useTranslation} from "react-i18next";

type SettingsModalProps = {
  openSettings: boolean,
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>,
  transportationType: TransportationTypes,
  setTransportationType: React.Dispatch<React.SetStateAction<TransportationTypes>>,
  radiusArea: number;
  setRadiusArea: React.Dispatch<React.SetStateAction<number>>;
}

type TransportationParams = {
  isTransportation?: boolean
}

type BottomParams = {
  toClear?: boolean
}

const FilterModal = ({openSettings, setOpenSettings, transportationType, setTransportationType, radiusArea, setRadiusArea}: SettingsModalProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();

  const handleClearAll = () => {
    setRadiusArea(0);
    setTransportationType(TransportationTypes.walking)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openSettings}
      onRequestClose={() => setOpenSettings(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Pressable onPress={() => setOpenSettings(false)}>
            <FontAwesomeIcon icon={faXmark} size={20} />
          </Pressable>
          <Text style={textStyle({isDarkMode}).subtitle}>{t("Filter.Filters")}</Text>
          <View/>
        </View>
        <ScrollView>
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>{t("Filter.Transportation")}</Text>
            <Text style={styles.filtersSubtitle}>{t("Filter.ChooseTransportation")}</Text>
            <View style={transportationStyles({}).container}>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.walking}).button}
                onPress={() => setTransportationType(TransportationTypes.walking)}>
                <FontAwesomeIcon icon={faPersonWalking} size={25} color={transportationType === TransportationTypes.walking ? "#AAA" : GlobalColors.writingColor.light} />
                <Text style={transportationStyles({isTransportation: transportationType === TransportationTypes.walking}).subtitle}>{t("Filter.Walking")}</Text>
              </Pressable>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.cycling}).button}
                onPress={() => setTransportationType(TransportationTypes.cycling)}>
                <FontAwesomeIcon icon={faPersonBiking} size={25} color={transportationType === TransportationTypes.cycling ? "#AAA" : GlobalColors.writingColor.light} />
                <Text style={transportationStyles({isTransportation: transportationType === TransportationTypes.cycling}).subtitle}>{t("Filter.Cycling")}</Text>
              </Pressable>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.driving}).button}
                onPress={() => setTransportationType(TransportationTypes.driving)}>
                <FontAwesomeIcon icon={faCarSide} size={25} color={transportationType === TransportationTypes.driving ? "#AAA" : GlobalColors.writingColor.light} />
                <Text style={transportationStyles({isTransportation: transportationType === TransportationTypes.driving}).subtitle}>{t("Filter.Driving")}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.dividerContainer}>
            <DividerComponent/>
          </View>
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>{t("Filter.Area")}</Text>
            <Text style={styles.filtersSubtitle}>{t("Filter.ChooseArea")}</Text>
            <Text style={styles.filtersSubtitle}>{radiusArea} km</Text>
            <Slider
              style={radiusAreaStyles({}).sliderContainer}
              maximumTrackTintColor="#AAA"
              minimumTrackTintColor="#6290C3"
              minimumValue={0}
              maximumValue={160}
              thumbTintColor="#6290C3"
              value={radiusArea}
              onSlidingComplete={(res) => {setRadiusArea(res)}}
            />
            <View style={radiusAreaStyles({}).sliderInsideContainer}>
              {Array.from(Array(5).keys()).map((index) => {
                const dotColor = (index * 40) < radiusArea ? "#6290C3" : "#AAA"
                return(
                  <View key={index} style={{backgroundColor:  dotColor, width: 8, height: 8, borderRadius: 99}} />
                )
              })}
            </View>
            <View style={radiusAreaStyles({}).sliderLegend}>
              <Text style={styles.filtersSubtitle}>0 km</Text>
              <Text style={styles.filtersSubtitle}>160 km</Text>
            </View>
          </View>
          <View style={styles.dividerContainer}>
            <DividerComponent/>
          </View>
        </ScrollView>
        <View style={bottomStyles({}).bottomContainer}>
          <Pressable onPress={handleClearAll}>
            <Text style={bottomStyles({toClear: transportationType == TransportationTypes.walking && radiusArea == 0}).bottomClearAllText}>{t("Filter.ClearAll")}</Text>
          </Pressable>
          <ButtonComponent onPress={() => {}} title={t("Submit")}/>
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

const radiusAreaStyles = ({}) => StyleSheet.create({
  sliderContainer: {
    width: '100%',
  },
  sliderInsideContainer: {
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    top: -12.5,
    zIndex: -1,
  },
  sliderLegend: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

const transportationStyles = ({isTransportation}: TransportationParams) => StyleSheet.create({
  container: {
    height: 65,
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    borderColor: "#AAA",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    width: `${100/3}%`,
    display: "flex",
    padding: 10,
    alignItems: "center",
    backgroundColor: isTransportation ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
    borderRightColor: "#AAA",
    borderRightWidth: 1,
  },
  subtitle: {
    color: isTransportation ? "#AAA" : GlobalColors.writingColor.light,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    paddingBottom: 20,
  },
})

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: GlobalColors.backgroundColor.light,
    height: "100%",
    marginTop: 15,
    paddingBottom: 15,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
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
});

export default FilterModal;