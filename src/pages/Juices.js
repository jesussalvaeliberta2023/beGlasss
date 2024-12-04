import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CircularCarousel } from "../components/CircularCarousel/CircularCarousel";
import { useFonts } from "@expo-google-fonts/belleza";
import { FontAwesome } from "@expo/vector-icons";
import PressComponent from "../components/PressableComponent";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/MainPages/DrinksStyles";
import { useRoute } from "@react-navigation/native";
import IP_URL from "../components/IP";

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
  const route = useRoute();
  const { token } = route.params || {};

  const navigation = useNavigation();
  const [user, setUser] = useState(null); // Armazena os dados do usuário decodificado
  const [userImage, setUserImage] = useState(null);  // Para armazenar a imagem do usuário
 
  const translateX = useSharedValue(0);
  
  const [activeImage, setActiveImage] = useState(data[0].image);
  const [fontsLoaded] = useFonts({
    Belleza: require("../assets/fonts/Belleza/Belleza-Regular.ttf"),
  });

  const textoAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(translateX.value) }] };
  });

  const iconeAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(-translateX.value) }] };
  });

  useEffect(() => {
    const fetchUser = async () => {
      
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        if (!savedToken) {
          console.log("Acesso Negado");
          Alert.alert("Acesso Negado", "Você deve realizar o login para poder entrar.");
          return;
        }

        // Decodificar o token JWT para obter o username
        const decodedToken = jwtDecode(savedToken);
        const usernameFromToken = decodedToken.username;

        // Armazenar o usuário no estado
        setUser(decodedToken);

        // Buscar os dados do perfil do usuário no backend
        const userResponse = await axios.get(`http://${IP_URL}:3000/perfil/${usernameFromToken}`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        if (userResponse.status === 200) {
          const user = userResponse.data;
          if (user.userImage) {
            setUserImage({ uri: `http://${IP_URL}:3000/uploads/users/${user.userImage}` });
          } else {
            setUserImage(require("../assets/images/Person.png")); // Imagem padrão caso o usuário não tenha imagem
          }
        } else {
          setUserImage(require("../assets/images/Person.png"));
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário", error);
        setUserImage(require("../assets/images/Person.png"));
      } finally {
        
      }
    };

    fetchUser();
  }, [user]); // Rodar apenas ao montar o componente




  const changeRoleta = (image, direction) => {
    setActiveImage(image);
    if (direction === "up") {
      translateX.value = -300;
    }
  };


  
  const resetRoleta = () => {
    translateX.value = 0;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
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

        <View style={styles.header}>
          <PressComponent
            onPress={() => navigation.navigate("Perfil")}
            source={require("../assets/images/Bars.png")}
            styleI={styles.headerTab}
          />
          <Animated.View style={iconeAnimated}>
            <PressComponent
              onPress={() => navigation.navigate("Perfil")}
              source={userImage || require("../assets/images/Ameinda.png")}
              styleI={styles.headerPerson}
            />
          </Animated.View>
        </View>

        <Animated.Text
          style={[styles.choose, textoAnimated, { fontFamily: "Belleza" }]}
        >
          Escolha seu Drink
        </Animated.Text>

      {/* Seção de seleção de bebidas */}
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
            onPress={() => navigation.navigate("Juices")}
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

        <View style={styles.tabss}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Drinks")}
            style={styles.homeButton}
          >
            <FontAwesome name="home" size={24} color="#FFD700" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
            style={styles.favsButton}
          >
            <FontAwesome name="heart" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
