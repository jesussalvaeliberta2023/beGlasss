import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/circular-carousel';
import styles from '../styles/StyleSheet';
import { Image } from 'expo-image';
import { useFonts } from '@expo-google-fonts/belleza';

const data = [
  { image: require('../assets/images/Drinks/Caipirinha.png'), characteristic: 'Caipirinha', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/MoscowMule.png'), characteristic: 'Moscow Mule', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/Sangria.png'), characteristic: 'Sangria', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/Margarita.png'), characteristic: 'Margarita', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/VirginOnTheBeach.png'), characteristic: 'Virgin On The Beach', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/Mojito.png'), characteristic: 'Mojito', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/PinaColada.png'), characteristic: 'Pina Colada', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/BlueHawaiian.png'), characteristic: 'Blue Hawaiian', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/Flower.png'), characteristic: 'Flower', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/WattermelonSlushie.png'), characteristic: 'Wattermelon Slushie', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Drinks/Frame.png') }
];

export default function Drinks() {
  const [fontsLoaded] = useFonts({
    Belleza: require('../assets/fonts/Belleza/Belleza-Regular.ttf'),
  });

  const [activeImage, setActiveImage] = useState(data[0].image);
  const navigation = useNavigation();

  if (!fontsLoaded) {
    // Mostra um indicador de carregamento enquanto as fontes não são carregadas
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <ImageBackground source={activeImage} style={StyleSheet.absoluteFillObject} blurRadius={20}>
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.60)' }} />
        <View  style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')}>
            <Image source={require('../assets/images/Bars.png')} style={styles.headerOp} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Image source={require('../assets/images/Person.png')} style={styles.headerPe} />
          </Pressable>
        </View>
        <Text style={[styles.choose, { fontFamily: 'Belleza' }]}>Escolha seu Drink</Text>
        <View style={styles.drinkSelection}>
          <Pressable>
            <Image source={require('../assets/images/FirstTabSec.png')} style={styles.hexagon} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Coffes')}>
            <Image source={require('../assets/images/SecondTab.png')} style={styles.hexagon} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Juices')}>
            <Image source={require('../assets/images/ThirdTab.png')} style={styles.hexagon} />
          </Pressable>
        </View>
        <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} fontFamily="Belleza" />
        <View style={styles.tabs}>
          <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/images/HomeFilled.png')} style={styles.literlyButton} />
          </Pressable>
          <Pressable style={styles.favsButton} onPress={() => navigation.navigate('Favorites')}>
            <Image source={require('../assets/images/HeartNaked.png')} style={[styles.literlyButton, { marginTop: -9 }]} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}