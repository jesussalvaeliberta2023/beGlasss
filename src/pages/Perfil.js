import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pefil = () => {
  const reviews = [
    {
      id: '1',
      drink: 'Caipirinha',
      rating: 3.5,
      review: 'A caipirinha é refrescante e equilibrada, mas a qualidade da cachaça e a mistura dos ingredientes podem variar. Boa, mas pode melhorar.',
      image: 'https://linkparaimagemdacaipirinha.com' 
    },
    {
      id: '2',
      drink: 'Sangria',
      rating: 4,
      review: 'A sangria é uma opção saborosa e refrescante, mas pode ser um pouco doce para alguns paladares.',
      image: 'https://linkparaimagemdasangria.com'
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
          <Text style={styles.userName}>Ameinda Ferraez</Text>
          <Text style={styles.email}>ameinda.ferraez@gmail.com</Text>
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

export default Pefil;
