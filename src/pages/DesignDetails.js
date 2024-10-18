import React from "react";
import { View, StyleSheet, StatusBar, Text, ActivityIndicator } from "react-native";
import { useFonts } from "@expo-google-fonts/belleza";
import PressComponent from "../components/PressableComponent";

export default function DesignDetails() {

  const [fontsLoaded] = useFonts({
    Belleza: require("../assets/fonts/Belleza/Belleza-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

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

      <View style={styles.informations}>
        <Text style={styles.drink}>Caipirinha</Text>
        <Text style={styles.description}>Uma versão sem álcool da mais famosa bebida brasileira.</Text>
        <Text style={styles.stars}>★★★☆☆</Text>
      </View>

    </View>
)};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FF0000",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  headerTab: {
    marginLeft: 15,
  },

  headerPerson: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  drink:{
    fontSize: 40,
  }
});