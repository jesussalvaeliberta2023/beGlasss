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
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import IP_URL from "../components/IP";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons'; // Importando Ionicons

export default function Drink() {
  // Hooks devem ser usados no topo do componente, sem condicional
  const navigation = useNavigation();
  const route = useRoute();
  const { id, image, data } = route.params; // Recebe os parâmetros da rota

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [comment, setComment] = useState(""); // Estado para o comentário
  const [rating, setRating] = useState(0); // Estado para a nota (estrelas)


  const submitReview = () => {
    const reviewData = {
      produto: id, // O ID do produto
      comentario: comment,
      nota: rating,
    };

    axios
      .post(`http://${IP_URL}:3000/reviews`, reviewData)
      .then((response) => {
        console.log("Review enviada com sucesso", response.data);
        setModalVisible(false);
        setComment("");
        setRating(0);
      })
      .catch((error) => {
        console.error("Erro ao enviar a review", error);
      });
  };


  useEffect(() => {
    console.log("ID recebido:", id);

    axios
      .get(`http://${IP_URL}:3000/produtos/${id}`)
      .then((response) => {
        setDrink(response.data);
        setLoading(false);
        console.log("Buscando Bebidas")
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
            name={i <= rating ? "star" : "star-outline"} // Estrelas preenchidas ou contorno
            size={30}
            color="#FFD700" // Cor dourada para as estrelas
          />
        </Pressable>
      );
    }
    return stars;
  };


  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        {/* Botão no canto superior esquerdo */}
        <Pressable
          style={[styles.backButton, { paddingTop: 15 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.backButtonText}>Ir para a Login</Text>
        </Pressable>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{drink.name}</Text>
        <Text style={styles.description}>{drink.description}</Text>
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

              <Button
                title="Enviar"
                onPress={submitReview}
              />
              
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
});
