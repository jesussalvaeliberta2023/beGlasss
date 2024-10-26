import React, { useState } from "react";
import styles from "../styles/EsqueciStyles";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import IP_URL from "../components/IP";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/forgot-password`, { email });
      if (response.status === 200) {
        setMessage("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
      }
    } catch (error) {
      setMessage("Erro ao enviar e-mail. Verifique o e-mail digitado.");
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/Coffes/Coffe.png')} 
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Esqueci a Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Enviar E-mail de Recuperação</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </ImageBackground>
  );
};
