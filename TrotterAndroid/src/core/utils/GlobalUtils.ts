import React from "react";

type ChangeScreenParams = {
  navigation: any,
  destination: string,
  functionsToClear?: React.Dispatch<React.SetStateAction<string>>[],
}
export const ChangeScreen = ({navigation, destination, functionsToClear = []}: ChangeScreenParams) => {
  for (const clearFunction of functionsToClear) {
    clearFunction("");
  }
  navigation.navigate(destination);
}