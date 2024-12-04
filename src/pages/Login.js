import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import IP_URL from "../components/IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

const LogIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Alterado para usernameOrEmail
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailInput, setIsEmailInput] = useState(true); // Para controlar o tipo de input
  const navigation = useNavigation();

  //Login
  const handleLogin = async () => {
    // Verificar se o campo de entrada (email ou username) e a senha estão preenchidos
    if ((!email && !username) || !password) {
      setError("Por favor, preencha todos os campos.");
      return; // Interrompe a execução da função se ambos os campos (email ou username) ou a senha estiverem vazios
    }
  
    console.log("Dados enviados:", {
      email,
      username,
      password,
      rememberMe: isChecked,
    });
  
    try {
      // Condicionalmente envia username ou email baseado no que foi inserido
      const response = await axios.post(`http://${IP_URL}:3000/login`, {
        email: isEmailInput ? email : "", // Envia o email somente se for um email
        username: !isEmailInput ? username : "", // Envia o username somente se não for um email
        password: password,
        rememberMe: isChecked, // Envia a flag de manter-se conectado
      });
  
      if (response.status === 200) {
        const token = response.data.token;
  
        if (!token) {
          alert("Token não recebido. Verifique as credenciais.");
          return;
        }
  
        alert("Login bem-sucedido");
  
        if (isChecked) {
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("usernameOrEmail", email || username); // Salva o email ou username
          console.log("Token e usuário/email salvos:", token, email || username);
        }
  
        // Navegar para a tela de perfil
        navigation.navigate("Perfil", { usernameOrEmail: email || username });
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Usuário ou senha incorretos");
      } else if (error.response) {
        setError("Usuário/Email ou senha incorretos");
      } else if (error.request) {
        console.error("Erro ao fazer login: Sem resposta do servidor", error.request);
        alert("Erro ao conectar ao servidor. Verifique sua conexão.");
      } else {
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  // Função para alternar o estado do checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleForgotPassword = () => {
    navigation.navigate("DigitsPage");
  };

  // Função para alternar entre Email e Usuário
  const toggleInputType = () => {
    setIsEmailInput(!isEmailInput);
    setUsernameOrEmail(""); // Limpa o campo ao mudar
  };

  return (
    <ImageBackground
      source={require("../assets/images/Coffes/Coffe.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Drinks")}>
          <View>
            <Text style={{ color: "white" }}>Voltar</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
  style={styles.input}
  placeholder={"Email ou Usuário"} 
  placeholderTextColor="#888"
  value={isEmailInput ? email : username} // Exibe o valor de acordo com o tipo
  onChangeText={(text) => {
    if (text.includes("@")) {
      setIsEmailInput(true); // Marca como email
      setEmail(text); // Armazena como email
    } else {
      setIsEmailInput(false); // Marca como username
      setUsername(text); // Armazena como username
    }
  }}
/>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.ContainerErro}>
          <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
            {error}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <MaterialCommunityIcons
              name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.label}>Manter-se conectado</Text>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.btnCadastrar}
        >
          <Text style={styles.registerText}>
            Não tenho uma conta! <Text style={styles.highlight}>Cadastrar</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Entrar com</Text>

        <TouchableOpacity onPress={toggleInputType} style={styles.emailButton}>
          <Text style={styles.emailButtonText}>Continuar com Google</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={toggleInputType}
          style={[
            styles.emailButton2,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Fontisto
            name="email"
            size={30}
            color="black"
            style={{ marginRight: 40 }}
          />
          <Text style={styles.emailButtonText}>
            Continuar com {isEmailInput ? "Usuário" : "Email"}
          </Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta a imagem de fundo
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "rgba(80, 48, 30, 0.3)",
  },
  title: {
    fontSize: 35,
    color: "#FFF",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "black",
    color: "#FFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "top",
  },
  label: {
    margin: 10,
    color: "#FFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#FFF",
  },
  highlight: {
    color: "#FFC700",
  },
  orText: {
    color: "#FFF",
    marginBottom: 30,
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  emailButton2: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  emailButtonText: {
    color: "#000",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline",
    justifyContent: "center",
  },

  btnCadastrar: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  ContainerErro: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogIn;
