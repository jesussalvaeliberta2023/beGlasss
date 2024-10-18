import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import PressComponent from "../components/PressableComponent";

export default function DesignDetails() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <View style={styles.header}>
        <PressComponent
          onPress={() => navigation.navigate("Perfil", { token })}
          source={require("../assets/images/Bars.png")}
          styleI={styles.headerTab}
        />
        <PressComponent
          onPress={() => navigation.navigate("Login")}
          source={require("../assets/images/Person.png")}
          styleI={styles.headerPerson}
        />
      </View>
    </View>
)};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#000000",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    marginTop: 32,
    // alignItems: "center",
    // justifyContent: "center",
  },

  headerTab: {
    alignSelf: "flex-start",
  },

  headerPerson: {
    width: 60,
    height: 60,
    alignSelf: "flex-end",
  },
});