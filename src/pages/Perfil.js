import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IP_URL from "../components/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import DrinksData from "../components/DrinksData";
import axios from "axios";

const Perfil = ({ route }) => {
  const username = route?.params?.username;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken"); // Recupera o token do AsyncStorage
        console.log("Token recuperado:", savedToken);

        if (!savedToken) {
          console.log("Acesso Negado");
          Alert.alert(
            'Acesso Negado', // Título do alerta
            'Você deve realizar o login para poder entrar.', // Mensagem do alerta
            [
              {
                text: 'Cancelar', // Botão de cancelamento
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {
                text: 'OK', // Botão para ir ao login
                onPress: () => navigation.navigate('Login'),
              },
            ]
          );
          setLoading(false);
          return;
        }

        // Decodificar o token
        const decodedToken = jwtDecode(savedToken);
        console.log("Token decodificado:", decodedToken);

        // Extrair o nome do usuário do token
        const emailFromToken = decodedToken.email;
        const usernameFromToken = decodedToken.username;
        console.log(
          "Nome de usuário e email do token:",
          usernameFromToken,
          emailFromToken
        );

        // Buscar informações do usuário
        const userResponse = await axios.get(
          `http://${IP_URL}:3000/perfil/${usernameFromToken}`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        if (userResponse.status === 200) {
          setUser(userResponse.data); // Define os dados do usuário
        } else {
          setError("Usuário não encontrado");
        }

        // Buscar as reviews do usuário
        const reviewsResponse = await axios.get(
          `http://${IP_URL}:3000/procurarReviews?autor=${usernameFromToken}`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        if (reviewsResponse.status === 200) {
          setReviews(reviewsResponse.data); // Define as reviews do usuário
          console.log("Reviews recuperadas:", JSON.stringify(reviewsResponse.data, null, 2));
        } else {
          setError("Nenhuma review encontrada");
        }
      } catch (error) {
        if (__DEV__) {
          console.error("Erro ao buscar o perfil:", error); // Log de erro apenas em desenvolvimento
        }
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            setError("Sessão expirada, faça login novamente.");
          } else if (error.response.status === 404) {
            setError("Usuário não encontrado.");
          } else {
            setError("Erro ao carregar o perfil. Tente novamente mais tarde.");
          }
        } else if (error.request) {
          setError("Erro de rede. Verifique sua conexão.");
        } else {
          setError("Erro desconhecido. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      Alert.alert("Logout", "Você foi desconectado com sucesso.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao tentar fazer logout:", error);
      Alert.alert("Erro", "Não foi possível desconectar.");
    }
  };

  const renderStarsReviews = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={13}
          color="#FFD700"
        />
      );
    }
    return stars;
  };


  const renderReview = ({ item }) => {
    // Define a imagem diretamente
    const drinkImage = DrinksData[item.produto - 1]?.image;
  
    return (
      <View style={styles.reviewCard}>
        {drinkImage ? (
          <Image source={drinkImage} style={styles.drinkImage} />
        ) : (
          <Text style={styles.drinkText}>Imagem não disponível</Text>
        )}
        <View style={styles.reviewText}>
          <Text style={styles.drinkTitle}>{item.autor}</Text>
          <View style={styles.ratingContainer}>
            {renderStarsReviews(item.nota)}
          </View>
          <Text style={styles.drinkText}>{item.comentario}</Text>
        </View>
      </View>
    );
  };
  
  
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Drinks/PinaColada.png")}
          style={styles.profileImage}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user ? user.username : "Carregando..."}
          </Text>
          <Text style={styles.email}>
            {user ? user.email : "Carregando email..."}
          </Text>
          <Text style={styles.rating}>4.5 ★</Text>
        </View>
      </View>

      <View style={styles.feedbacks}>
        <Text style={styles.sectionTitle}>Suas avaliações</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          style={styles.reviewList}
        />
      </View>

      <Button title="Voltar" onPress={() => navigation.navigate("Drinks")} />
      <Button title="Sair" style={{ marginTop: 30 }} onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1b29",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#252239",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
  },
  rating: {
    color: "#ffd700",
    marginTop: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
  },
  reviewList: {
    paddingHorizontal: 20,
  },
  reviewCard: {
    flexDirection: "row",
    backgroundColor: "#2c2b39",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  drinkImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  reviewText: {
    marginLeft: 10,
    flex: 1,
  },
  drinkTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  drinkText: {
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: "row", // Alinha as estrelas horizontalmente
    marginVertical: 5, // Adiciona um espaço vertical
  },
});

export default Perfil;
