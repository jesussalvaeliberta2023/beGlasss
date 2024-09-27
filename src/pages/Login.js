import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
  Switch,  // Importa o Switch para o lembrar-me
} from "react-native";
import { BlurView } from "expo-blur";
import styles from "../styles/StyleSheet";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Estado para lembrar-me
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  const IP_URL = "10.144.170.57"; // Variável de URL definida como constante

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/login`, {
        username: username,
        passcode: passcode,
        rememberMe: rememberMe, // Envia rememberMe para o backend
      });
  
      if (response.status === 200) {
        const token = response.data.token;
  
        // Verifica se o token existe antes de prosseguir
        if (!token) {
          alert("Token não recebido. Verifique as credenciais.");
          return;
        }
  
        alert("Login bem-sucedido");
  
        // Salva o token e o username no AsyncStorage se rememberMe estiver ativo
        if (rememberMe) {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('username', username);
          console.log("Token e username salvos:", token, username);
        }
  
        navigation.navigate("Perfil");
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      // Melhora a mensagem de erro exibida
      if (error.response) {
        // O servidor respondeu com um código de status fora da faixa 2xx
        console.error("Erro ao fazer login:", error.response.data);
        alert("Usuário ou senha incorretos");
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error("Erro ao fazer login: Sem resposta do servidor", error.request);
        alert("Erro ao conectar ao servidor");
      } else {
        // Algo aconteceu ao configurar a requisição
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login");
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={10}
        style={{ flex: 1 }}
        source={require("../assets/images/Drinks/VirginOnTheBeach.png")}
      >
        <Image
          source={require("../assets/images/Logo.png")}
          style={estilos.imagens}
        />
        <BlurView intensity={100} style={estilos.absolute} tint="dark">
          <View style={estilos.corpinho}>
            <Text style={estilos.titulations}>Faça seu Login</Text>
            <TextInput
              placeholder="Usuário:"
              placeholderTextColor={"white"}
              onChangeText={(username) => setUsername(username)}
              style={estilos.inputs}
            />
            <TextInput
              placeholder="Senha:"
              placeholderTextColor={"white"}
              onChangeText={(passcode) => setPasscode(passcode)}
              secureTextEntry={true} // Adiciona ocultação da senha
              style={estilos.inputs}
            />
            <View style={estilos.rememberMe}>
              <Text style={{ color: "white" }}>Lembrar-me</Text>
              <Switch
                value={rememberMe}
                onValueChange={(value) => setRememberMe(value)}
              />
            </View>
            <TouchableOpacity style={estilos.botaun} onPress={handleLogin}>
              <Text style={{ textAlign: "center" }}>Press Me</Text>
            </TouchableOpacity>
            <Pressable
              style={estilos.botaun2}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Cadastrar-se
              </Text>
            </Pressable>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const estilos = StyleSheet.create({
  inputs: {
    width: 375,
    height: 45,
    fontStyle: 'italic',
    color: 'white',
    borderBottomWidth: 2,
    borderColor: "white",
    fontSize: 20,
    marginTop: "15%",
  },
  corpinho: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulations: {
    fontSize: 25,
    marginTop: "22%",
    color: "white",
    textAlign: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imagens: {
    width: 240,
    height: 200,
    alignSelf: "center",
    marginTop: "20%",
    marginLeft: "10%",
    zIndex: 1,
  },
  botaun: {
    backgroundColor: "#E98F83",
    marginTop: "15%",
    width: 300,
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
  },
  botaun2: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginTop: "15%",
    width: 85,
    height: 25,
    justifyContent: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
