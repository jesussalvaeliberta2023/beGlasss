import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import IP_URL from '../components/IP';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
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

  return (
    <ImageBackground 
      source={require("../assets/images/Drinks/Margarita.png")} // Caminho da imagem que você enviou
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Entrar</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={passcode}
            onChangeText={setPasscode}
            secureTextEntry
          />

          <View style={styles.checkboxContainer}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={rememberMe ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={styles.label}>Manter-se conectado</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>Não tenho uma conta! Cadastrar</Text>
          </TouchableOpacity>

          <Text style={styles.subTitle}>Entrar com</Text>

          <TouchableOpacity style={styles.oauthButton}>
            <Text style={styles.oauthText}>Continue com o Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.oauthButton}>
            <Text style={styles.oauthText}>Continue com o Email</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay para escurecer a imagem
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
    color: '#fff',
    borderColor: '#888',
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#f5dd4b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#f5dd4b',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subTitle: {
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  oauthButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  oauthText: {
    color: '#333',
    fontSize: 16,
  },
});

export default LoginScreen;
