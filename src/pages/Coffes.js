import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircularCarousel } from "../components/CircularCarousel/CircularCarousel";
import { useFonts } from "@expo-google-fonts/belleza";
import styles from "../styles/MainPages/DrinksStyles";
import { FontAwesome } from "@expo/vector-icons";
import PressComponent from "../components/PressableComponent";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const data = [
  {
    id: 11,
    image: require("../assets/images/Coffes/Capuccino.png"),
    characteristic: "Capuccino",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 12,
    image: require("../assets/images/Coffes/Affogato.png"),
    characteristic: "Affogato",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 13,
    image: require("../assets/images/Coffes/Mochaccino.png"),
    characteristic: "Mochaccino",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 14,
    image: require("../assets/images/Coffes/Machiatto.png"),
    characteristic: "Machiatto",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 15,
    image: require("../assets/images/Coffes/Latte.png"),
    characteristic: "Latte",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 16,
    image: require("../assets/images/Coffes/Frappe.png"),
    characteristic: "Frappe",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 17,
    image: require("../assets/images/Coffes/Smoothie.png"),
    characteristic: "Smoothie",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 18,
    image: require("../assets/images/Coffes/IcedMocha.png"),
    characteristic: "Mocha Gelado",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 19,
    image: require("../assets/images/Coffes/Coffe.png"),
    characteristic: "Café",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 20,
    image: require("../assets/images/Coffes/IcedCoffe.png"),
    characteristic: "Café Gelado",
    icon: require("../assets/images/HeartNaked.png"),
  },
  { image: require("../assets/images/Coffes/Frame.png") },
];

export default function Coffes() {
  const [activeImage, setActiveImage] = useState(data[0].image);
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const textoAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(translateX.value) }] };
  });

  const iconeAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(-translateX.value) }] };
  });

  const changeRoleta = (image, direction) => {
    setActiveImage(image);
    if (direction === "up") {
      translateX.value = -300;
    }
  };

  const resetRoleta = () => {
    translateX.value = 0;
  };

  const [fontsLoaded] = useFonts({
    Belleza: require("../assets/fonts/Belleza/Belleza-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <ImageBackground
        source={activeImage}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.60)",
          }}
        />

        {/* Cabeçalho com botões */}
        <View style={styles.header}>
          <PressComponent
            onPress={() => navigation.navigate("Perfil", { token })}
            source={require("../assets/images/Bars.png")}
            styleI={styles.headerTab}
          />
          <Animated.View style={iconeAnimated}>
            <PressComponent
              onPress={() => navigation.navigate("Perfil")}
              source={require("../assets/images/Person.png")}
              styleI={styles.headerPerson}
            />
          </Animated.View>
        </View>

        <Animated.Text
          style={[styles.choose, textoAnimated, { fontFamily: "Belleza" }]}
        >
          Escolha seu Café
        </Animated.Text>

        <View style={styles.drinkSelection}>
          <PressComponent
            onPress={() => navigation.navigate("Drinks")}
            source={require("../assets/images/FirstTab.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            source={require("../assets/images/SecondTabSec.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            onPress={() => navigation.navigate("Juices")}
            source={require("../assets/images/ThirdTab.png")}
            styleI={styles.hexagon}
          />
        </View>

        <CircularCarousel
          data={data}
          onImageChange={changeRoleta}
          onReset={resetRoleta}
          fontFamily="Belleza"
        />

        {/*Barra de navegação*/}
        <View style={styles.tabss}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Drinks")}
            style={styles.homeButton}
          >
            <FontAwesome name="home" size={24} color="#FFD700" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("FavoritesBack")}
            style={styles.favsButton}
          >
            <FontAwesome name="heart" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
