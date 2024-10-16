import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import IP_URL from '../components/IP';
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
  const [isSelected, setSelection] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log("Dados enviados:", { username, passcode, rememberMe });

    try {
      const response = await axios.post(`http://${IP_URL}:3000/login`, {
        username: username,
        passcode: passcode,
        rememberMe: rememberMe,
      });
  
      if (response.status === 200) {
        const token = response.data.token;
  
        if (!token) {
          alert("Token não recebido. Verifique as credenciais.");
          return;
        }
  
        alert("Login bem-sucedido");
        
        if (rememberMe) {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('username', username);
          console.log("Token e username salvos:", token, username);
        }
        
        navigation.navigate("Perfil", { username: username });
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro ao fazer login:", error.response.data);
        alert("Usuário ou senha incorretos");
      } else if (error.request) {
        console.error("Erro ao fazer login: Sem resposta do servidor", error.request);
        alert("Erro ao conectar ao servidor");
      } else {
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login");
      }
    }
  };

  // Função para alternar o estado do checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Alterna entre true e false
  };

  return (
    <ImageBackground 
      source={require('../assets/images/Coffes/Coffe.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
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
          value={passcode}
          onChangeText={setPasscode}
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
      
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.registerText}>
            Não tenho uma conta! <Text style={styles.highlight}>Cadastrar</Text>
          </Text>
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
});

export default LoginScreen;
