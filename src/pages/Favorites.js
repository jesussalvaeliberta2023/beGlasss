import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PressComponent from "../components/PressableComponent";
import { useNavigation } from "@react-navigation/native";

// Imagens com Títulos
const imagenes = [
  {
    id: "1",
    title: "Caipirinha",
    image: require("../assets/images/Drinks/Caipirinha.png"),
  },
  {
    id: "2",
    title: "Moscow Mule",
    image: require("../assets/images/Drinks/MoscowMule.png"),
  },
  {
    id: "3",
    title: "Sangria",
    image: require("../assets/images/Drinks/Sangria.png"),
  },
  {
    id: "4",
    title: "Margarita",
    image: require("../assets/images/Drinks/Margarita.png"),
  },
  {
    id: "5",
    title: "Virgin on the Beach",
    image: require("../assets/images/Drinks/VirginOnTheBeach.png"),
  },
  {
    id: "6",
    title: "Mojito",
    image: require("../assets/images/Drinks/Mojito.png"),
  },
  {
    id: "7",
    title: "Piña Colada",
    image: require("../assets/images/Drinks/PinaColada.png"),
  },
  {
    id: "8",
    title: "Blue Hawaiian",
    image: require("../assets/images/Drinks/BlueHawaiian.png"),
  },
];

// Medidas da tela
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// Definindo Tamanhos
const CONTAINER_WIDTH = width * 0.7;
const ESPACIO_CONTENEDOR = (width - CONTAINER_WIDTH) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 1;

function Backdrop({ scrollX }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * CONTAINER_WIDTH,
          index * CONTAINER_WIDTH,
          (index + 1) * CONTAINER_WIDTH,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={imagen.id}
            source={imagen.image}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity: opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "black"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CONTAINER_WIDTH,
            index * CONTAINER_WIDTH,
            (index + 1) * CONTAINER_WIDTH,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <View style={{ width: CONTAINER_WIDTH }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={item.image} style={styles.posterImage} />
                <Text style={{ fontWeight: "bold", fontSize: 26 }}>
                  {item.title}
                </Text>
              </Animated.View>

              {/* Barra inferior de navegação */}
              <View style={styles.tabss}>
                <PressComponent
                  onPress={() => navigation.navigate("Home")}
                  source={require("../assets/images/HomeFilled.png")}
                  styleI={[styles.literlyButton, { marginTop: -9 }]}
                  styleP={styles.homeButton}
                />
                <PressComponent
                  onPress={() => navigation.navigate("Favorites")}
                  source={require("../assets/images/HeartNaked.png")}
                  styleI={[
                    styles.literlyButton,
                    { marginTop: -11, tintColor: "#ffffff" },
                  ]}
                  styleP={styles.favsButton}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  posterImage: {
    width: "100%",
    height: CONTAINER_WIDTH * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  tabss: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
 
});
