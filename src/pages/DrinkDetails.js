import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function Drink() {
  const IP_URL = "10.144.170.57"; // Variável de URL definida como constante

  // Hooks devem ser usados no topo do componente, sem condicional
  const navigation = useNavigation();
  const route = useRoute();
  const { id, image, data } = route.params; // Recebe os parâmetros da rota

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID recebido:", id);

    axios
      .get(`http://${IP_URL}:3000/produtos/${id}`)
      .then((response) => {
        setDrink(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        {/* Botão no canto superior esquerdo */}
        <Pressable
          style={[styles.backButton,{paddingTop: 15}]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.backButtonText}>Ir para a Login</Text>
        </Pressable>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{drink.name}</Text>
        <Text style={styles.description}>{drink.description}</Text>
        <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
        <Text style={styles.ingredients}>{drink.recipe}</Text>
        <Text style={styles.howToMakeTitle}>Modo de Preparo:</Text>
        <Text style={styles.howToMake}>{drink.comofazer}</Text>
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
});
