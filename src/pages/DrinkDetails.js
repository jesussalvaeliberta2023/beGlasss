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
  TouchableOpacity,
} from "react-native";

// Navegação
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

// Back-End
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";

// Ícones
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

// Começo
export default function Drink() {
  const navigation = useNavigation();
  const route = useRoute();

  // Chamada dos dados locais
  const { id, image } = route.params || {};

  // Constantes de Estado
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const [modalFavoriteVisible, setModalFavoriteVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [averageRating, setAverageRating] = useState(0); // Média das avaliações

  // Função para buscar notas do produto
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://${IP_URL}:3000/notas/${id}`);
      if (response.data) {
        setAverageRating(Math.round(response.data.mediaNota));
      }
    } catch (error) {
      console.error("Erro ao buscar reviews", error);
    }
  };

  // Função para verificar se o produto está favoritado
  const checkFavoriteStatus = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (!savedToken) {
        console.log("Nenhum token encontrado. Não é possível verificar favoritos.");
        return;
      }
  
      const decodedToken = jwtDecode(savedToken);
      const userId = decodedToken.id;
  
      const response = await axios.get(`http://${IP_URL}:3000/favorites/${userId}/${id}`);
      setIsChecked(response.data.isFavorite); // Atualiza o estado do coração
    } catch (error) {
      console.error("Erro ao verificar o status de favorito", error);
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
      setModalCommentVisible(false);
      setComment("");
      setRating(0);
      fetchReviews(); // Atualiza a média após enviar a review
    } catch (error) {
      console.error("Erro ao enviar a review", error);
    }
  };

  // Função para favoritar o produto
  const toggleFavorite = async () => {
    if (isChecked) {
      // Se o drink já está favoritado, abre o modal de confirmação para remoção
      setModalFavoriteVisible(true);
    } else {
      // Se o drink não está favoritado, favoritar diretamente
      try {
        const savedToken = await AsyncStorage.getItem("userToken");
        if (!savedToken) {
          console.error("Nenhum token encontrado. É necessário fazer login.");
          return;
        }

        const decodedToken = jwtDecode(savedToken);
        const userId = decodedToken.id; // Pega o ID do usuário do token

        const favoriteData = {
          userId, // ID do usuário
          productId: id, // ID do drink
        };

        // Envia a requisição para favoritar
        await axios.post(`http://${IP_URL}:3000/favorites`, favoriteData, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        console.log("Produto favoritado com sucesso");
        setIsChecked(true); // Atualiza o estado do coração para preenchido
        await AsyncStorage.setItem(`favorite_${id}`, "true"); // Armazena no AsyncStorage
      } catch (error) {
        console.error("Erro ao favoritar o produto", error);
      }
    }
  };

  // Função para remover o favorito
  const removeFavorite = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (!savedToken) {
        console.error("Nenhum token encontrado. É necessário fazer login.");
        return;
      }

      const decodedToken = jwtDecode(savedToken);
      const userId = decodedToken.id; // Pega o ID do usuário do token

      await axios.delete(`http://${IP_URL}:3000/favorites`, {
        data: { userId, productId: id }, // Envia o ID do usuário e do produto
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      console.log("Produto removido dos favoritos com sucesso");
      setIsChecked(false); // Atualiza o estado do coração para vazio
      await AsyncStorage.removeItem(`favorite_${id}`); // Remove do AsyncStorage
      setModalFavoriteVisible(false); // Fecha o modal após a remoção
    } catch (error) {
      console.error("Erro ao remover o produto dos favoritos", error);
    }
  };

  useEffect(() => {
    const fetchDrinkData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://${IP_URL}:3000/produtos/${id}`
          );
          setDrink(response.data);
          await fetchReviews(); // Carrega as reviews associadas
          await checkFavoriteStatus(); // Verifica se o drink está favoritado
        } catch (error) {
          console.error("Erro ao buscar dados da bebida:", error.response?.data || error.message);
        }
         finally {
          setLoading(false);
        }
      } else {
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
        <TouchableOpacity onPress={toggleFavorite}>
          <AntDesign
            name={isChecked ? "heart" : "hearto"}
            size={24}
            color="red"
          />
        </TouchableOpacity>

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
          onPress={() => setModalCommentVisible(true)}
        >
          <Text style={styles.commentButtonText}>Fazer Comentário</Text>
        </Pressable>

        {/* Modal de Comentários */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCommentVisible}
          onRequestClose={() => setModalCommentVisible(false)}
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
                onPress={() => setModalCommentVisible(false)}
                color="red"
              />
            </View>
          </View>
        </Modal>

        {/* Modal de Favoritos */}
        <Modal
          visible={modalFavoriteVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalFavoriteVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Tem certeza que deseja desfavoritar este produto?
              </Text>
              <View style={styles.modalButtons}>
                <Button title="Sim" onPress={removeFavorite} />
                <Button
                  title="Cancelar"
                  onPress={() => setModalFavoriteVisible(false)}
                />
              </View>
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
