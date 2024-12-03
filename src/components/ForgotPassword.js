import React, { useState } from "react";
import styles from "../styles/SecondaryPages/ForgetStyles";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import IP_URL from "../components/IP";

export default function TrocarEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleEmailChange = async () => {
    if (!newEmail) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    try {
      // Faz uma requisição ao backend para alterar o e-mail
      const response = await axios.post(`http://${IP_URL}:3000/change-email`, { email: newEmail });

      if (response.status === 200) {
        Alert.alert("Sucesso", "E-mail alterado com sucesso! Você será redirecionado para a página de login.");
        // Redireciona o usuário para a página de login
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Erro ao alterar o e-mail:", error);
      Alert.alert("Erro", "Não foi possível alterar o e-mail. Tente novamente.");
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/Coffes/Coffe.png')} 
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Alterar E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o novo e-mail"
          placeholderTextColor="#888"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity onPress={handleEmailChange} style={styles.button}>
          <Text style={styles.buttonText}>Alterar E-mail</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </ImageBackground>
  );
};
