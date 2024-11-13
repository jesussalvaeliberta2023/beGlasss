import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import styles from "../styles/SecondaryPages/LanguageStyles";

// O i18next serve para gerenciamento de internacionalização para acessar recursos de linguagem.
import i18next, { languageResources } from "../services/i18next";
//Hook da biblioteca react-i18next para tradução.
import { useTranslation } from "react-i18next";
// Importa uma lista de idiomas, contendo informações como nomes nativos dos idiomas.
import languagesList from "../services/languagesList.json";
// import styles from "../styles/StyleSheet";

//controla a visibilidade do modal
//Desestrutura o método t do hook useTranslation, que é usado para traduzir textos de acordo com o idioma atual.
const Language = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  //changeLng: Função para alterar o idioma usando i18next. Recebe o código do idioma (lng), altera a linguagem e fecha o modal.
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerIII}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.languagesList}>
          <FlatList
            // Lista de idiomas disponíveis. Usa Object.keys(languageResources) para obter a lista de chaves
            //(códigos dos idiomas) e renderItem para renderizar cada item
            data={Object.keys(languageResources)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLng(item)}
              >
                <Text style={styles.lngName}>
                  {languagesList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Text style={styles.text}>{t("welcome")}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        {/* Text exibe texto traduzido usando o método t. */}
        <Text style={styles.buttonText}>{t("change-language")}</Text>
      </TouchableOpacity>
      <View style={styles.tabs}>
        <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/images/HomeNaked.png")}
            style={styles.literlyButton}
          />
        </Pressable>
        <Pressable
          style={styles.favsButton}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Image
            source={require("../assets/images/HeartNaked.png")}
            style={[styles.literlyButton, { marginTop: -9 }]}
          />
        </Pressable>
        <Pressable
          style={styles.favsButton}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Image
            source={require("../assets/images/HeartNaked.png")}
            style={[styles.literlyButton, { marginTop: -9 }]}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Language;
