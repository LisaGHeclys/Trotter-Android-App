import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChangeScreen } from "../../../../core/utils/GlobalUtils.ts";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import TripsRepositoryImpl from "../../../data/TripsRepositoryImpl.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import Toaster from "../../../../core/utils/toaster/Toaster.tsx";

const UserSavedTripsScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [savedTrips, setSavedTrips] = useState<[{
    cityName: string,
    startDate: string,
    endDate: string,
    housingCoordinates: [number, number],
    id: string,
    tripData: {
      features: GeoJSON.FeatureCollection,
      routes: [
        {
          route: GeoJSON.FeatureCollection,
          tripLegData: any[],
          visitOrder: number[],
        }
      ],
    }
  }] | null>(null);
  const [SavedTripsAreLoaded, setSavedTripsAreLoaded] = useState<boolean>(false);
  const { t } = useTranslation();

  const LoadSavedTrips = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await TripsRepositoryImpl.getTrips((token ? token : ""), {
        onSuccess: async (response) => {
          try {
            const resToJSON = await response.json();
            setSavedTrips(resToJSON);
            setSavedTripsAreLoaded(true);
          } catch (error) {
            console.error('Error parsing saved trips:', error);
          }
        },
        onFailure: (error) => {
          console.error('Load trips failed. Error:', error);
          Toaster({type: 'error', title: "Trips.LoadFail"});
        },
      });
    } catch (error) {
      console.error('Error retrieving saved trips:', error);
    }
    setIsLoading(false);
  }

  const ViewSavedTrip = () => {
    if (savedTrips !== null && savedTrips.length > 0) {
      const tripsItem = savedTrips.map((jsonData, key) => {
        return (
          <View style={styles.tripContainer} key={key}>
            <Text style={styles.tripText}>{t("Trips.Trip")} {t("Trips.To")} {jsonData.cityName}</Text>
            <ButtonComponent onPress={() => openSavedTrip(JSON.stringify(jsonData))} title={"↑"} width={45} />
            <ButtonComponent onPress={() => removeSavedTrip(JSON.stringify(jsonData.id))} title={"🗑"} width={45} />
          </View>
        )
      })
      return tripsItem;
    } else {
      return (<View style={styles.tripContainer}><Text>{t("Trips.NoTrips")}</Text></View>)
    }
  }

  const removeSavedTrip = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await TripsRepositoryImpl.delete((token ? token : ""), JSON.parse(id), {
        onSuccess: async (response) => {
          await response.json();
          Toaster({type: 'success', title: "Trips.DeleteSuccess"});
        },
        onFailure: (error) => {
          console.error('Error deleting saved trip:', error);
          Toaster({type: 'error', title: "Trips.DeleteFail"});
        },
      
      });
      LoadSavedTrips();
    } catch (error) {
      console.error('Error removing saved trip:', error);
    }
  }

  const openSavedTrip = (jsonData: string) => {
    try {
      AsyncStorage.setItem("tripToOpen", jsonData);
      ChangeScreen({ navigation, destination: "Home" });
    } catch (error) {
      console.error('Error opening saved trip:', error);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      LoadSavedTrips();
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>
          {t("Trips.Trips") + " " + (savedTrips ? savedTrips.length : 0) + "/3"}
        </Text>
      </View>
      <ScrollView style={styles.tripsContainer}>
        {ViewSavedTrip()}
      </ScrollView>
      {isLoading && <LoadingComponent opacity={0.95} />}
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
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },
  tripContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    elevation: 2,
    marginBottom: 10,
  },
  tripsContainer: {
    width: "100%",
    height: "80%",
    flexGrow: 1,
  },
  tripDeleteModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripDeleteModalTextContainer: {
    height: "10%",
    width: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  refreshButton: {
    marginLeft: 10,
  },
  tripText: {
    marginRight: 10,
  }
})


export default UserSavedTripsScreen;