import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
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
    features: {
      geometry: {
        coordinates: number[];
      };
      properties: {
        name: string;
      };
    }[];
  } | null>(null);
  const [routes, setRoutes] = useState<{
    [id: string]: Mapbox.VectorSource;
  }>({});
  const [itineraryDay, setItineraryDay] = useState<number>(3);

  const handleGenerateTrip = async () => {
    try {
      await TripsRepositoryImpl.generate(token, tripData.lon, tripData?.lat, 3, {
        onSuccess: async (response) => {
          const dataToJSON = await response.json();
          if (response.ok) {
            setJsonData(dataToJSON);
            if (dataToJSON.routes) {
              for (const route of dataToJSON.routes) {
                const index = dataToJSON.routes.indexOf(route);
                if (!route) continue;
                setRoutes((old) => ({
                  ...old,
                  [index]: route.route,
                }));
              }
            }
          } else {
            throw new Error(dataToJSON?.code || 'Unknown error.');
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

  /*{Object.keys(routes).map((route, index) => (
   <MapboxGL.ShapeSource id={index.toString()} shape={}>
   <MapboxGL.LineLayer id={index.toString()} style={{lineColor: weekColors[index]}} />
   </MapboxGL.ShapeSource>
   ))}*/

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
              zoomLevel={11.5}
            />

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