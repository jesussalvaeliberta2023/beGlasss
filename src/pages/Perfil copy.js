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
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/PerfilStyles";
//importando icones
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

// O i18next serve para gerenciamento de internacionalização para acessar recursos de linguagem.
import i18next, { languageResources } from "../services/i18next";
//Hook da biblioteca react-i18next para tradução.
import { useTranslation } from "react-i18next";
// Importa uma lista de idiomas, contendo informações como nomes nativos dos idiomas.
import languagesList from "../services/languagesList.json";

const Perfil2 = ({ route }) => {
  const username = route?.params?.username;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  //changeLng: Função para alterar o idioma usando i18next. Recebe o código do idioma (lng), altera a linguagem e fecha o modal.
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const { width } = Dimensions.get("window"); // Correção

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

  const reviews = [
    {
      id: "1",
      image: require("../assets/images/Drinks/Caipirinha.png"),
      drink: "Caipirinha",
      rating: 3.5,
      review:
        "A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.",
    },
    {
      id: "2",
      image: require("../assets/images/Drinks/Sangria.png"),
      drink: "Sangria",
      rating: 4,
      review:
        "A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.",
    },
  ];

  // const renderReview = ({ item }) => (
  //   <View key={item.id} style={styles.reviewCard}>
  //     <View>
  //       <Image source={item.image} style={styles.drinkImage} />
  //     </View>

  //     <View style={styles.reviewTextContainer}>
  //       <View style={styles.titleAndRating}>
  //         <Text style={styles.drinkTitle}>{item.drink}</Text>
  //         <Text style={styles.rating}>{item.rating} ★★★☆☆</Text>
  //       </View>
  //       <Text style={styles.textReview}>{item.review}</Text>
  //     </View>
  //   </View>
  // );

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
        ></TouchableOpacity>
        {/* icone para botão sair */}
        <AntDesign
          name="doubleleft"
          size={24}
          color="white"
          style={styles.iconeSair}
        />
        {/* icone para botão editar */}
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
          <ScrollView>
            {reviews.map((item) => (
              <View key={item.id} style={styles.reviewCard}>
                <View>
                  <Image source={item.image} style={styles.drinkImage} />
                </View>

                <View style={styles.reviewTextContainer}>
                  <View style={styles.titleAndRating}>
                    <Text style={styles.drinkTitle}>{item.drink}</Text>
                    <Text style={styles.rating}>{item.rating} ★★★☆☆</Text>
                  </View>
                  <Text style={styles.textReview}>{item.review}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
              onPress={() => Alert.alert("Botão Trocar email pressionado!")}
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
              style={styles.buttonIdioma}
              onPress={() => Alert.alert("Botão Excluir conta pressionado!")}
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
                  <FlatList
                    // Lista de idiomas disponíveis. Usa Object.keys(languageResources) para obter a lista de chaves
                    //(códigos dos idiomas) e renderItem para renderizar cada item
                    data={Object.keys(languageResources)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLng(item)}
                      >
                        <Text style={styles.lngName}>
                          {languagesList[item].nativeName}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
              >
                {/* Text exibe texto traduzido usando o método t. */}
                <Text style={styles.buttonText}>{t("change-language")}</Text>
              </TouchableOpacity>
              <View style={styles.tabs}></View>
            </SafeAreaView>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Perfil2;
