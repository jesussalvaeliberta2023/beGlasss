import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircularCarousel } from "../components/CircularCarousel/CircularCarousel";
import { useFonts } from "@expo-google-fonts/belleza";
import styles from "../styles/StyleSheet";
import PressComponent from "../components/PressableComponent";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";


const data = [
  {
    id: 1,
    image: require("../assets/images/Drinks/Caipirinha.png"),
    characteristic: "Caipirinha",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 2,
    image: require("../assets/images/Drinks/MoscowMule.png"),
    characteristic: "Moscow Mule",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 3,
    image: require("../assets/images/Drinks/Sangria.png"),
    characteristic: "Sangria",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 4,
    image: require("../assets/images/Drinks/Margarita.png"),
    characteristic: "Margarita",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 5,
    image: require("../assets/images/Drinks/VirginOnTheBeach.png"),
    characteristic: "Virgin On The Beach",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 6,
    image: require("../assets/images/Drinks/Mojito.png"),
    characteristic: "Mojito",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 7,
    image: require("../assets/images/Drinks/PinaColada.png"),
    characteristic: "Pina Colada",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 8,
    image: require("../assets/images/Drinks/BlueHawaiian.png"),
    characteristic: "Blue Hawaiian",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 9,
    image: require("../assets/images/Drinks/Flower.png"),
    characteristic: "Flower",
    icon: require("../assets/images/HeartNaked.png"),
  },
  {
    id: 10,
    image: require("../assets/images/Drinks/WattermelonSlushie.png"),
    characteristic: "Wattermelon Slushie",
    icon: require("../assets/images/HeartNaked.png"),
  },
  { id: 11, image: require("../assets/images/Drinks/Frame.png") },
];

export default function Drinks() {
  const route = useRoute();
  const { token } = route.params || {};

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
        {/* Overlay para dar efeito escuro no fundo */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.60)",
          }}
        />

        {/* Cabeçalho com botões */}
        <View style={styles.headerD}>
          <PressComponent
            onPress={() => navigation.navigate("Perfil", { token })}
            source={require("../assets/images/Bars.png")}
            styleI={styles.headerOp}
          />
          <Animated.View style={iconeAnimated}>
            <PressComponent
              onPress={() => navigation.navigate("Login")}
              source={require("../assets/images/Person.png")}
              styleI={styles.headerPe}
            />
          </Animated.View>
        </View>

        {/* Título */}
        <Animated.Text
          style={[styles.choose, textoAnimated, { fontFamily: "Belleza" }]}
        >
          Escolha seu Drink
        </Animated.Text>

        {/* Seção de seleção de bebidas */}
        <View style={styles.drinkSelection}>
          <PressComponent
            source={require("../assets/images/FirstTabSec.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            onPress={() => navigation.navigate("Coffes")}
            source={require("../assets/images/SecondTab.png")}
            styleI={styles.hexagon}
          />
          <PressComponent
            onPress={() => navigation.navigate("Juices")}
            source={require("../assets/images/ThirdTab.png")}
            styleI={styles.hexagon}
          />
        </View>

        {/* Carrossel Circular */}
        <CircularCarousel
          data={data}
          onImageChange={changeRoleta}
          onReset={resetRoleta}
          fontFamily="Belleza"
        />

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
      </ImageBackground>
    </View>
  );
}
