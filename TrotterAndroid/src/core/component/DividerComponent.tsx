import {StyleSheet, Text, View} from "react-native";

type DividerParams = {
  text: string
}

const DividerComponent = ({text}: DividerParams) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}/>
      <Text>
        {text}
      </Text>
      <View style={styles.divider}/>
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: "40%",
    borderColor: "#16161A",
    borderWidth: 0.5,
  }
});

export default DividerComponent;