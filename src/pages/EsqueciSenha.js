import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import styles from "../styles/StyleSheet";

export default function EsqueciSenha() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Esqueci a Senha</Text>
      </View>
      <View>
        <TextInput keyboardType="email" placeholder="Email"  />
      </View>
    </View>
  );
}
