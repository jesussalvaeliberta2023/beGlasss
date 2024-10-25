import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PressComponent from "../components/PressableComponent";

// Dados das bebidas com título e imagem
const imagenes = [
  { id: "1", title: "Caipirinha", image: require("../assets/images/Drinks/Caipirinha.png") },
  { id: "2", title: "Moscow Mule", image: require("../assets/images/Drinks/MoscowMule.png") },
  { id: "3", title: "Sangria", image: require("../assets/images/Drinks/Sangria.png") },
  { id: "4", title: "Margarita", image: require("../assets/images/Drinks/Margarita.png") },
  { id: "5", title: "Virgin on the Beach", image: require("../assets/images/Drinks/VirginOnTheBeach.png") },
  { id: "6", title: "Mojito", image: require("../assets/images/Drinks/Mojito.png") },
  { id: "7", title: "Piña Colada", image: require("../assets/images/Drinks/PinaColada.png") },
  { id: "8", title: "Blue Hawaiian", image: require("../assets/images/Drinks/BlueHawaiian.png") },
  
];

// Dimensões da tela
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// Constantes de layout
const CONTAINER_WIDTH = width * 0.7;
const SPACE_CONTAINER = (width - CONTAINER_WIDTH) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 1;

function Backdrop({ scrollX }) {
  return (
    <View style={[{ position: "absolute", height: ALTURA_BACKDROP, top: 0, width: width }, StyleSheet.absoluteFillObject]}>
      {imagenes.map((imagen, index) => {
        const inputRange = [(index - 1) * CONTAINER_WIDTH, index * CONTAINER_WIDTH, (index + 1) * CONTAINER_WIDTH];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={imagen.id}
            source={imagen.image}
            style={[{ width: width, height: ALTURA_BACKDROP, opacity: opacity }, StyleSheet.absoluteFillObject]}
          />
        );
      })}
      <LinearGradient colors={["transparent", "black"]} style={{ width, height: ALTURA_BACKDROP, position: "absolute", bottom: 0 }} />
    </View>
  );
}

export default function Favorites() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = React.useState("l");

   const translateX = useSharedValue(0);

  const textoAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(translateX.value) }] };
  });

  const iconeAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(-translateX.value) }] };
  });



  const [liked, setLiked] = React.useState(
    imagenes.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

  const toggleLike = (id) => {
    setLiked((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

       {/* Cabeçalho com botões */}
       <View style={styles.header}>
          <PressComponent
            onPress={() => navigation.navigate("Perfil", { token })}
            source={require("../assets/images/Bars.png")}
            styleI={styles.headerTab}
          />
          <View>
            <PressComponent
              onPress={() => navigation.navigate("Perfil")}
              source={require("../assets/images/Person.png")}
              styleI={styles.headerPerson}
            />
          </View>
        </View>

        {/* Título */}
        <Text
          style={[styles.choose]}
        >
          Favoritos
        </Text>


      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.button, selectedButton === "coffee" && styles.selectedButton]}
          onPress={() => setSelectedButton("coffee")}
        >
          <FontAwesome6 name="mug-hot" size={24} color={selectedButton === "coffee" ? "#000" : "#FFFFFF"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedButton === "Suco" && styles.selectedButton]}
          onPress={() => setSelectedButton("Suco")}
        >
          <FontAwesome6 name="glass-water" size={24} color={selectedButton === "cocktail" ? "#000" : "#FFFFFF"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedButton === "drink" && styles.selectedButton]}
          onPress={() => setSelectedButton("drink")}
        >
          <FontAwesome6 name="martini-glass" size={24} color={selectedButton === "drink" ? "#000" : "#FFFFFF"} />
        </TouchableOpacity>
      </View>

      <Backdrop scrollX={scrollX} />

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{ paddingTop: 150, paddingHorizontal: SPACE_CONTAINER }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * CONTAINER_WIDTH, index * CONTAINER_WIDTH, (index + 1) * CONTAINER_WIDTH];
          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          return (
            <View style={{ width: CONTAINER_WIDTH }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: 0,
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <View style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
                  <Text style={{ fontSize: 22, color: "#fff" }}>{item.title}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => toggleLike(item.id)}
                  style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
                >
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={liked[item.id] ? "#FF0000" : "#FFFFFF"} // Cor vermelha para o coração "curtido"
                  />
                </TouchableOpacity>

                <Image source={item.image} style={styles.posterImage} />
              </Animated.View>
            </View>
          );
        }}
      />

      {/*Barra de navegação*/}
      <View style={styles.tabss}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Drinks")}
          style={styles.homeButton}
        >
          <FontAwesome
            name="home"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={styles.favsButton}
        >
          <FontAwesome
            name="heart"
            size={24}
            color="#FFD700"
          />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos
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

  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 2,
  },

  button: {
    width: 60,
    height: 60,
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedButton: {
    backgroundColor: "#FFD700",
  },

  tabss: {
    backgroundColor: "#00000090",
    width: "60%",
    height: 70,
    position: "absolute",
    bottom: "4%",
    left: "15%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  homeButton: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  favsButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    zIndex:2,
  },

  headerTab: {
    marginLeft: 15,
  },

  headerPerson: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  choose: {
    color: "white",
    width: "65%",
    fontSize: 47,
    //position: "absolute",
    marginLeft: "4%",
    zIndex:2,
  },
});
