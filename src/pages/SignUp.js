import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import IP_URL from "../components/IP";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Importando a imagem local
import backgroundImage from "../assets/images/Coffes/Coffe.png";

export default function CadastroScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  // Função para alternar o estado do checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Alterna entre true e false
  };

  const validateEmail = (email) => {
    // Expressão regular para verificar se o e-mail é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|gmx\.[a-z]{2,3})$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleCadastro = async () => {
    console.log("Clicou.");
    if (!validateEmail(email)) {
      setErrorMessage("O email deve ser um @gmail.com.");
      console.log("O email deve conter @gmail.com ");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      console.log("A senha deve conter pelo menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!isChecked) {
      setErrorMessage("Você deve concordar com os termos e políticas.");
      return;
    }

    try {
      const response = await axios.post(`http://${IP_URL}:3000/usuarios`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        // Redireciona para a página de login após o cadastro bem-sucedido
        Alert.alert("Você Cadastrou com sucesso!")
        navigation.navigate("Login");
      }
    } catch (error) {
      setErrorMessage("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    // Usando ImageBackground para criar o fundo
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View><Text style={{color: 'white'}}>Voltar</Text></View>
        </TouchableOpacity>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          placeholderTextColor="white"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <MaterialCommunityIcons
              name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.label}>
            Concordo com os termos de <Text style={styles.link}>política</Text> e <Text style={styles.link}>privacidade</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={handleCadastro} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Já tenho uma conta! <Text style={styles.link}>Entre</Text>
        </Text>

        {/* <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue com o Google</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Garante que a imagem se ajuste corretamente
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Cor de fundo semitransparente para o conteúdo
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "black",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  label: {
    margin: 10,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#FFC700",
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginBottom: 10
  }
});
