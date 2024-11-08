import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";


//importando icones
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import DrinksData from "../components/DrinksData";

// O i18next serve para gerenciamento de internacionalização para acessar recursos de linguagem.
import i18next, { languageResources } from "../services/i18next";
//Hook da biblioteca react-i18next para tradução.
import { useTranslation } from "react-i18next";
// Importa uma lista de idiomas, contendo informações como nomes nativos dos idiomas.
import languagesList from "../services/languagesList.json";

const Perfil2 = ({}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [visible, setVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { t } = useTranslation();

  // Função para alterar o idioma usando i18next
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const { width } = Dimensions.get("window"); // Correção

  const handleEmailChange = () => {
    // Função para salvar o novo email aqui
    setEmailModalVisible(false);
    Alert.alert("Sucesso", "Email alterado com sucesso!");
  };

  const handleAccountDeletion = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("userToken"); // Recupera o token do AsyncStorage
        console.log("Token recuperado:", savedToken);

        if (!savedToken) {
          console.log("Acesso Negado");
          Alert.alert(
            "Acesso Negado", // Título do alerta
            "Você deve realizar o login para poder entrar.", // Mensagem do alerta
            [
              {
                text: "Cancelar", // Botão de cancelamento
                onPress: () => navigation.goBack(),
                style: "cancel",
              },
              {
                text: "OK", // Botão para ir ao login
                onPress: () => navigation.navigate("Login"),
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
          // console.log("Reviews recuperadas:", JSON.stringify(reviewsResponse.data, null, 2));
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
  }, []);

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
        <View style={{ flexDirection: "row"}}>
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={13}
          color="#FFD700"
        />
        </View>
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
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Image
        source={require("../assets/images/Ameinda.png")}
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
      <TouchableOpacity
        style={styles.buttonSair}
        onPress={() => navigation.goBack()}
      >
      
        <AntDesign
          name="doubleleft"
          size={24}
          color="white"
          style={styles.iconeSair}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonEditar}
        onPress={() => Alert.alert("Botão Editar pressionado")}
      ></TouchableOpacity>
      <Feather
        name="edit"
        size={24}
        color="white"
        style={styles.iconeEditar}
      />
      <View style={styles.containerQ}>
        <View style={styles.square} />
      </View>
    </View>

    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View style={[styles.feedbacks, { width }]}>
        <Text style={styles.sectionTitle}>Suas avaliações</Text>
        <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        style={styles.reviewList}
      />
      </View>

      <View style={[styles.settings, { width }]}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <View>
          <TouchableOpacity
            style={styles.buttonIdioma}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.text}>Idioma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIdioma}
            onPress={() => setEmailModalVisible(true)}
          >
            <Text style={styles.text}>Alterar email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIdioma}
            onPress={() => Alert.alert("Botão Trocar senha pressionado!")}
          >
            <Text style={styles.text}>Alterar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonExcluir}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={styles.text}>Excluir conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIdioma}
            onPress={handleLogout}
          >
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>

          <SafeAreaView style={styles.containerIII}>
            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
              <View style={styles.languagesList}>
                
              </View>
            </Modal>

            {/* Modal para Alterar Email */}
            <Modal
              visible={emailModalVisible}
              transparent
              onRequestClose={() => setEmailModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View>
                    <Text style={styles.modalText4}>Alerar email</Text>
                    <Text style={styles.modalText3}>Seu email atual</Text>
                    <View style={styles.square2} />
                    <Text style={styles.modalText}>
                      ameinda.ferraez@gmail.com
                    </Text>
                  </View>
                  <Text style={styles.modalText1}>
                    Novo endereço de email:
                  </Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Digite aqui..."
                    placeholderTextColor="#afabab"
                    value={newEmail}
                    onChangeText={setNewEmail}
                  />
                  <Text style={styles.modalText2}>Senha:</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Digite aqui..."
                    placeholderTextColor="#afabab"
                    value={senha}
                    onChangeText={setSenha}
                  />

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleEmailChange}
                  >
                    <Text style={styles.modalButtonText}>Concluído</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Modal para Excluir Conta */}
            <Modal
              visible={deleteModalVisible}
              transparent
              onRequestClose={() => setDeleteModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTextExcluir}>
                    Tem certeza que deseja excluir a conta?
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleAccountDeletion}
                  >
                    <Text style={styles.modalButtonText}>Confirmar</Text>
                    <TouchableOpacity
                      style={styles.modalButton2}
                      onPress={handleAccountDeletion}
                    >
                      <Text style={styles.modalButtonText2}>Concluído</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        </View>
      </View>
    </ScrollView>
  </ScrollView>
);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1b29",
  },
  buttonIdioma:{
    backgroundColor: '#4c4a64', // Cor do botão
    borderRadius:10, // Bordas arredondadas
    padding: 15, // Margem dentro do botão
    margin: 5,// Margem ao redor do botão
  },
  iconeSair: {
    marginTop: -360,
    right: 193,
  },
  iconeEditar: {
    marginTop: -360,
    left: 17,
  },
  buttonSair: {
    backgroundColor: '#20202c',  // Cor do botão
    paddingVertical: 20,  // Altura do botão
    paddingHorizontal: 20,  // Largura do botão
    borderRadius: 10,  // Bordas arredondadas
    margin: 10,  // Margem ao redor do botão
    right: 150,  // Define a posição do botão 
    top: -180,  // Ajuste a partir do topo do container
  },
  buttonEditar: {
    backgroundColor: '#20202c',  // Cor do botão
    paddingVertical: 20,  // Altura do botão
    paddingHorizontal: 20,  // Largura do botão
    borderRadius: 10,  // Bordas arredondadas
    margin: 10,  // Margem ao redor do botão
    left: 60,  // Define a posição do botão
    top: -180,  // Alinhado na mesma altura que o outro botão
    right: 40,  // Ajuste a partir da direita
  },
  
  containerQ: {
    flex: 1,  // Faz o container ocupar a tela toda
    alignItems: 'center',  // Centraliza horizontalmente
  },
  square: {
    width: 1500,  // Largura do quadrado
    height: 130,  // Altura do quadrado (mesmo valor para ser um quadrado)
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Cor semi-transparente (50%)
    marginTop: 341, //posição do quadrado
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
    width: 380,
    height: 460,
    marginTop:10,
    marginLeft: -15,
  },

  userInfo: {
    marginLeft: -370,
    marginTop:360,
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
    fontSize: 14,
    marginLeft: 10,
  },

  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  feedbacks: {
    justifyContent: 'center',
    borderRadius: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 11,
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 250,
    color: "#ccc",
    padding: 11,
  },

  reviewCard: {
    width: '90%',  
    marginHorizontal: '5%',  
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 20,  
    padding: 10,  
    marginBottom: 20,  
    backgroundColor: '#252239',
  },

  drinkImage: {
    width: 90,  
    height: 120,  
    borderRadius: 10,  
    marginRight: 15,  
  },

  reviewTextContainer: {
    flex: 1,  
    flexDirection: 'column',
  },

  titleAndRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  settings: {
    borderRadius: 20,
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#4c4a64',
    color: '#cfcfcf',
    textAlign: 'left',
  },


  //Idioma
  containerIII: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // fundo suave para todo o layout
    padding: 20,
    width: 36,
    height: 39,
  },
  languagesList: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  languageButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 50,
    alignItems: "left",
  },
  lngName: {
    fontSize: 15,
    color: "#333333",
  },
  textModal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  square2: {
    width: 265, // Largura do quadrado
    height: 45, // Altura do quadrado (mesmo valor para ser um quadrado)
    backgroundColor: "#42405a", // Cor semi-transparente (50%)
    marginTop: 37, //posição do quadrado
    justifyContent: "space-around",
  },
  modalText: {
    fontSize: 12,
    color: "#afabab",
    textAlign: "center",
    alignItems: "center",
    top: -30,
  },
  modalText3: {
    fontSize: 12,
    color: "#cfcfcf",
    textAlign: "center",
    alignItems: "center",
    top: 30,
  },
  modalText4: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    top: 1,
    margin: -10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    backgroundColor: "#f8f8f8",
  },

  //Modal configuração

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // fundo semitransparente para destacar o modal
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#4c4a64",
    borderRadius: 10,
    alignItems: "center",
  },

  modalText1: {
    fontSize: 12,
    color: "#cfcfcf",
    right: 55,
    margin: 10,
  },
  modalText2: {
    fontSize: 12,
    color: "#cfcfcf",
    right: 110,
    margin: 10,
  },
  inputField: {
    width: "100%", padding: 2,
    backgroundColor: "#39374e",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
  },
  modalButton: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  modalButtonText: {
    color: "#4c4a64",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default Perfil2;
