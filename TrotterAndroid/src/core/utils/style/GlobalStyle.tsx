import {StyleSheet} from "react-native";
import {Colors} from "./GlobalColors.tsx";

type TextStyleProps = {
    isDarkMode: boolean,
}

export const textStyle= ({isDarkMode}: TextStyleProps) => StyleSheet.create({
    title: {
        padding: 25,
        color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
        textAlign: "center",
        fontSize: 28,
        fontStyle: "normal",
        fontWeight: "700",
    },
    subtitle: {
        color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
        textAlign: "center",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "600",
    },
    text: {
        color: isDarkMode ? GlobalColors.writingColor.dark : GlobalColors.writingColor.light,
        textAlign: "center",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
    }
})


export const weekColors: Colors[] = [
    { primary: "red", secondary: "lightcoral" },
    { primary: "blue", secondary: "lightblue" },
    { primary: "green", secondary: "lightgreen" },
    { primary: "yellow", secondary: "lightyellow" },
    { primary: "orange", secondary: "orange" },
    { primary: "purple", secondary: "purple" },
    { primary: "brown", secondary: "lightbrown" }
];

interface ColorScheme {
    light: string;
    dark: string;
}

interface GlobalColorsType {
    backgroundColor: ColorScheme;
    writingColor: ColorScheme;
}

export const GlobalColors: GlobalColorsType = {
    backgroundColor: { light: "#F3F4F8", dark: "#0D0E1C" },
    writingColor: { light: "#0D0E1C", dark: "#F3F4F8" }
};

