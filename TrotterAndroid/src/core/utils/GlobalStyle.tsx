import {StyleSheet} from "react-native";

export const textStyle = StyleSheet.create({
    title : {
        padding: 25,
        color: "#000",
        textAlign: "center",
        fontSize: 28,
        fontStyle: "normal",
        fontWeight: "700",
    }
})

export const weekColors: { primary: string; secondary: string }[] = [
    { primary: "red", secondary: "lightcoral" },
    { primary: "blue", secondary: "lightblue" },
    { primary: "green", secondary: "lightgreen" },
    { primary: "yellow", secondary: "lightyellow" },
    { primary: "orange", secondary: "orange" },
    { primary: "purple", secondary: "purple" },
    { primary: "brown", secondary: "lightbrown" }
];
