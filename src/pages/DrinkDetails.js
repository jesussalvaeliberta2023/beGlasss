import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useFonts } from "@expo-google-fonts/belleza";

import PressComponent from "../components/PressableComponent";
// Navegação
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

// Back-End
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";
import DrinksData from "../components/DrinksData";

// Ícones
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DrinkDetails() {
  // Constantes de Estado
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const [modalFavoriteVisible, setModalFavoriteVisible] = useState(false);
  const [comment, setComment] = useState("");
  // const [reviews, setReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [averageRating, setAverageRating] = useState(0); // Média das avaliações
  const [ingredients, setIngredients] = useState([]);
  const [preparationMethod, setPreparationMethod] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);

  // const preparationMethod = [
  //   "Corte o limão em 4 pedaços e retire o miolo branco; se preferir, retire a casca também.",
  //   "Coloque o limão em um copo juntamente com o açúcar.",
  //   "Macere os ingredientes, adicione o gelo, e complete com a água gaseificada.",
  //   "Misture delicadamente, decore com uma rodela de limão e sirva.",
  // ];
  // const [checkedSteps, setCheckedSteps] = useState(
  //   Array(preparationMethod ? preparationMethod.length : 0).fill(false)
  // );

  const route = useRoute();
  const navigation = useNavigation();
  const { id, image } = route.params || {};
  const [fontsLoaded] = useFonts({
    Belleza: require("@expo-google-fonts/belleza"),
  });

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

  // Função para buscar os ingredientes
  const fetchIngredients = async () => {
    try {
      const response = await axios.get(`http://${IP_URL}:3000/recipes/${id}`);
      if (response.data) {
        setIngredients(response.data);
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
    const savedToken = await AsyncStorage.getItem("userToken");
    if (!savedToken) {
      console.error("Nenhum token encontrado. É necessário fazer login.");
      return;
    }

    const decodedToken = jwtDecode(savedToken);
    const userId = decodedToken.id;

    // Se já está favoritado, abre o modal de confirmação
    if (isChecked) {
      setModalFavoriteVisible(true);
    } else {
      // Caso contrário, favorita o produto
      try {
        const favoriteData = { userId, productId: id };

        await axios.post(`http://${IP_URL}:3000/favorites`, favoriteData, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        console.log("Produto favoritado com sucesso");
        setIsChecked(true); // Marca como favoritado
        await AsyncStorage.setItem(`favorite_${id}`, "true");
      } catch (error) {
        console.error("Erro ao favoritar o produto", error);
      }
    }
  };


  const fetchPreparationMethod = async () => {
    setLoading(true);
    try {
      // Requisição para buscar o campo comofazer do produto
      const response = await axios.get(`http://${IP_URL}:3000/produtos/${id}`);
      const comofazerText = response.data.comofazer;

      // Divide o texto do comofazer em etapas, supondo que cada linha seja uma etapa
      const steps = comofazerText.split("\n"); // Divide por nova linha
      setPreparationMethod(steps);

      // Cria o estado para controlar os passos
      setCheckedSteps(Array(steps.length).fill(false));
    } catch (error) {
      console.error("Erro ao buscar o método de preparo:", error.response?.data || error.message);
    } finally {
      setLoading(false);
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
      setLoading(true);
      try {
        const response = await axios.get(
          `http://${IP_URL}:3000/produtos/${id}`
        );
        setDrink(response.data);

        await fetchReviews(); // Carrega as reviews associadas ao produto
        await fetchIngredients(); // Carrega as reviews associadas ao produto
        await fetchPreparationMethod();
      } catch (error) {
        console.error(
          "Erro ao buscar dados da bebida:",
          error.response?.data || error.message
        );
        setDrink(null); // Define drink como null em caso de erro
      } finally {
        setLoading(false);
      }
    };

    const checkFavoriteStatus = async () => {
      const savedToken = await AsyncStorage.getItem("userToken");
      const decodedToken = jwtDecode(savedToken);
      const userId = decodedToken.id; // Pega o ID do usuário do token

      try {
        const response = await axios.get(
          `http://${IP_URL}:3000/favorites/${userId}/${id}`
        );
        setIsChecked(response.data.isFavorite); // Define o status de favorito
        console.log(response.data.isFavorite);
      } catch (error) {
        console.error(
          "Erro ao verificar o status de favorito:",
          error.response?.data || error.message
        );
      }
    };

    // Executa o fetchDrinkData e checkFavoriteStatus quando o ID está presente
    if (id) {
      fetchDrinkData(); // Carrega os dados da bebida
      checkFavoriteStatus(); // Verifica o status de favorito
    }
  }, [id]);

  // Condicional de carregamento
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando</Text>
      </View>
    );
  }

  // Condicional para erro de carregamento do produto
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

  const toggleCheckbox = (index) => {
    setCheckedSteps((prevCheckedSteps) => {
      const updatedCheckedSteps = [...prevCheckedSteps];
      updatedCheckedSteps[index] = !updatedCheckedSteps[index]; // Alterna o valor (true/false)
      return updatedCheckedSteps;
    });
  };

  const renderStarsReviews = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= averageRating ? "star" : "star-outline"}
          size={25}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const { width } = Dimensions.get("window");

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const renderReview = ({ item }) => {
    // Define a imagem diretamente
    const drinkImage = DrinksData[item.produto - 1]?.image;

    return (
      <View style={styles.reviewCard}>
        {drinkImage ? (
          <Image source={{ uri: drinkImage }} style={styles.drinkImage} />
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

  const renderIngredient = ({ item }) => {
    const ingredienteImagemUrl = `http://${IP_URL}:3000/uploads/ingredients/${item.imagem}`;

    return (
      <View style={[{ marginStart: 25 }, styles.igredientsImages]}>
        <View style={styles.darkPart}>
          <Image
            source={{ uri: ingredienteImagemUrl }}
            style={{ width: 140, height: 140 }}
          />
        </View>

        <View style={styles.yellowPart}>
          <Text style={styles.igredients}>{item.ingredient}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </View>
    );
  };

  const reviews = [
    {
      id: "1",
      image: require("../assets/images/Person1.png"),
      name: "Douglas Alencar",
      rating: 3.5,
      review:
        "A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.",
    },
    {
      id: "2",
      image: require("../assets/images/Person2.png"),
      name: "Luísa Andrade",
      rating: 4,
      review:
        "A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.",
    },
  ];

  return (
    <ImageBackground source={image} style={styles.background} blurRadius={10}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="light" translucent />
          <View style={styles.header}>
            <PressComponent
              onPress={() => navigation.goBack()}
              source={require("../assets/images/Bars.png")}
              styleI={styles.headerTab}
            />
            <PressComponent
              onPress={() => navigation.navigate("Login")}
              source={require("../assets/images/Person.png")}
              styleI={styles.headerPerson}
            />
          </View>

          <View style={styles.informations}>
            <Text style={styles.drink}>{drink.name}</Text>
            <Text style={styles.description}>{drink.description}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setModalCommentVisible(true)}>
                <View style={styles.reviewContainer}>
                  {averageRating > 0 ? (
                    renderStarsReviews() // Renderiza as estrelas baseadas na média
                  ) : (
                    <Text style={styles.stars}>☆☆☆☆☆</Text> // Mensagem quando não há avaliações
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorite}>
                <AntDesign
                  name={isChecked ? "heart" : "hearto"}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageView}>
            <Image source={image} style={styles.image} />
          </View>

          <View>
            <Text style={styles.titleOne}>Ingredientes:</Text>
            <FlatList
              data={ingredients} // Dados dos ingredientes
              renderItem={renderIngredient} // Usando a função renderIngredient para renderizar cada item
              keyExtractor={(item) => item.id.toString()} // Usando o ID como chave única
              horizontal // Exibindo a lista horizontalmente
              showsHorizontalScrollIndicator={false} // Ocultando a barra de rolagem horizontal
            />
          </View>

          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <View style={[styles.settings, { width }]}>
                <Text style={[styles.titleOne, { fontSize: 20 }]}>
                  Modo de Preparo:
                </Text>
                {preparationMethod.map((step, index) => (
                  <View key={index} style={styles.stepContainer}>
                    {/* Checkbox para marcar/desmarcar o passo */}
                    <Pressable
                      onPress={() => toggleCheckbox(index)}
                      style={[
                        checkedSteps[index]
                          ? styles.checkedBox
                          : styles.uncheckedBox,
                        // Adicionando uma condição para manter o layout conforme necessário
                      ]}
                    />
                    <Text
                      style={[
                        styles.textMethod,
                        checkedSteps[index] && {
                          textDecorationLine: "line-through", // Risca o texto se marcado
                          color: "#888", // Torna o texto mais suave se marcado
                        },
                      ]}
                    >
                      {`${index + 1}. ${step}`}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={[styles.feedbacks, { width }]}>
                <Text style={[styles.titleOne, { fontSize: 20 }]}>
                  Suas avaliações
                </Text>
                <ScrollView>
                  {reviews.map((item) => (
                    <View key={item.id} style={styles.reviewCard}>
                      <View>
                        <Image source={item.image} style={styles.drinkImage} />
                      </View>

                      <View style={styles.reviewTextContainer}>
                        <View style={styles.titleAndRating}>
                          <Text style={styles.drinkTitle}>
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </Text>
                          <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Text
                                key={index}
                                style={
                                  index < item.rating
                                    ? styles.starFilled
                                    : styles.starEmpty
                                }
                              >
                                ★
                              </Text>
                            ))}
                          </View>
                        </View>
                        <Text style={styles.textReview}>{item.review}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCommentVisible}
            onRequestClose={() => setModalCommentVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
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

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={submitReview}
                    style={[styles.modalButton, styles.confirmButton]}
                  >
                    <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalCommentVisible(false)}
                    style={[styles.modalButton, styles.cancelButton]}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
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
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Tem certeza que deseja desfavoritar este produto?
                </Text>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={removeFavorite}
                  >
                    <Text style={styles.buttonText}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalFavoriteVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },

  background: {
    width: "100%",
    height: "100%",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  headerTab: {
    marginLeft: 15,
  },

  headerPerson: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  informations: {
    paddingLeft: 15,
    width: "85%",
  },

  drink: {
    fontSize: 40,
    fontFamily: "Belleza",
    color: "#FFFFFF",
  },

  description: {
    fontSize: 17,
    color: "#FFFFFF",
  },

  stars: {
    fontSize: 22,
    color: "#FFDD66",
    paddingRight: 15,
  },

  imageView: {
    alignSelf: "center",
    margin: 25,
  },

  image: {
    width: 350,
    height: 350,
    borderRadius: 20,
  },

  igredientsImages: {
    width: 130,
    height: 170,
    margin: 6,
    borderRadius: 20,
  },

  darkPart: {
    flex: 2,
    backgroundColor: "#20202C",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  yellowPart: {
    flex: 1,
    backgroundColor: "#FFDD66",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },

  igredients: {
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 7,
  },

  amount: {
    fontSize: 13,
    marginStart: 7,
  },

  titleOne: {
    color: "white",
    fontSize: 25,
    marginStart: 25,
    marginBottom: 10,
    fontFamily: "Belleza",
  },

  settings: {
    padding: 25,
    marginTop: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#2A2A3999",
  },

  feedbacks: {
    justifyContent: "center",
    marginTop: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#2A2A3999",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 11,
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 250,
    color: "#ccc",
    padding: 11,
  },

  reviewCard: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#20202C",
  },

  drinkImage: {
    width: 45,
    height: 45,
    borderRadius: 45,
    marginRight: 15,
  },

  ratingContainer: {
    flexDirection: "row",
  },

  starFilled: {
    color: "#FFD700",
    fontSize: 14,
  },

  starEmpty: {
    color: "#555",
    fontSize: 14,
  },

  reviewTextContainer: {
    flex: 1,
    flexDirection: "column",
  },

  titleAndRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  drinkTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },

  textReview: {
    color: "#AFABAB",
    textAlign: "justify",
    marginTop: 5,
  },

  stepContainer: {
    marginTop: "20",
    flexDirection: "row",
    paddingHorizontal: 25,
    marginVertical: 5,
  },

  textMethod: {
    fontSize: 14,
    color: "#FFFFFF",

    marginStart: 0,
    margiN: 0,
    textAlign: "justify",
  },

  uncheckedBox: {
    width: 20,
    height: 20,

    borderColor: "#888888",
    borderWidth: 2,
    marginRight: 10,
    marginTop: 6,
  },

  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#888888",
    borderColor: "#8888888",
    borderWidth: 2,
    marginRight: 10,
    marginTop: 6,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo transparente com opacidade
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",

    elevation: 10, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    width: 120,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#ff6347", // Cor de fundo para "Sim" (laranja avermelhado)
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc", // Cor de fundo para "Cancelar" (cinza claro)
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  feedbacks: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  titleOne: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  reviewsContainer: {
    marginTop: 10,
  },
  reviewCard: {
    flexDirection: "row",
    backgroundColor: "#20202C",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Sombra suave para um efeito de profundidade
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  drinkImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  drinkText: {
    fontSize: 14,
    color: "#555",
  },
  reviewText: {
    flex: 1,
    justifyContent: "center",
  },
  drinkTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  stars: {
    fontSize: 18,
    color: "#f1c40f", // Cor de ouro para as estrelas
    marginRight: 3,
  },
});
