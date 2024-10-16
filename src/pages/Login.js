import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import IP_URL from '../components/IP';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/Coffes/Latte.png")} o
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Manter-se conectado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupText}>Não tenho uma conta! Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue com o Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue com o Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo transparente para o conteúdo
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signupText: {
    color: '#FFC107',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: '#000',
  },
});
