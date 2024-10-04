import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [isSelected, setSelection] = useState(false);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Estado para lembrar-me
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  

  const handleLogin = async () => {
    console.log("Dados enviados:", { username, passcode, rememberMe });

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
        
  
        navigation.navigate("Perfil", { username: username });

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
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={passcode}
        onChangeText={setPasscode}
        secureTextEntry
/>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Manter-se conectado</Text>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  link: {
    color: '#ffcc00',
    marginTop: 20,
    textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
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
  },
});

export default LoginScreen;