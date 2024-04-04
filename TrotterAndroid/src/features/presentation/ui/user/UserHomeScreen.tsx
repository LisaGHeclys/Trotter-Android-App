import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import MapboxGL from "@rnmapbox/maps";
import Mapbox from '@rnmapbox/maps';
import TripsRepositoryImpl from "../../../data/TripsRepositoryImpl.tsx";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import {TripDataParams, TripsJsonData} from "../../../model/TripsModel.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import CityRepositoryImpl from "../../../data/CityRepositoryImpl.tsx";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplayRoutes from "./DisplayRoutes.tsx";
import {
  TourGuideZone,
  useTourGuideController,
} from 'rn-tourguide'
import { AddNotificationUnsavedTrip } from '../../../../core/utils/notifications/EasyNotifications.tsx';
import { useTranslation } from "react-i18next";
import Toaster from "../../../../core/utils/toaster/Toaster.tsx";

MapboxGL.setAccessToken(process.env.REACT_APP_MAPBOX_DOWNLOADS_TOKEN || '');

const UserHomeScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [tripData, setTripData] = useState<TripDataParams>({
    lat: 45.763420,
    lon: 4.834277,
    cityName: "Lyon",
  })
  const [retrieveTripData, setRetrieveTripData] = useState<TripsJsonData | null>(null);
  const [itineraryDay, setItineraryDay] = useState<number>(1);
  const { t } = useTranslation();

  const {
    canStart,
    start,
    stop,
    eventEmitter,
  } = useTourGuideController()

  const RunTourGuide = async () => {
    if (canStart && await AsyncStorage.getItem("isTourGuideDone") === 'false') {
      start()
      AsyncStorage.setItem("isTourGuideDone",'true')
    }
  }

  useEffect(() => {
    RunTourGuide()
  }, [canStart])

  const handleOnStart = () => console.log('Start tour')
  const handleOnStop = () => console.log('Tour done')
  const handleOnStepChange = () => console.log(`Tour next`)

  React.useEffect(() => {
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

  const handleGenerateTrip = async () => {
    try {
      await TripsRepositoryImpl.generate(token, tripData.lon, tripData?.lat, 3, {
        onSuccess: async (response) => {
          const dataToJSON = await response.json();
          if (response.ok) {
            setRetrieveTripData(dataToJSON);
            if (tripData.cityName)
              AddNotificationUnsavedTrip(tripData.cityName);
            Toaster({type: 'success', title: "City.CitySuccess"});
          } else {
            console.error(dataToJSON?.code || 'Unknown error.');
          }
        },
        onFailure: (error) => {
          Toaster({type: 'error', title: "City.CityFail"});
          console.error('Generation failed. Error:', error);
        }
      })
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

  useEffect(() => {
    city !== "" && handleGenerateTrip();
  }, [tripData]);

  useEffect(() => {
    getToken();
  }, []);

  //should I request permission from here ?
  return (
    <>
      <View style={styles.page}>
        <View style={styles.researchBar}>
          <TourGuideZone zone={1} text={t("AppTour.Search")} borderRadius={16}>
            <InputComponent
              placeholder={"ex: Lyon"}
              value={city}
              setValue={setCity}
              backgroundColor={"white"}
            />
          </TourGuideZone>
          <TourGuideZone zone={2} text={t("AppTour.SearchConfirm")} borderRadius={16}>
            <ButtonComponent onPress={handleSearchCity} disabled={city == ''} width={45} />
          </TourGuideZone>
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
            {retrieveTripData && <DisplayRoutes retrieveTripData={retrieveTripData} itineraryDay={itineraryDay}/>}
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
  researchBar: {
    width: "100%",
    paddingRight: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    top: "2%",
    position: "absolute",
    zIndex: 5,
  }
});

export default UserHomeScreen;