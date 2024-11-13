import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Chamadas de Icons
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

//Chamada de Componentes
import IP_URL from "../components/IP";
import PressComponent from "../components/PressableComponent";
import imagenes from "../components/DrinksImagesComponent";

// Dimensões da tela
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// Constantes de layout
const CONTAINER_WIDTH = width * 0.7;
const SPACE_CONTAINER = (width - CONTAINER_WIDTH) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 1;

function Backdrop({ scrollX, filteredImages }) {
  return (
    <View
      style={[
        { position: "absolute", height: ALTURA_BACKDROP, top: 0, width: width },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {filteredImages.map((imagen, index) => {
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
            key={imagen.product_id}
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

const fetchFavorites = async (userId) => {
  try {
    const response = await axios.get(
      `http://${IP_URL}:3000/favorites/${userId}`
    );

    console.log(response.data);
    return response.data; // Retorna a lista de favoritos
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return [];
  }
};

export default function Favorites() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para o modal
  const [userId, setUserId] = useState(null);
  const [selectedButton, setSelectedButton] = React.useState("l");

  useEffect(() => {
    const getUserFavorites = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        console.log("Pegando Token ", savedToken);

        if (savedToken) {
          const decodedToken = jwtDecode(savedToken);
          const userId = decodedToken.id;
          setUserId(userId);

          const userFavorites = await fetchFavorites(userId, savedToken);
          setFavorites(userFavorites);

          // Exibir modal se a lista de favoritos estiver vazia
          if (userFavorites.length === 0) {
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    getUserFavorites();
  }, []);

  const filteredImages = imagenes.filter((img) =>
    favorites.some((fav) => fav.product_id === img.product_id)
  );

  console.log("Favorites:", favorites);
  console.log("Filtered Images:", filteredImages);

  const [liked, setLiked] = React.useState(
    imagenes.reduce((acc, item) => {
      acc[item.product_id] = false;
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
    <SafeAreaView style={favorites.length === 0 ? styles.emptyContainer : styles.container}>
      <StatusBar hidden />

      {/* Modal para mensagem de favoritos vazios */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Você ainda não tem bebidas favoritedas!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      <Text style={[styles.choose]}>Favoritos</Text>

      <View style={styles.topBar}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "coffee" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("coffee")}
        >
          <FontAwesome6
            name="mug-hot"
            size={24}
            color={selectedButton === "coffee" ? "#000" : "#FFFFFF"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "Suco" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("Suco")}
        >
          <FontAwesome6
            name="glass-water"
            size={24}
            color={selectedButton === "cocktail" ? "#000" : "#FFFFFF"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "drink" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("drink")}
        >
          <FontAwesome6
            name="martini-glass"
            size={24}
            color={selectedButton === "drink" ? "#000" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      <Backdrop scrollX={scrollX} filteredImages={filteredImages} />

      <Animated.FlatList
        data={filteredImages}
        keyExtractor={(item) => item.product_id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 190,
          paddingHorizontal: SPACE_CONTAINER,
        }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
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
                  padding: 0,
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <View
                  style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
                >
                  <Text style={{ fontSize: 22, color: "#fff" }}>
                    {item.title}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => toggleLike(item.product_id)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 2,
                  }}
                >
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={liked[item.product_id] ? "#FF0000" : "#FFFFFF"}
                  />
                </TouchableOpacity>

                <Image source={item.image} style={styles.posterImage} />
              </Animated.View>
            </View>
          );
        }}
      />

      <View style={styles.tabss}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Perfil")}
        >
          <FontAwesome6 name="user" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <FontAwesome name="heart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Cor neutra para o fundo
    justifyContent: "center",
    alignItems: "center",
  },

  // Estilos do modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },

  modalButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ... Resto dos estilos já existentes
});
