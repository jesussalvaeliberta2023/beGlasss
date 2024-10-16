import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import PressComponent from "../components/PressableComponent";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

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
const { width, height } = Dimensions.get("window");

// Definindo Tamanhos
const CONTAINER_WIDTH = width * 0.6;
const SPACE_CONTAINER = (width - CONTAINER_WIDTH) / 2;
const ESPACIO = 6;
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

        const animatedStyle = useAnimatedStyle(() => {
          const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0]);
          return { opacity };
        });

        return (
          <Animated.Image
            key={imagen.id}
            source={imagen.image}
            style={[
              { width: width, height: ALTURA_BACKDROP },
              animatedStyle,
              StyleSheet.absoluteFillObject,
            ]}
            resizeMode="cover"
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "black"]}
        style={{
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function Favorites() {
  const scrollX = useSharedValue(0);
  const navigation = useNavigation();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * CONTAINER_WIDTH,
      index * CONTAINER_WIDTH,
      (index + 1) * CONTAINER_WIDTH,
    ];

    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollX.value,
        inputRange,
        [50, 0, 50]
      );
      return { transform: [{ translateY }] };
    });

    return (
      <View style={{ width: CONTAINER_WIDTH }}>
        <Animated.View
          style={[
            {
              marginHorizontal: ESPACIO,
              padding: ESPACIO,
              borderRadius: 34,
              backgroundColor: "#fff",
              alignItems: "center",
            },
            animatedStyle,
          ]}
        >
          <Image source={item.image} style={styles.posterImage} />
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>{item.title}</Text>
          <FontAwesome name="heart" size={24} color="white" style={styles.heartIcon} />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
       {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favoritos</Text>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} 
          style={styles.profilePic} 
        />
        */}
      </View>
      <Text style={styles.subtitle}>Veja suas bebidas salvas</Text>
      <View style={styles.categoryContainer}>
        <FontAwesome name="coffee" size={40} color="#fff" />
        <FontAwesome name="glass" size={40} color="#FFCF47" />
        <FontAwesome name="cocktail" size={40} color="#fff" />
      </View>
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={imagenes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: SPACE_CONTAINER,
        }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
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
          styleI={[styles.literlyButton, { marginTop: -11, tintColor: "#ffffff" }]}
          styleP={styles.favsButton}
        />
      </View>
    </SafeAreaView>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131A22",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    paddingLeft: 20,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  posterImage: {
    width: "100%",
    height: CONTAINER_WIDTH * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  tabss: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});