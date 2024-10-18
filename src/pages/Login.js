import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import IP_URL from '../components/IP';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  // Login
  const handleLogin = async () => {
    console.log("Dados enviados:", { email, password, rememberMe: isChecked });
  
    try {
      const response = await axios.post(`http://${IP_URL}:3000/login`, {
        email: email,
        password: password,  
        rememberMe: isChecked,
      });
  
      // Verificando se o login foi bem-sucedido com status 200
      if (response.status === 200) {
        const token = response.data.token;
  
        // Verificando se o token foi recebido
        if (!token) {
          alert("Token não recebido. Verifique as credenciais.");
          return; // Não prosseguir sem o token
        }
  
        alert("Login bem-sucedido");
  
        // Salvando o token e email no AsyncStorage se a opção 'lembrar-me' estiver ativa
        if (isChecked) {
          await AsyncStorage.setItem('userToken', token); // Salvando o token
          await AsyncStorage.setItem('email', email); // Salvando o email
          console.log("Token e email salvos:", token, email);
        }
  
        // Navegando para a página 'Perfil'
        navigation.navigate("Perfil", { email: email });
      } else {
        // Caso o status não seja 200, login falhou
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      // Tratando erro ao fazer login
      if (error.response && error.response.status === 401) {
        // Se o servidor retornar 401, significa que o email ou senha estão incorretos
        alert("Usuário ou senha incorretos");
      } else if (error.response) {
        // Outro tipo de erro com resposta do servidor
        console.error("Erro ao fazer login:", error.response.data);
        alert("Erro ao fazer login. Tente novamente mais tarde.");
      } else if (error.request) {
        // Erro sem resposta do servidor (possível problema de rede)
        console.error("Erro ao fazer login: Sem resposta do servidor", error.request);
        alert("Erro ao conectar ao servidor. Verifique sua conexão.");
      } else {
        // Outro tipo de erro
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  // Função para alternar o estado do checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Alterna entre true e false
  };

  const handleForgotPassword = () => {
    navigation.navigate('EsqueciSenha');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/Coffes/Coffe.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <View><Text style={{color: 'white'}}>Voltar</Text></View>
        </TouchableOpacity>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}  // Usando setPassword para a senha
          secureTextEntry
        />
      </View>  
      <View style={styles.container2}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <MaterialCommunityIcons name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.label}>Manter-se conectado</Text>
        </View>
      
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.registerText}>
            Não tenho uma conta! <Text style={styles.highlight}>Cadastrar</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Entrar com</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Continue com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailButton}>
          <Text style={styles.emailButtonText}>Continue com o Email</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta a imagem de fundo
    justifyContent: 'center',
  },
  container: {
    flex: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'black',
  },
  container2: {
    flex: 1,
    justifyContent: 'top',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo semi-transparente sobre a imagem
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 10,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#FFF',
    marginBottom: 30,
  },
  highlight: {
    color: '#FFD700',
  },
  orText: {
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#000',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;