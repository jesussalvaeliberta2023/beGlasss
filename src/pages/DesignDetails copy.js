import { jwtDecode } from "jwt-decode";
import React, {useState, useEffect} from "react";
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

// Ícones
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";


export default function DesignDetails2() {
// Constantes de Estado
const [drink, setDrink] = useState(null);
const [loading, setLoading] = useState(true);
const [modalCommentVisible, setModalCommentVisible] = useState(false);
const [modalFavoriteVisible, setModalFavoriteVisible] = useState(false);
const [comment, setComment] = useState("");
const [rating, setRating] = useState(0);
const [isChecked, setIsChecked] = useState(false);
const [averageRating, setAverageRating] = useState(0); // Média das avaliações



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

// Função para verificar se o produto está favoritado
const checkFavoriteStatus = async () => {
  try {
    const savedToken = await AsyncStorage.getItem("userToken");
    if (!savedToken) {
      console.log(
        "Nenhum token encontrado. Não é possível verificar favoritos."
      );
      setIsChecked(false);
      return;
    }

    const decodedToken = jwtDecode(savedToken);
    const userId = decodedToken.id;

    const response = await axios.get(
      `http://${IP_URL}:3000/favorites/${userId}/${id}`
    );
    setIsChecked(response.data.isFavorite); // Atualiza o estado do coração
    console.log(isChecked);
  } catch (error) {
    console.error("Erro ao verificar o status de favorito", error);
    console.log(id);
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
      console.log(response.data.isFavorite)
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

  

  const { width } = Dimensions.get("window");

  const reviews = [
   
  ];
  
  // const preparationMethod = [
  //   "Corte o limão em 4 pedaços e retire o miolo branco; se preferir, retire a casca também.",
  //   "Coloque o limão em um copo juntamente com o açúcar.",
  //   "Macere os ingredientes, adicione o gelo, e complete com a água gaseificada.",
  //   "Misture delicadamente, decore com uma rodela de limão e sirva.",
  // ];

 

  const toggleCheckbox = (index) => {
    // console.log("Checkbox index:", index, "Current state:", checkedSteps[index]);
    setCheckedSteps((prevCheckedSteps) => {
      const updatedCheckedSteps = [...prevCheckedSteps];
      updatedCheckedSteps[index] = !updatedCheckedSteps[index];
      return updatedCheckedSteps;
    });
  };

  if (!fontsLoaded) {
  console.log("Pampam")
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={image}
      style={styles.background}
      blurRadius={10}
    >
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
            <Text style={styles.description}>
              {drink.description}
            </Text>
            <Text style={styles.stars}>★★★☆☆</Text>
          </View>
        
          <View style={styles.imageView}>
            <Image
              source={image}
              style={styles.image}
            />
          </View>

          <View>
            <Text style={styles.titleOne}>
              Ingredientes:
              </Text>
            <ScrollView horizontal>
              <View style={[{ marginStart: 25 }, styles.igredientsImages]}>
                <View style={styles.darkPart}>
                  <Image
                    source={require("../assets/images/Igredients/Lemon.png")}
                    style={{ width: 140, height: 140 }}
                  />
                </View>

                <View style={styles.yellowPart}>
                  <Text style={styles.igredients}>Limão</Text>
                  <Text style={styles.amount}>1</Text>
                </View>
              </View>

              <View style={styles.igredientsImages}>
                <View style={styles.darkPart}>
                  <Image
                    source={require("../assets/images/Igredients/SparklingWater.png")}
                    style={{ width: 140, height: 140 }}
                  />
                </View>

                <View style={styles.yellowPart}>
                  <Text style={styles.igredients}>Água com Gás</Text>
                  <Text style={styles.amount}>250 ml</Text>
                </View>
              </View>

              <View style={styles.igredientsImages}>
                <View style={styles.darkPart}>
                  <Image
                    source={require("../assets/images/Igredients/Sugar.png")}
                    style={{ width: 140, height: 140 }}
                  />
                </View>

                <View style={styles.yellowPart}>
                  <Text style={styles.igredients}>Açúcar</Text>
                  <Text style={styles.amount}>1 colher de chá</Text>
                </View>
              </View>

              <View style={[{ marginEnd: 25 }, styles.igredientsImages]}>
                <View style={styles.darkPart}>
                  <Image
                    source={require("../assets/images/Igredients/Ice.png")}
                    style={{ width: 140, height: 140 }}
                  />
                </View>

                <View style={styles.yellowPart}>
                  <Text style={styles.igredients}>Gelo</Text>
                  <Text style={styles.amount}>Quantidade que desejar</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <View style={[styles.settings, { width }]}>
                {/* <Text style={[styles.titleOne, {fontSize: 20,}]}>Modo de Preparo:</Text>
                {preparationMethod.map((step, index) => (
                  <View key={index} style={styles.stepContainer}>
                    <Pressable
                      onPress={() => toggleCheckbox(index)}
                      style={checkedSteps[index] ? styles.checkedBox : styles.uncheckedBox}
                    />
                    <Text
                      style={[
                        styles.textMethod,
                        checkedSteps[index] && { textDecorationLine: "line-through", color: "#888" }
                      ]}
                    >
                      {`${index + 1}. ${step}`}
                    </Text>
                  </View>
                ))} */}
              </View>

              <View style={[styles.feedbacks, { width }]}>
                <Text style={[styles.titleOne, {fontSize: 20,}]}>Suas avaliações</Text>
                <ScrollView>
                  {reviews.map((item) => (
                    <View key={item.id} style={styles.reviewCard}>
                      <View>
                        <Image source={item.image} style={styles.drinkImage} />
                      </View>

                      <View style={styles.reviewTextContainer}>
                        <View style={styles.titleAndRating}>
                          <Text style={styles.drinkTitle}>
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                          </Text>
                          <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Text key={index} style={index < item.rating ? styles.starFilled : styles.starEmpty}>
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
    backgroundColor: "translucent",
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
});

              // <View style={[styles.feedbacks, { width }]}>
              //   <Text style={styles.sectionTitle}>Suas avaliações</Text>
              //   <ScrollView>
              //     {reviews.map((item) => (
              //       <View key={item.id} style={styles.reviewCard}>
              //         <View>
              //           <Image source={item.image} style={styles.drinkImage} />
              //         </View>

              //         <View style={styles.reviewTextContainer}>
              //           <View style={styles.titleAndRating}>
              //             <Text style={styles.drinkTitle}>{item.name}</Text>
              //             <Text style={styles.rating}>{item.rating} ★★★☆☆</Text>
              //           </View>
              //           <Text style={styles.textReview}>{item.review}</Text>
              //         </View>
              //       </View>
              //     ))}
              //   </ScrollView>
              // </View>

              // feedbacks: {
              //   justifyContent: "center",
              //   borderRadius: 20,
              // },

              // sectionTitle: {
              //   color: "#fff",
              //   fontSize: 11,
              //   marginTop: 20,
              //   marginBottom: 10,
              //   paddingRight: 250,
              //   color: "#ccc",
              //   padding: 11,
              // },

              // reviewCard: {
              //   width: "90%",  
              //   marginHorizontal: "5%",  
              //   flexDirection: "row",
              //   alignItems: "flex-start",
              //   borderRadius: 20,  
              //   padding: 10,  
              //   marginBottom: 20,  
              //   backgroundColor: "#252239",
              // },

              // drinkImage: {
              //   width: 90,  
              //   height: 120,  
              //   borderRadius: 10,  
              //   marginRight: 15,  
              // },

              // reviewTextContainer: {
              //   flex: 1,  
              //   flexDirection: "column",
              // },
            
              // titleAndRating: {
              //   flexDirection: "row",
              //   justifyContent: "space-between",
              //   alignItems: "center",
              // },
            
              // drinkTitle: {
              //   color: "#fff",
              //   fontWeight: "bold",
              //   fontSize: 16,
              //   flex: 1,
              // },
            
              // textReview: {
              //   color: "#AFABAB",
              //   textAlign: "justify",
              //   marginTop: 5,
              // },

          
              
              
              