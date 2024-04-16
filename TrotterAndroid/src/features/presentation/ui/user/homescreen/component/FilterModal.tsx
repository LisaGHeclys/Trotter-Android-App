import {Modal, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import React from "react";
import {GlobalColors, textStyle} from "../../../../../../core/utils/style/GlobalStyle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ButtonComponent from "../../../../../../core/component/ButtonComponent.tsx";
import DividerComponent from "../../../../../../core/component/DividerComponent.tsx";
import {TransportationTypes} from "../UserHomeScreen.tsx";

type SettingsModalProps = {
  openSettings: boolean,
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>,
  transportationType: TransportationTypes,
  setTransportationType: React.Dispatch<React.SetStateAction<TransportationTypes>>,
}

type TransportationParams = {
  isTransportation?: boolean
}

const FilterModal = ({openSettings, setOpenSettings, transportationType, setTransportationType}: SettingsModalProps) => {
  const isDarkMode = useColorScheme() === 'dark';

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
          <Text style={textStyle({isDarkMode}).subtitle}>Filters</Text>
          <View/>
        </View>
        <ScrollView>
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Type of transportation</Text>
            <Text style={styles.filtersSubtitle}>Choose the type of transportation you prefer</Text>
            <View style={transportationStyles({}).container}>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.walking}).button}
                onPress={() => setTransportationType(TransportationTypes.walking)}>
              </Pressable>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.cycling}).button}
                onPress={() => setTransportationType(TransportationTypes.cycling)}>
              </Pressable>
              <Pressable
                style={transportationStyles({isTransportation: transportationType === TransportationTypes.driving}).button}
                onPress={() => setTransportationType(TransportationTypes.driving)}>
              </Pressable>
            </View>
          </View>
          <View style={styles.dividerContainer}>
            <DividerComponent/>
          </View>
          <View style={styles.filtersContainer}>
            <Text>Type of transportation</Text>
            <Text>Choose the type of transportation you prefer</Text>
          </View>

        </ScrollView>
        <View style={styles.bottomContainer}>
          <Pressable onPress={() => {}}>
            <Text style={styles.bottomClearAllText}>Clear all</Text>
          </Pressable>
          <ButtonComponent onPress={() => {}} title={"search"}/>
        </View>
      </View>
    </Modal>
  )
}

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
    alignItems: "center",
    backgroundColor: isTransportation ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
    borderRightColor: "#AAA",
    borderRightWidth: 1,
  }
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
    color: GlobalColors.writingColor.light,
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    textDecorationLine: "underline",
  }
});

export default FilterModal;