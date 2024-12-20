import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Pressable,
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
  const [userId, setUserId] = useState(null);
  const [selectedButton, setSelectedButton] = React.useState("l");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const removeFavorite = async (productId) => {
    try {
      await axios.delete(
        `http://${IP_URL}:3000/favorites/${userId}/${productId}`
      );
      setFavorites((prev) =>
        prev.filter((fav) => fav.product_id !== productId)
      );
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const openModal = (item) => {
    setCurrentItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const getUserFavorites = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        console.log("Pegando Token ", savedToken);

        if (savedToken) {
          const decodedToken = jwtDecode(savedToken);
          const userId = decodedToken.id;
          setUserId(userId);

          // Passa o savedToken para fetchFavorites
          const userFavorites = await fetchFavorites(userId, savedToken);
          setFavorites(userFavorites);
          console.log("Eu sou o userFavorite:    ", userFavorites);
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

  useEffect(() => {
    const updateLiked = () => {
      const initialLiked = imagenes.reduce((acc, item) => {
        acc[item.product_id] = favorites.some(
          (fav) => fav.product_id === item.product_id
        );
        return acc;
      }, {});
      setLiked(initialLiked);
    };
    updateLiked();
  }, [favorites]);

  const toggleLike = (id) => {
    if (liked[id]) {
      const item = imagenes.find((img) => img.product_id === id);
      openModal(item);
    } else {
      setLiked((prevLiked) => ({
        ...prevLiked,
        [id]: true,
      }));
    }
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

      {/* Mensagem caso favoritos estejam vazios */}
      {filteredImages.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            Você ainda não tem favoritos. Adicione alguns para vê-los aqui!
          </Text>
        </View>
      )}
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
        decelerationRate="fast"
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
          onPress={() => navigation.navigate("Drinks")}
          style={styles.homeButton}
        >
          <FontAwesome name="home" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={styles.favsButton}
        >
          <FontAwesome name="heart" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={closeModal}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Tem certeza que deseja remover essa bebida da lista de favoritos?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.modalButtonYes}
            onPress={() => {
              if (currentItem) {
                removeFavorite(currentItem.product_id);
                setLiked((prevLiked) => ({
                  ...prevLiked,
                  [currentItem.product_id]: false,
                }));
              }
              closeModal();
            }}
          >
            <Text style={styles.modalButtonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonCancel}
            onPress={closeModal}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>;
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
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 25,
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
    width: "90%",
    height: 70,
    position: "absolute",
    bottom: "4%",
    left: "5%",
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
    padding: 15,
    zIndex: 2,
  },

  headerTab: {
    marginLeft: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyMessage: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },

  headerPerson: {
    width: 60,
    height: 60,
  },

  choose: {
    color: "white",
    width: "65%",
    fontSize: 47,
    //position: "absolute",
    marginLeft: "4%",
    zIndex: 2,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButtonYes: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#DDD",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
