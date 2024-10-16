import {jwtDecode} from 'jwt-decode';
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Perfil2 = ({ route }) => {
  const username = route?.params?.username;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const { width } = Dimensions.get('window'); // Correção

  //Função de Logout:
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      Alert.alert("Logout", "Você foi desconectado com sucesso.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao tentar fazer logout:", error);
      Alert.alert("Erro", "Não foi possível desconectar.");
    }
  };

  const reviews = [
    {
      id: "1",
      image: require("../assets/images/Drinks/Caipirinha.png"),
      drink: "Caipirinha",
      rating: 3.5,
      review: "A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.",
    },
    {
      id: "2",
      image: require("../assets/images/Drinks/Sangria.png"),
      drink: "Sangria",
      rating: 4,
      review: "A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.",
    },
  ];

//   const renderReview = ({ item }) => (
//   <View style={[styles.reviewCard, { width }]}>
//     <Image source={{ uri: item.image }} style={styles.drinkImage} />
//     <View style={styles.reviewText}>
//       <Text style={styles.drinkTitle}>{item.drink}</Text>
//       <Text style={styles.rating}>Avaliação: {item.rating} ★★★☆☆</Text>
//       <Text style={styles.textReview}>{item.review}</Text>
//     </View>
//   </View>
// );


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Drinks/PinaColada.png")}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user ? user.username : "Carregando..."}
          </Text>
          <Text style={styles.email}>
            {user ? user.email : "Carregando email..."}
          </Text>
          <Text style={styles.rating}>4.5 ★</Text>
        </View>
      </View>

      <ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.scrollViewContainer} // Adiciona este estilo
>
  <View style={[styles.feedbacks, { width }]}>
    <Text style={styles.sectionTitle}>Suas avaliações</Text>
    <ScrollView>
      {reviews.map((item) => (
        <View key={item.id} style={styles.reviewCard}>
  <View>
    <Image source={item.image} style={styles.drinkImage} />
  </View>
  
  {/* Container dos textos */}
  <View style={styles.reviewTextContainer}>
    {/* Título e Avaliação em uma linha */}
    <View style={styles.titleAndRating}>
      <Text style={styles.drinkTitle}>{item.drink}</Text>
      <Text style={styles.rating}>{item.rating} ★★★☆☆</Text>
    </View>
    
    {/* Review abaixo do título e avaliação */}
    <Text style={styles.textReview}>{item.review}</Text>
  </View>
</View>

      ))}
    </ScrollView>
  </View>
  
  <View style={[styles.settings, { width }]}>
    <Text style={styles.text}>Idioma</Text>
    <Text style={styles.text}>Trocar email</Text>
    <Text style={styles.text}>Trocar senha</Text>
    <Text style={styles.text}>Excluir conta</Text>
  </View>
  <Text style={styles.sectionTitle}>Configurações</Text>
</ScrollView>


      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button title="Sair" style={styles.sair} onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    width: '90%',  
    marginHorizontal: '5%',  
    flexDirection: 'row',  // Dispor os elementos em linha (imagem e textos lado a lado)
    alignItems: 'flex-start',  // Alinha o conteúdo no topo
    borderRadius: 20,  
    padding: 10,  
    marginBottom: 20,  
    backgroundColor: '#252239',  // Adicionando uma cor de fundo para destaque
  },

  drinkImage: {
    width: 90,  
    height: 120,  
    borderRadius: 10,  
    marginRight: 15,  
  },

  reviewTextContainer: {
    flex: 1,  
    flexDirection: 'column',  // Certifica que os textos fiquem um embaixo do outro
  },

  titleAndRating: {
    flexDirection: 'row',  // Coloca o título e a avaliação na mesma linha
    justifyContent: 'space-between',  // Espaça o título e a avaliação
    alignItems: 'center',  // Alinhar verticalmente
  },

  drinkTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,  // Permite que o título ocupe o máximo possível de espaço
  },

  rating: {
    color: "#ffd700",
    fontSize: 14,  // Ajustar o tamanho da avaliação
    marginLeft: 10,  // Espaçamento entre o título e a avaliação
  },

  textReview: {
    color: "#AFABAB",
    textAlign: "justify",
    marginTop: 5,  // Espaçamento acima do review
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1c1b29",
//   },
//   sair: {
//     marginTop: 790,
//     padding: 30,
//     },
  
//   header: {
//     flexDirection: "row",
//     padding: 20,
//     alignItems: "center",
//     backgroundColor: "#252239",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   profileImage: {
//     width: 380,
//     height: 460,
//     marginTop:10,
//     marginLeft: -15,
//   },
//   userInfo: {
//     marginLeft: -370,
//     marginTop:360,
//   },
//   userName: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   email: {
//     color: "#ccc",
//   },

//   sectionTitle: {
//     color: "#fff",
//     fontSize: 11,
//     marginTop: 20,
//     marginBottom: 10,
//     paddingRight: 250,
//     color: "#ccc",
//     padding: 11,
//   },

//   scrollViewContainer: {
//     justifyContent: 'center', // Centraliza horizontalmente
//     alignItems: 'center', // Centraliza verticalmente
//   },
  
//   textReview:{
//     color: "#AFABAB",
//     textAlign: "justify",
//   },

//   feedbacks: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#20202C',
//     borderRadius: 20,  // Arredondar toda a view de avaliações
//   },
//   settings: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,  // Arredondar toda a view de configurações
//   },
//   text: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     backgroundColor: '#FFFFFF',
//   },
  
//   reviewCard: {
//     width: '90%',  // Ocupa a maior parte da tela
//     marginHorizontal: '5%',  // Centraliza horizontalmente
//     flexDirection: 'row',  // Dispor os elementos em linha (imagem e textos lado a lado)
//     alignItems: 'center',  // Alinha verticalmente no centro
//     borderRadius: 20,  // Arredondar os cantos
//     padding: 10,  // Espaçamento interno
//     marginBottom: 20,  // Espaçamento entre os cards
//   },

//   drinkImage: {
//     width: 90,  // Largura da imagem
//     height: 120,  // Altura da imagem
//     borderRadius: 10,  // Bordas arredondadas da imagem
//     marginRight: 15,  // Espaçamento entre a imagem e os textos
//   },

//   reviewText: {
//     flex: 1,  // Faz o bloco de texto ocupar o restante do espaço
//     justifyContent: 'center',
//   },

//   drinkTitle: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5,  // Espaçamento inferior
//     flexDirection: "row",
//   },

//   rating: {
//     color: "#ffd700",
//     marginBottom: 5,  // Espaçamento inferior
//   },

//   textReview: {
//     color: "#AFABAB",
//     textAlign: "justify",
//   },
// });

export default Perfil2;

