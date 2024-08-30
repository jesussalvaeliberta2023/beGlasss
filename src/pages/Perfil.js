import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Perfil = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Nome de Usuário */}
      <Text style={styles.title}>Nome de Usuário</Text>
      <Text style={styles.info}>Ameinda Ferraez</Text>

      {/* Email */}
      <Text style={styles.title}>Email</Text>
      <Text style={styles.info}>ameindafe777@example.com</Text>

      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('configuracoesPerfil')}>
        <Text style={styles.buttonText}>Configuração</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('configuracoesPerfil')}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Perfil;
