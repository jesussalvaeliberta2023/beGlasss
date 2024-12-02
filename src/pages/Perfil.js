// Importações de bibliotecas e componentes necessários
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
import { useNavigation } from "@react-navigation/native"; //Gerencia a navegação entre telas.
import { jwtDecode } from "jwt-decode"; //Decodifica tokens JWT para acessar dados do usuário.
import AsyncStorage from "@react-native-async-storage/async-storage"; //Gerencia armazenamento local, como tokens de autenticação.
import IP_URL from "../components/IP";
import axios from "axios"; //Realiza requisições HTTP para obter ou enviar dados ao backend.
import styles from "../styles/MainPages/PerfilStyles"; // Estilos para os componentes
import DrinksData from "../components/DrinksData"; // Dados sobre as bebidas

// Importando o ImagePicker corretamente
import * as ImagePicker from "expo-image-picker";

// Importando icones
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Componente principal da tela de perfil
const Perfil = ({}) => {
  // Estados utilizados no componente
  const [user, setUser] = useState(null); // Dados do usuário
  const [reviews, setReviews] = useState([]); // Avaliações do usuário
  const [foto, setFoto] = useState(""); // Estado para a foto selecionada
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const [emailModalVisible, setEmailModalVisible] = useState(false); // Modal para alterar email
  const [idiomaModalVisible, setIdiomaModalVisible] = useState(false); // Modal de idioma
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Modal para sair da conta
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Erros
  const [newEmail, setNewEmail] = useState(""); // Novo email do usuário
  const [senha, setSenha] = useState(""); // Senha do usuário
  const navigation = useNavigation(); // Navegação entre telas

   // Obtém a largura da tela
  const screenWidth = Dimensions.get("window").width;

  // Função para abrir o modal da imagem
  const openModal = () => {
    setModalVisible(true);
  };

  const handleEmailChange = () => {
    // Função para salvar o novo email aqui
    setEmailModalVisible(false);
    Alert.alert("Sucesso", "Email alterado com sucesso!");
  };

   // Função para sair da conta
  const handleAccountDeletion = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
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
      setFoto(result.assets[0].uri); // Armazena a URI da imagem
      closeModal(); // Fecha o modal após a seleção

      // Chama a função para enviar a imagem logo após a seleção
      enviarImagem(result.assets[0].uri);
    } else {
      console.log("Usuário cancelou a seleção");
    }
  };

    // Função para enviar a imagem selecionada para o servidor
  const enviarImagem = async (imageUri) => {
    if (!imageUri) {
      Alert.alert("Erro", "Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();

    // Obtenha o tipo do arquivo (extensão) a partir da URI da imagem
    const uriParts = imageUri.split(".");
    const fileType = uriParts[uriParts.length - 1]; // Obtém o tipo do arquivo da extensão

    // Cria um objeto para a imagem a ser enviada no FormData
    formData.append("foto", {
      uri: imageUri, // Agora usa a URI correta
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      const response = await fetch(`http://${IP_URL}:3000/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${savedToken}`, // Adiciona o token de autenticação, se necessário
          // O 'Content-Type' será definido automaticamente pelo 'fetch' quando usar o FormData
        },
        body: formData, // Envia os dados como FormData
      });

      const data = await response.json();
      if (data.message) {
        Alert.alert("Sucesso", data.message);
      } else {
        Alert.alert("Erro", "Erro ao enviar imagem");
      }
    } catch (error) {
      console.log("Erro ao enviar imagem:", error);
      Alert.alert("Erro", "Erro ao enviar a imagem.");
    }
  };

  // Função para fechar o modal
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Inicia o carregamento

      try {
        const savedToken = await AsyncStorage.getItem("userToken"); // Recupera o token
      

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
      

        const usernameFromToken = decodedToken.username;
        

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
  }, [user]);

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

  const reviews2 = [
    {
      id: 1,
      autor: "João Silva",
      nota: 4,
      comentario:
        "A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.",
      produto: 1,
    },
    {
      id: 2,
      autor: "Maria Oliveira",
      nota: 5,
      comentario: "Excelente, super recomendo!",
      produto: 2,
    },
    {
      id: 3,
      autor: "Carlos Pereira",
      nota: 3,
      comentario: "Bom, mas pode melhorar.",
      produto: 3,
    },
    {
      id: 4,
      autor: "Ana Souza",
      nota: 4,
      comentario:
        "Gostei muito do sabor, porém a apresentação poderia ser melhor.",
      produto: 4,
    },
    {
      id: 5,
      autor: "Fernanda Lima",
      nota: 2,
      comentario: "Não gostei, estava muito doce para o meu gosto.",
      produto: 5,
    },
    {
      id: 6,
      autor: "Lucas Costa",
      nota: 5,
      comentario:
        "Perfeito! Amei demais, voltarei a fazer a receita mais vezes!",
      produto: 6,
    },
  ];

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
    <View style={styles.containerCima}>
      <ImageBackground
        source={require("../assets/images/Ameinda.png")}
        style={styles.ImagemFundo}
        blurRadius={30}
      >
        <View>
          <Image
            source={require("../assets/images/Ameinda.png")} // Caminho da imagem local
            style={styles.imagemPerfil} // Defina o tamanho da imagem
          />
        </View>
        <View style={styles.quadradocinza}>
          <Text style={styles.UserName}>
            {user ? user.username : "Carregando..."}
          </Text>
          <Text style={styles.useremail}>
            {user ? user.email : "Carregando..."}
          </Text>
          <MaterialIcons
            name="horizontal-rule"
            size={28}
            color="white"
            style={styles.linhaPage2}
          />
          <MaterialIcons
            name="horizontal-rule"
            size={30}
            color="#afabab"
            style={styles.linhaPage1}
          />

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
              <Text style={styles.textIdentificarPage}>Suas avaliações</Text>
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
              <Text style={styles.textIdentificarPage2}>Configurações</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIdiomaModalVisible(true)}
              >
                <Text style={styles.text}>Idioma</Text>
                <Text style={styles.textIdenticicacao}>Português (Br)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => Alert.alert("Botão Alterar senha pressionado!")}
              >
                <Text style={styles.text}>Trocar conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setEmailModalVisible(true)}
              >
                <Text style={styles.text}>Alterar email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  Alert.alert(
                    "Um codigo de verificação foi enviado no seu email atual"
                  )
                }
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.ButtonQuadrados}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevrons-left" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ButtonQuadrados1}
            onPress={openModal} // Abre o modal ao clicar na pena
          >
            <Feather name="feather" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

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

            <Text style={styles.modalCurrentEmail}>
              ameinda.ferraez@gmail.com
            </Text>

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
              style={styles.modalButtonConcluir}
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
            <Text style={styles.modalTitle}>Deseja mesmo sair da conta?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonTextYes}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonTextNo}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Perfil;
