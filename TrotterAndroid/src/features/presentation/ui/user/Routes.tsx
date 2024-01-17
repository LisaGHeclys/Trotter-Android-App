import { FC, Fragment } from "react";
import React from "react";
import Mapbox from "@rnmapbox/maps";
import {Text} from "react-native";

type RoutesProps = {
  routes: { [id: string]: any};
  colors: { primary: string; secondary: string }[];
  itineraryDay: number;
};
/*
 <Mapbox.LineLayer
 id={key}
 coordinates={routes[index].features[0].geometry.coordinates}
 strokeWidth={itineraryDay === index ? 5 : 2}
 strokeColor={colors[index].primary}
 lineCap="round"
 lineJoin="round"
 zIndex={itineraryDay === index ? 1 : 0}
 />
* <Mapbox.MarkerView
 coordinate={{
 latitude: routes[index].features[0].geometry.coordinates[0].latitude,
 longitude: routes[index].features[0].geometry.coordinates[0].longitude,
 }}
 title={`Marker ${index}`}
 description={`This is marker ${index}`}
 pinColor={colors[index].secondary}
 opacity={itineraryDay === index ? 1 : 0}
 />*/
const Routes: FC<RoutesProps> = ({ routes, colors, itineraryDay }) => {
  return (
    <>
      {Object.keys(routes).map((key, index) => (
        <Fragment key={index}>
          <Text>

          </Text>
        </Fragment>
      ))}
    </>
  );
};

export default Routes;
