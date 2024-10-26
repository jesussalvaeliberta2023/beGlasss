import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import IP_URL from "../components/IP";

const ResetPasswordScreen = ({ route }) => {
    const { token } = route.params; // Recebe o token da navegação
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post(`http://${IP_URL}:3000/reset-password`, {
                token,
                newPassword,
            });

            if (response.data.success) {
                Alert.alert("Sucesso", "Senha redefinida com sucesso!");
                navigation.navigate("LoginScreen");
            } else {
                Alert.alert("Erro", response.data.message || "Ocorreu um erro.");
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível redefinir a senha. Tente novamente.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Digite sua nova senha:</Text>
            <TextInput
                secureTextEntry
                placeholder="Nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
                style={{ borderBottomWidth: 1, marginBottom: 12 }}
            />
            <Text>Confirme sua nova senha:</Text>
            <TextInput
                secureTextEntry
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
            />
            <Button title="Redefinir Senha" onPress={handleResetPassword} />
        </View>
    );
};

export default ResetPasswordScreen;
