import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Button,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function Drink() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, image } = route.params || {};

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]); // Estado para armazenar as reviews
  const [averageRating, setAverageRating] = useState(0); // Estado para a média das avaliações

  // Função para buscar notas do produto
  const fetchReviews = async () => {
    try {
      console.log("Buscando a média das notas para o produto ID:", id);
      const response = await axios.get(`http://${IP_URL}:3000/notas/${id}`); // Ajustado para passar o ID diretamente na URL
      if (response.data) {
        console.log("Média das notas:", response.data.mediaNota);
        setAverageRating(Math.round(response.data.mediaNota)); // Armazena a média das notas arredondada
      }
    } catch (error) {
      console.error("Erro ao buscar reviews", error);
    }
  };

  // Função para enviar review
  const submitReview = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (!savedToken) {
        console.error("Nenhum token encontrado. É necessário fazer login.");
        return;
      }

      const decodedToken = jwtDecode(savedToken);
      const usernameFromToken = decodedToken.username;

      const reviewData = {
        autor: usernameFromToken,
        produto: id,
        comentario: comment,
        nota: rating,
      };

      await axios.post(`http://${IP_URL}:3000/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      console.log("Review enviada com sucesso");
      setModalVisible(false);
      setComment("");
      setRating(0);
      fetchReviews(); // Atualiza a média após enviar a review
    } catch (error) {
      console.error("Erro ao enviar a review", error);
    }
  };

  useEffect(() => {
    const fetchDrinkData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await axios.get(`http://${IP_URL}:3000/produtos/${id}`);
          if (response.data) {
            setDrink(response.data);
          } else {
            console.error("Nenhum dado da bebida encontrado");
            return;
          }
          await fetchReviews(); // Carrega as reviews associadas
        } catch (error) {
          console.error("Erro ao buscar dados da bebida ou reviews:", error);
        } finally {
          setLoading(false); // Termina o estado de carregamento
        }
      } else {
        console.error("ID não encontrado");
        setLoading(false); // Para o carregamento
      }
    };

    fetchDrinkData();
  }, [id]);

  // Renderização condicional
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando</Text>
      </View>
    );
  }

  if (!drink) {
    return <Text>Erro ao carregar o produto</Text>;
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Pressable key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={30}
            color="#FFD700"
          />
        </Pressable>
      );
    }
    return stars;
  };

  const renderStarsReviews = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= averageRating ? "star" : "star-outline"}
          size={30}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        <Pressable
          style={[styles.backButton, { paddingTop: 15 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{drink.name}</Text>
        <Text style={styles.description}>{drink.description}</Text>

        {/* Impressão das notas */}
        <Text style={styles.reviewsTitle}>Avaliação:</Text>

        <View style={styles.reviewContainer}>
          {averageRating > 0 ? (
            renderStarsReviews() // Renderiza as estrelas baseadas na média
          ) : (
            <Text>Ainda não há avaliações.</Text> // Mensagem quando não há avaliações
          )}
        </View>

        <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
        <Text style={styles.ingredients}>{drink.recipe}</Text>
        <Text style={styles.howToMakeTitle}>Modo de Preparo:</Text>
        <Text style={styles.howToMake}>{drink.comofazer}</Text>

        <Pressable
          style={styles.commentButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.commentButtonText}>Fazer Comentário</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Deixe seu comentário</Text>
              <TextInput
                style={styles.input}
                placeholder="Escreva seu comentário"
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
              />
              <Text style={styles.ratingTitle}>Dê uma nota:</Text>
              <View style={styles.starsContainer}>{renderStars()}</View>
              <Button title="Enviar" onPress={submitReview} />
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 20,
  },
  howToMakeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  howToMake: {
    fontSize: 16,
  },
  ScrollView: {
    flex: 1,
  },
  commentButton: {
    backgroundColor: "#00ADEF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  commentButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  backButton: {
    marginVertical: 10,
  },
  backButtonText: {
    color: "#00ADEF",
    fontSize: 16,
  },
});
