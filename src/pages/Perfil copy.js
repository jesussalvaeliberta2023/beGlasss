import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/PerfilStyles";
import AntDesign from "@expo/vector-icons/AntDesign";

const Perfil2 = ({ route }) => {
  const username = route?.params?.username;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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
          onPress={() => Alert.alert("Botão Sair pressionado")}
        ></TouchableOpacity>
        <AntDesign name="doubleleft" size={24} color="white" />{" "}
        {/* icone para botão sair */}
        <TouchableOpacity
          style={styles.buttonEditar}
          onPress={() => Alert.alert("Botão Editar pressionado")}
        ></TouchableOpacity>
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
          <Text style={styles.text}>Idioma</Text>
          <Text style={styles.text}>Trocar email</Text>
          <Text style={styles.text}>Trocar senha</Text>
          <Text style={styles.text}>Excluir conta</Text>
        </View>
      </ScrollView>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button title="Sair" onPress={handleLogout} />
    </ScrollView>
  );
};

export default Perfil2;
