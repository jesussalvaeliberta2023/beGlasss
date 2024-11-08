import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircularCarousel } from "../components/CircularCarousel/CircularCarousel";
import { useFonts } from "@expo-google-fonts/belleza";
import styles from "../styles/DrinksStyles";
import PressComponent from "../components/PressableComponent";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const data = [
  {
    id: 21,
    image: require("../assets/images/Juices/GreenJuice.png"),
    characteristic: "Suco Verde",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 22,
    image: require("../assets/images/Juices/OrangeCarrotJuice.png"),
    characteristic: "Suco de Laranja com Cenoura",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 23,
    image: require("../assets/images/Juices/TropicalJuice.png"),
    characteristic: "Suco Tropical",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 24,
    image: require("../assets/images/Juices/PineapplePassionJuice.png"),
    characteristic: "Suco de Abacaxi com Maracujá",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 25,
    image: require("../assets/images/Juices/MangoRedJuice.png"),
    characteristic: "Suco de Vermelhas com Manga",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 26,
    image: require("../assets/images/Juices/LemonTeaJuice.png"),
    characteristic: "Suco de Limão com Chá",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 27,
    image: require("../assets/images/Juices/GrapeKiwiJuice.png"),
    characteristic: "Suco de Kiwi com Uva",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 28,
    image: require("../assets/images/Juices/LemonBlackbarryJuice.png"),
    characteristic: "Suco de Limão com Amora",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 29,
    image: require("../assets/images/Juices/PinkLemonJuice.png"),
    characteristic: "Pink Limonade",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 30,
    image: require("../assets/images/Juices/DragonJuice.png"),
    characteristic: "Suco de Pitaia",
    icon: require("../assets/images/HeartNaked.png"),
  },
  { image: require("../assets/images/Juices/Frame.png") },
];

export default function Juices() {
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
          Escolha seu Suco
        </Animated.Text>

        <View style={styles.drinkSelection}>
          <PressComponent
            onPress={() => navigation.navigate("Drinks")}
            source={require("../assets/images/FirstTab.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            onPress={() => navigation.navigate("Coffes")}
            source={require("../assets/images/SecondTab.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            source={require("../assets/images/ThirdTabSec.png")}
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
