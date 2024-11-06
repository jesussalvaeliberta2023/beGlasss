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
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IP_URL from "../components/IP";
import axios from "axios";
import styles from "../styles/PerfilStyles"; // Certifique-se de que o caminho está correto

// Importando o ImagePicker corretamente
import * as ImagePicker from 'expo-image-picker';

// Importando icones
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const Perfil = ({}) => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [foto, setFoto] = useState(null); // Estado para a foto selecionada
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Função para solicitar permissões para acessar a galeria
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão negada", "Precisamos da permissão para acessar sua galeria.");
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
    // Aqui, o código de busca de usuário e reviews pode continuar sem mudanças
  }, []);

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

      <View style={styles.containerBaixo}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewText}>{item.autor}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Perfil;
