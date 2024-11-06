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
import styles from "../styles/PerfilStyles";

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

export default Perfil2;
