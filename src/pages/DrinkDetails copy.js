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
import { Ionicons } from "@expo/vector-icons"; // Importando Ionicons


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

  // Função para buscar notas do produto
  const fetchReviews = async () => {
    
    try {
      const response = await axios.get(
        `http://${IP_URL}:3000/notas?produto=${id}`,
        console.log(id)
      );
      setReviews(response.data); // Armazena as reviews recebidas
      console.log("Reviews encontradas:", response.data);
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

      const response = await axios.post(
        `http://${IP_URL}:3000/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

    
      console.log("Review enviada com sucesso", response.data);
      setModalVisible(false);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Erro ao enviar a review", error);
    }
  };

// useEffect para buscar os dados da bebida e as reviews associadas pelo ID
useEffect(() => {
  const fetchDrinkData = async () => {
    console.log("ID recebido:", id); // Certifique-se de que o ID está correto

    if (id) {
      try {
        // Busca os dados da bebida
        const response = await axios.get(`http://${IP_URL}:3000/produtos/${id}`);
        
        // Verifica se os dados foram recebidos corretamente
        if (response.data) {
          setDrink(response.data);
          console.log("Bebida encontrada:", response.data);
        } else {
          console.error("Nenhum dado da bebida encontrado");
          setLoading(false);
          return;
        }

        // Aguarda o carregamento das reviews associadas
        await fetchReviews();
        console.log("Notas carregadas com sucesso");

      } catch (error) {
        console.error("Erro ao buscar dados da bebida ou reviews:", error);
      } finally {
        // Garante que o carregamento é concluído, mesmo em caso de erro
        setLoading(false);
      }
    } else {
      console.error("ID não encontrado");
      setLoading(false);
    }
  };

  fetchDrinkData();
}, [id]);



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
        <Text style={styles.reviewsTitle}>Avaliações:</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewContainer}>
              <Text style={styles.reviewAuthor}>{review.autor}</Text>
              <Text style={styles.reviewComment}>{review.comentario}</Text>
              <Text style={styles.reviewRating}>Nota: {review.nota}</Text>
            </View>
          ))
        ) : (
          <Text>Sem avaliações ainda.</Text>
        )}


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
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  reviewAuthor: {
    fontWeight: "bold",
  },
  reviewComment: {
    marginVertical: 5,
  },
  reviewRating: {
    fontStyle: "italic",
  },
});
