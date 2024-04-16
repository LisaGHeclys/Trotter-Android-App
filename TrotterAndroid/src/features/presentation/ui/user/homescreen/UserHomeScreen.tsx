import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Keyboard, Pressable, Text, Modal} from 'react-native';
import MapboxGL from "@rnmapbox/maps";
import Mapbox from '@rnmapbox/maps';
import TripsRepositoryImpl from "../../../../data/TripsRepositoryImpl.tsx";
import LoadingComponent from "../../../../../core/component/LoadingComponent.tsx";
import { TripDataParams, TripsJsonData } from "../../../../model/TripsModel.tsx";
import InputComponent from "../../../../../core/component/InputComponent.tsx";
import CityRepositoryImpl from "../../../../data/CityRepositoryImpl.tsx";
import ButtonComponent from "../../../../../core/component/ButtonComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplayRoutes from "./DisplayRoutes.tsx";
import {
  TourGuideZone,
  useTourGuideController,
} from 'rn-tourguide'
import { useTranslation } from "react-i18next";
import Toaster from "../../../../../core/utils/toaster/Toaster.tsx";
import FilterModal from "./component/FilterModal.tsx";
import {GlobalColors} from "../../../../../core/utils/style/GlobalStyle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";

MapboxGL.setAccessToken(process.env.REACT_APP_MAPBOX_DOWNLOADS_TOKEN || '');

export enum TransportationTypes {
  driving = "driving",
  walking = "walking",
  cycling = "cycling",
}

const UserHomeScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [tripData, setTripData] = useState<TripDataParams>({
    lat: 45.763420,
    lon: 4.834277,
    cityName: "Lyon",
  })
  const [transportationType, setTransportationType] = useState<TransportationTypes>(TransportationTypes.walking);
  const [retrieveTripData, setRetrieveTripData] = useState<TripsJsonData | null>(null);
  const [itineraryDay, setItineraryDay] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [modalSaveVisible, setModalSaveVisible] = useState<boolean>(false);
  const [modalSaveIsConfirmed, setModalSaveIsConfirmed] = useState<boolean>(false);
  const [inputNameSavedTrip, setInputNameSavedTrip] = useState<string>("");
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    canStart,
    start,
    stop,
    eventEmitter,
  } = useTourGuideController()

  const RunTourGuide = async () => {
    try {
      if (canStart && await AsyncStorage.getItem("isTourGuideDone") === 'false') {
        start()
        AsyncStorage.setItem("isTourGuideDone", 'true')
      }
    } catch (error) {
      console.error('Error during the tour guide:', error);
    }
  }

  const handleOnStart = () => console.log('Start tour')
  const handleOnStop = () => console.log('Tour done')
  const handleOnStepChange = () => console.log(`Tour next`)

  const handleGenerateTrip = async () => {
    try {
      await TripsRepositoryImpl.generate(token, tripData.lon, tripData?.lat, 3, {
        onSuccess: async (response) => {
          const dataToJSON = await response.json();
          if (response.ok) {
            setRetrieveTripData(dataToJSON);
            Toaster({type: 'success', title: t("City.CitySuccess")});
          } else {
            console.error(dataToJSON?.code || 'Unknown error.');
          }
        },
        onFailure: (error) => {
          Toaster({type: 'error', title: t("City.CityFail")});
          console.error('Generation failed. Error:', error);
        }
      })
      setIsSaved(false);
    } catch (error) {
      console.error('Unexpected error during generation of a trip:', error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchCity = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await CityRepositoryImpl.getCoordinates(city, {
        onSuccess: async (response) => {
          try {
            const resToJSON = await response.json();
            if (response.ok) {
              setTripData({
                lat: resToJSON?.lat,
                lon: resToJSON?.lon,
                cityName: resToJSON?.name,
              })
              setCity('');
            } else {
              throw new Error(resToJSON?.Message || 'Unknown error.');
            }
          } catch (error) { }
        },
        onFailure: (error) => {
          console.error('City search failed. Error:', error);
        }
      })
    } catch (error) {
      console.error('Unexpected error during the search of the city:', error);
    }
  }

  const handleSaveTrip = async () => {
    if (retrieveTripData) {
      try {
        const token = await AsyncStorage.getItem("token");
        await TripsRepositoryImpl.save(Date.now(), Date.now(), [0, 0], (tripData.cityName ? tripData.cityName : ""), retrieveTripData, (token ? token : ""), {
          onSuccess: async (response) => {
            await response.json();
            if (response.ok) {
              Toaster({type: 'success', title: t("Trips.SaveSuccess")});
              setIsSaved(true);
            } else {
              console.error('Unknown error.');
            }
          },
          onFailure: (error) => {
            console.error('Call to save the trip failed:', error);
            Toaster({type: 'error', title: t("Trips.SaveFail")});
          },
        });
      } catch (error) {
        console.error('Unexpected error during the save of the trip:', error);
      }
    } else {
      console.error('No trip data to save.');
    }
  }

  const getToken = async () => {
    setIsLoading(true);
    try {
      const retrieveToken = await AsyncStorage.getItem('token');
      setToken(retrieveToken as string);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
    setIsLoading(false)
  }

  const loadSavedTrip = async () => {
    try {
      const tripToOpen = await AsyncStorage.getItem("tripToOpen");
      if (tripToOpen) {
        setIsLoading(true);
        const parsedTrip = JSON.parse(tripToOpen);

        await AsyncStorage.removeItem("tripToOpen");
        setRetrieveTripData({ features: parsedTrip.tripData.features, routes: parsedTrip.tripData.routes });
        setTripData({
          lat: (parsedTrip.housingCoordinates[0] !== 0 ? parsedTrip.housingCoordinates[0] : parsedTrip.tripData.routes[0].route.features[0].geometry.coordinates[0][1]),
          lon: (parsedTrip.housingCoordinates[1] !== 0 ? parsedTrip.housingCoordinates[0] : parsedTrip.tripData.routes[0].route.features[0].geometry.coordinates[0][0]),
          cityName: parsedTrip.cityName,
        });
        setIsLoading(false);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error loading saved trip:', error);
    }
  }

  useEffect(() => {
    RunTourGuide()
  }, [canStart])

  useEffect(() => {
    if (eventEmitter == null) { return }

    eventEmitter.on('start', handleOnStart)
    eventEmitter.on('stop', handleOnStop)
    eventEmitter.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter.off('start', handleOnStart)
      eventEmitter.off('stop', handleOnStop)
      eventEmitter.off('stepChange', handleOnStepChange)
    }
  }, [])

  useEffect(() => {
    city !== "" && handleGenerateTrip();
  }, [tripData]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadSavedTrip();
    });
  }, [navigation]);

  //should I request permission from here ?
  return (
    <>
      <View style={styles.page}>
        <View style={styles.researchBarContainer}>
          {/*<TourGuideZone zone={1} text={t("AppTour.Search")} borderRadius={16}>*/}
          {/*  <InputComponent*/}
          {/*    placeholder={"ex: Lyon"}*/}
          {/*    value={city}*/}
          {/*    setValue={setCity}*/}
          {/*    backgroundColor={"white"}*/}
          {/*  />*/}
          {/*</TourGuideZone>*/}
          {/*<TourGuideZone zone={2} text={t("AppTour.SaveItinerary")} borderRadius={16}>*/}
          {/*  <ButtonComponent disabled={isSaved} onPress={handleSaveTrip} title={"↓"} width={45} />*/}
          {/*</TourGuideZone>*/}
          {/*<TourGuideZone zone={3} text={t("AppTour.SearchConfirm")} borderRadius={16}>*/}
          {/*  <ButtonComponent onPress={handleSearchCity} disabled={city == ''} width={45} />*/}
          {/*</TourGuideZone>*/}
          {/*----*/}
          {/*<Modal*/}
          {/*  animationType="slide"*/}
          {/*  transparent={true}*/}
          {/*  visible={openSearch}*/}
          {/*  onRequestClose={() => setOpenSearch(false)}>*/}
          {/*  <View style={styles.modalContainer}>*/}
          {/*    <View >*/}
          {/*      <Text>Search</Text>*/}
          {/*      <Pressable onPress={() => setOpenSearch(false)}>*/}
          {/*        <Text>Hide Modal</Text>*/}
          {/*      </Pressable>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*</Modal>*/}
          <Pressable style={styles.researchBar} onPress={() => setOpenSearch(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color={"#AAA"} />
            <Text>
              ex: Lyon
            </Text>
          </Pressable>
          <FilterModal
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            transportationType={transportationType}
            setTransportationType={setTransportationType}
          />
          <Pressable style={styles.settingsButton} onPress={() => setOpenSettings(true)}>
            <FontAwesomeIcon icon={faSliders} size={20} color={"#AAA"} />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Mapbox.MapView
            style={styles.map}
            styleURL="mapbox://styles/mapbox/streets-v12"
            projection="globe"
          >
            <Mapbox.Camera
              centerCoordinate={[tripData.lon, tripData.lat]}
              zoomLevel={12.5}
            />
            {retrieveTripData && <DisplayRoutes retrieveTripData={retrieveTripData} itineraryDay={itineraryDay} />}
          </Mapbox.MapView>
        </View>
      </View>
      {isLoading && <LoadingComponent opacity={0.95} />}
    </>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
  researchBarContainer: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    top: "2%",
    position: "absolute",
    zIndex: 5,
  },
  researchBar: {
    height: 45,
    width: "80%",
    backgroundColor: GlobalColors.backgroundColor.light,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    gap: 10,
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#AAA",
    borderWidth: 1,
  },
  tripSavedModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripSavedModalTextContainer: {
    height: "10%",
    width: "50%",
    backgroundColor: GlobalColors.backgroundColor.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  settingsButton: {
    height: 45,
    width: 45,
    backgroundColor: GlobalColors.backgroundColor.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#AAA",
    borderWidth: 1,
  },
});

export default UserHomeScreen;