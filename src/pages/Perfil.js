import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Perfil = () => {
  const IP_URL = "10.144.170.57";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('userToken'); // Pega o token do AsyncStorage

        if (savedToken) {
          const response = await axios.get(`http://${IP_URL}:3000/perfil`, {
            headers: {
              Authorization: `Bearer ${savedToken}`, // Passa o token no cabeçalho
            },
          });

          if (response.status === 200) {
            setUser(response.data); // Define os dados do usuário
          } else {
            setError("Usuário não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar o perfil:", error);
        setError("Erro ao carregar o perfil");
      } finally {
        setLoading(false); // Para a animação de carregamento
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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
console.log(username)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/Drinks/PinaColada.png')}
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
