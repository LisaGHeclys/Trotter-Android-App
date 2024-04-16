import { FC } from "react";
import React from "react";
import MapboxGL from "@rnmapbox/maps";
import {weekColors} from "../../../../../core/utils/style/GlobalStyle.tsx";
import {TripsJsonData} from "../../../../model/TripsModel.tsx";

type RoutesProps = {
  retrieveTripData: TripsJsonData;
  itineraryDay: number;
};

const DisplayRoutes: FC<RoutesProps> = ({ retrieveTripData, itineraryDay }) => {
  return (
    <>
      {retrieveTripData?.routes.flatMap((route, index) => (
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
    </>
  );
};

export default DisplayRoutes;
