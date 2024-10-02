import {jwtDecode} from 'jwt-decode'
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
import axios from "axios";


const Perfil = ({ route }) => {
  const username = route?.params?.username;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken"); // Recupera o token do AsyncStorage
        console.log("Token recuperado:", savedToken);

        if (!savedToken) {
          // Exibe um alerta se não houver token e mantém o usuário na mesma página
          navigation.goBack();
          console.log("Acesso Negado");
          Alert.alert(
            "Acesso negado",
            "Você deve realizar o login para poder entrar.",

            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
          setLoading(false); // Interrompe o carregamento
          return;
        }

        // Decodificar o token
      const decodedToken = jwtDecode(savedToken);
      console.log("Token decodificado:", decodedToken);
      
      // Extrair o nome do usuário do token
      const usernameFromToken = decodedToken.username; // Acesse a propriedade correta
      console.log("Nome de usuário do token:", usernameFromToken);

        const response = await axios.get(
          `http://${IP_URL}:3000/perfil/${username}`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data); // Define os dados do usuário
        } else {
          setError("Usuário não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar o perfil:", error);
        if (error.response?.status === 403 || error.response?.status === 401) {
          // Token inválido ou expirado
          setError("Sessão expirada, faça login novamente.");
        } else {
          setError("Erro ao carregar o perfil");
        }
      } finally {
        setLoading(false); // Para a animação de carregamento
      }
    };

    fetchUser();
  }, [username]);

  //Função de Logout:
  const handleLogout = async () => {
    try {
      // Remover o token de AsyncStorage
      await AsyncStorage.removeItem("userToken");
      Alert.alert("Logout", "Você foi desconectado com sucesso.");
      // Redirecionar para a página de login
      navigation.navigate("Login"); // Altere 'Login' para o nome da sua tela de login
    } catch (error) {
      console.error("Erro ao tentar fazer logout:", error);
      Alert.alert("Erro", "Não foi possível desconectar.");
    }
  };

  const reviews = [
    {
      id: "1",
      drink: "Caipirinha",
      rating: 3.5,
      review:
        "A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.",
    },
    {
      id: "2",
      drink: "Sangria",
      rating: 4,
      review:
        "A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.",
    },
  ];

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Image source={{ uri: item.image }} style={styles.drinkImage} />
      <View style={styles.reviewText}>
        <Text style={styles.drinkTitle}>{item.drink}</Text>
        <Text style={styles.rating}>Avaliação: {item.rating} ★★★☆☆</Text>
        <Text>{item.review}</Text>
      </View>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
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

      <Text style={styles.sectionTitle}>Suas avaliações</Text>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        style={styles.reviewList}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button title="Sair" style={{ marginTop: 30 }} onPress={handleLogout} />
    </ScrollView>
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
});

export default Perfil;
