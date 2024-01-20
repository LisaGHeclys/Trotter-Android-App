import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Keyboard} from 'react-native';
import MapboxGL from "@rnmapbox/maps";
import Mapbox from '@rnmapbox/maps';
import TripsRepositoryImpl from "../../../data/TripsRepositoryImpl.tsx";
import LoadingComponent from "../../../../core/component/LoadingComponent.tsx";
import {TripDataParams} from "../../../model/TripsModel.tsx";
import InputComponent from "../../../../core/component/InputComponent.tsx";
import CityRepositoryImpl from "../../../data/CityRepositoryImpl.tsx";
import ButtonComponent from "../../../../core/component/ButtonComponent.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {weekColors} from "../../../../core/utils/GlobalStyle.tsx";
import Routes from "./Routes.tsx";

MapboxGL.setAccessToken(process.env.REACT_APP_MAPBOX_DOWNLOADS_TOKEN || '');

const UserHomeScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [tripData, setTripData] = useState<TripDataParams>({
    lat: 45.763420,
    lon: 4.834277,
    cityName: "Lyon",
  })
  const [jsonData, setJsonData] = useState<{
    features: GeoJSON.FeatureCollection,
    routes: [
      {
        route: GeoJSON.FeatureCollection,
        tripLegData: any[],
        visitOrder: number[],
      }
    ],
  } | null>(null);
  const [itineraryDay, setItineraryDay] = useState<number>(1);

  const handleGenerateTrip = async () => {
    try {
      await TripsRepositoryImpl.generate(token, tripData.lon, tripData?.lat, 3, {
        onSuccess: async (response) => {
          const dataToJSON = await response.json();
          if (response.ok) {
            setJsonData(dataToJSON);
          } else {
            console.error(dataToJSON?.code || 'Unknown error.');
          }
        },
        onFailure: (error) => {
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
          } catch (error) {}
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
          <InputComponent
            placeholder={"ex: Lyon"}
            value={city}
            setValue={setCity}
            backgroundColor={"white"}
          />
          <ButtonComponent onPress={handleSearchCity} disabled={city == ''} width={45}/>
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
            {jsonData && jsonData?.routes.flatMap((route, index) => (
              <MapboxGL.ShapeSource key={`route${index}`} id={`route${index}`} shape={{type: "FeatureCollection", features: route.route.features}}>
                <MapboxGL.LineLayer
                  id={`routeLine-active${index}`}
                  style={{
                    lineJoin: "round",
                    lineCap: "round",
                    lineColor: weekColors[index % 7].primary,
                    lineWidth:
                      itineraryDay === index
                        ? ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12]
                        : ["interpolate", ["linear"], ["zoom"], 4, 1, 6, 4],
                    lineOpacity: itineraryDay === index ? 1 : 0.3,
                    lineWidthTransition: {
                      delay: 0,
                      duration: 300
                    },
                    lineOpacityTransition: {
                      delay: 0,
                      duration: 300
                    },
                  }}
                />
                <MapboxGL.SymbolLayer
                  id={`routeArrows${index}`}
                  style={{
                    symbolPlacement: "line",
                    textField: "▶",
                    textSize: ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
                    symbolSpacing: ["interpolate", ["linear"], ["zoom"], 12, 30, 22, 160],
                    textKeepUpright: false,
                    textColor: weekColors[index].secondary,
                    textHaloColor: "hsl(55, 11%, 96%)",
                    textHaloWidth: 2,
                    textOpacity: itineraryDay === index ? 1 : 0
                  }}
                />
              </MapboxGL.ShapeSource>
            ))}
          </Mapbox.MapView>
        </View>
      </View>
      {isLoading && <LoadingComponent opacity={0.95}/>}
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