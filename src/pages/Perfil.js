import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Perfil = () => {
  const IP_URL = "192.168.20.192";
  const [username, setUsername] = useState(null); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Primeiro useEffect: Recupera o token e o username do AsyncStorage
  // Primeiro useEffect: Recupera o token e o username do AsyncStorage
  useEffect(() => {
    const getTokenAndUsername = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('userToken');
        const savedUsername = await AsyncStorage.getItem('username');
        
        if (savedToken && savedUsername) {
          setUsername(savedUsername); // Apenas definir o username
        } else {
          setError("Token ou username não encontrados");
        }
      } catch (err) {
        console.error("Erro ao recuperar token ou username:", err);
        setError("Erro ao recuperar dados");
      } finally {
        setLoading(false);
      }
    };
    getTokenAndUsername();
  }, []);

  // Segundo useEffect: Busca o usuário do backend com base no username
  useEffect(() => {
    if (username) {
      setLoading(true);
      axios
        .get(`http://${IP_URL}:3000/usuarios/${username}`)
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data); // Define os dados do usuário
          } else {
            setError("Usuário não encontrado");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
          setError("Erro ao carregar o usuário");
        })
        .finally(() => {
          setLoading(false); // Para a animação de carregamento
        });
    }
  }, [username]);

  // Renderização enquanto os dados ainda estão carregando
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Renderização em caso de erro
  if (error) {
    return <Text>{error}</Text>;
  }

  // Renderização caso o usuário não seja encontrado
  if (!user) {
    return <Text>Usuário não encontrado</Text>;
  }
  const reviews = [
    {
      id: '1',
      drink: 'Caipirinha',
      rating: 3.5,
      review: 'A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.',
      
    },
    {
      id: '2',
      drink: 'Sangria',
      rating: 4,
      review: 'A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.',
      
    },
  ];

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Image source={{ uri: item.image }} style={styles.drinkImage} />
      <View style={styles.reviewText}>
        <Text style={styles.drinkTitle}>{item.drink}</Text>
        <Text style={styles.rating}>Avaliação: {item.rating} ★★★☆☆</Text>
        <Text>{item.review}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://linkparaafotodapessoa.com' }} 
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.rating}>4.5 ★</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Suas avaliações</Text>
      <FlatList 
        data={reviews}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        style={styles.reviewList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b29',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#252239',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    color: '#ccc',
  },
  rating: {
    color: '#ffd700',
    marginTop: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
  },
  reviewList: {
    paddingHorizontal: 20,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#2c2b39',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  drinkImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  reviewText: {
    marginLeft: 10,
    flex: 1,
  },
  drinkTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Perfil;
