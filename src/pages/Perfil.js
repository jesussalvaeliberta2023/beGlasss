import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  Modal,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";
import styles from "../styles/PerfilStyles"; // Certifique-se de que o caminho está correto
import DrinksData from "../components/DrinksData";

// Importando o ImagePicker corretamente
import * as ImagePicker from "expo-image-picker";

// Importando icones
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const Perfil = ({}) => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [foto, setFoto] = useState(null); // Estado para a foto selecionada
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  const handleEmailChange = () => {
    // Função para salvar o novo email aqui
    setEmailModalVisible(false);
    Alert.alert("Sucesso", "Email alterado com sucesso!");
  };

  const handleAccountDeletion = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Função para solicitar permissões para acessar a galeria
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da permissão para acessar sua galeria."
      );
      return false;
    }
    return true;
  };

  // Função para selecionar uma imagem da galeria
  const selecionarImagem = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1, // Qualidade máxima
    });

    if (!result.cancelled) {
      console.log("Imagem selecionada:", result.assets[0]);
      setFoto(result.assets[0].uri); // Armazena a URI da imagem selecionada
      closeModal(); // Fecha o modal após a seleção
    } else {
      console.log("Usuário cancelou a seleção");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Inicia o carregamento
  
      try {
        const savedToken = await AsyncStorage.getItem("userToken"); // Recupera o token
        console.log("Token recuperado:", savedToken);
  
        if (!savedToken) {
          console.log("Acesso Negado");
          Alert.alert(
            "Acesso Negado",
            "Você deve realizar o login para poder entrar.",
            [
              {
                text: "Cancelar",
                onPress: () => navigation.goBack(),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => navigation.navigate("Login"),
              },
            ]
          );
          return; // Sai da função sem alterar `loading`
        }
  
        // Decodificar e usar o token
        const decodedToken = jwtDecode(savedToken);
        console.log("Token decodificado:", decodedToken);
  
        const usernameFromToken = decodedToken.username;
        console.log("Nome de usuário do token:", usernameFromToken);
  
        // Fetch dados do usuário
        const userResponse = await axios.get(
          `http://${IP_URL}:3000/perfil/${usernameFromToken}`,
          {
            headers: { Authorization: `Bearer ${savedToken}` },
          }
        );
  
        if (userResponse.status === 200) {
          setUser(userResponse.data);
        } else {
          setError("Usuário não encontrado");
        }
  
        // Fetch reviews do usuário
        const reviewsResponse = await axios.get(
          `http://${IP_URL}:3000/procurarReviews?autor=${usernameFromToken}`,
          {
            headers: { Authorization: `Bearer ${savedToken}` },
          }
        );
  
        if (reviewsResponse.status === 200) {
          setReviews(reviewsResponse.data);
        } else {
          setError("Nenhuma review encontrada");
        }
      } catch (error) {
        if (__DEV__) console.error("Erro ao buscar o perfil:", error);
  
        // Tratamento de erros de token
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            setError("Sessão expirada, faça login novamente.");
            Alert.alert(
              "Sessão expirada",
              "Seu token expirou. Por favor, faça login novamente.",
              [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
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
        setLoading(false); // Fim do carregamento após `try-catch`
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
        <View style={{ flexDirection: "row" }}>
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
    <View style={styles.container}>
      <View style={styles.containerCima}>
        <ImageBackground
          source={require("../assets/images/Ameinda.png")}
          style={styles.ImagemFundo}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.ButtonQuadrados}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevrons-left" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonQuadrados}
              onPress={openModal} // Abre o modal ao clicar na pena
            >
              <Feather name="feather" size={35} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.quadradocinza}>
            <Text style={styles.UserName}>
              {user ? user.username : "Carregando..."}
            </Text>
            <Text style={styles.useremail}>
              {user ? user.email : "Carregando..."}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.containerBaixo}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {/* Primeira "página" com a lista de reviews */}
          <View
            style={{
              width: screenWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id.toString()}
              style={{ width: "100%" }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>

          {/* Segunda "página" com os botões */}
          <View
            style={[
              {
                width: screenWidth,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEmailModalVisible(true)}
            >
              <Text style={styles.text}>Alterar email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => Alert.alert("Botão Trocar senha pressionado!")}
            >
              <Text style={styles.text}>Alterar senha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Text style={styles.text}>Sair da Conta</Text>
            </TouchableOpacity>
            {/* Adicione mais botões se necessário */}
          </View>
        </ScrollView>
      </View>


     {/* Modal para Alterar Email */}
<Modal
  visible={emailModalVisible}
  transparent
  onRequestClose={() => setEmailModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Alterar Email</Text>

      <Text style={styles.modalLabel}>Seu email atual</Text>
      
      <Text style={styles.modalCurrentEmail}>ameinda.ferraez@gmail.com</Text>

      <Text style={styles.modalLabel}>Novo endereço de email:</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Digite o novo email..."
        placeholderTextColor="#afabab"
        value={newEmail}
        onChangeText={setNewEmail}
      />

      <Text style={styles.modalLabel}>Senha:</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Digite sua senha..."
        placeholderTextColor="#afabab"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleEmailChange}
      >
        <Text style={styles.modalButtonText}>Concluir</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Modal para selecionar a imagem */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolher uma Imagem</Text>
            <TouchableOpacity onPress={selecionarImagem} style={styles.button}>
              <Text style={styles.buttonText}>Escolher da Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
            {foto && (
              <Image source={{ uri: foto }} style={styles.selectedImage} />
            )}
          </View>
        </View>
      </Modal>

      {/* Modal para Deslogar */}
      <Modal
        visible={deleteModalVisible}
        transparent
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja mesmo sair da conta?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Perfil;
