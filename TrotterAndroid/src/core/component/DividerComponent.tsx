import {StyleSheet, Text, View} from "react-native";

type DividerParams = {
  text?: string,
}

const DividerComponent = ({text}: DividerParams) => {
  return (
    <View style={styles({text}).container}>
      {text ? (
        <>
          <View style={styles({text}).divider}/>
            <Text>
              {text}
            </Text>
          <View style={styles({text}).divider}/>
        </>
        ) : (
        <View style={styles({text}).divider}/>
      )}
    </View>
  )
}

const styles = ({text}: DividerParams) => StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 15,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    width: text ? "40%" : "100%",
    borderColor: "#16161A",
    borderWidth: 0.5,
  }
});

export default DividerComponent;