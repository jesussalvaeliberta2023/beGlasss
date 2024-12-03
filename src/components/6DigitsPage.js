import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import axios from "axios";
import styles from "../styles/SecondaryPages/ForgetStyles";
import IP_URL from "../components/IP";
import { useNavigation } from "@react-navigation/native";

export default function DigitsPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [verificationCode, setVerificationCode] = useState(""); // Código de 6 dígitos
  const [newPassword, setNewPassword] = useState("");
  const [verificationCodeVerified, setVerificationCodeVerified] =
    useState(false);

  // Envia o e-mail de recuperação
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/esqueci-senha`, {
        email,
      });
      if (response.status === 200) {
        setMessage(
          "E-mail de recuperação enviado! Verifique sua caixa de entrada."
        );
        setShowModal(true); // Exibe o modal após envio bem-sucedido
      }
    } catch (error) {
      setMessage("Erro ao enviar e-mail. Verifique o e-mail digitado.");
    }
  };


  const navigation = useNavigation();

  // Verifica o código de recuperação
  const handleCodeVerification = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/verificar-codigo`, {
        email,
        code: verificationCode,
      });

      if (response.status === 200) {
        setMessage("Código verificado com sucesso! Agora você pode definir uma nova senha.");
        setVerificationCodeVerified(true); // Permite avançar para a redefinição de senha
      }
    } catch (error) {
      setMessage("Código inválido ou expirado. Tente novamente.");
    }
  };

  // Altera a senha no banco de dados
  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(`http://${IP_URL}:3000/alterar-senha`, {
        email,
        newPassword, // Envia a nova senha
      });

      if (response.status === 200) {
        setMessage("Senha alterada com sucesso! Você será redirecionado para a página de login.");
        setShowModal(false); // Fecha o modal
        setTimeout(() => navigation.navigate("Login"), 2000); // Redireciona para a tela de login
      }
    } catch (error) {
      setMessage("Erro ao alterar a senha. Tente novamente.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/Coffes/Coffe.png")}
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
          keyboardType="email-address"
        />
        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Enviar E-mail de Recuperação</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      {/* Modal para entrada do código de verificação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Se o código foi verificado, permite alterar a senha */}
            {verificationCodeVerified ? (
              <>
                <Text style={styles.modalTitle}>Digite Sua Nova Senha</Text>
                <TextInput
                  style={styles.input} // Reaproveitando o estilo do input principal
                  placeholder="Nova Senha"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={handlePasswordChange}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Alterar Senha</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>
                  Digite o Código de Verificação
                </Text>
                <TextInput
                  style={styles.codeInput}
                  placeholder="######"
                  placeholderTextColor="#888"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="numeric"
                  maxLength={6} // Limita a entrada a 6 dígitos
                />
                <TouchableOpacity
                  onPress={handleCodeVerification}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Verificar Código</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
