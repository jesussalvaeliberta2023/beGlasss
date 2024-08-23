import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/circular-carousel';
import styles from '../styles/StyleSheet';
import { Image } from 'expo-image';
import { useFonts } from '@expo-google-fonts/belleza';

const data = [
  { image: require('../assets/images/Juices/GreenJuice.png'), characteristic: 'Suco Verde', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/OrangeCarrotJuice.png'), characteristic: 'Suco de Laranja com Cenoura', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/TropicalJuice.png'), characteristic: 'Suco Tropical', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/PineapplePassionJuice.png'), characteristic: 'Suco de Abacaxi com Maracujá', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/MangoRedJuice.png'), characteristic: 'Suco de Vermelhas com Manga', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/LemonTeaJuice.png'), characteristic: 'Suco de Limão com Chá', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/GrapeKiwiJuice.png'), characteristic: 'Suco de Kiwi com Uva', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/LemonBlackbarryJuice.png'), characteristic: 'Suco de Limão com Amora', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/PinkLemonJuice.png'), characteristic: 'Pink Limonade', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/DragonJuice.png'), characteristic: 'Suco de Pitaia', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Juices/Frame.png') }
];

export default function Juices() {
  const [fontsLoaded] = useFonts({
    Belleza: require('../assets/fonts/Belleza/Belleza-Regular.ttf'),
  });

  const [activeImage, setActiveImage] = useState(data[0]);
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
          <Pressable onPress={() => navigation.navigate('Drinks')}>
            <Image source={require('../assets/images/FirstTab.png')} style={styles.hexagon} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Coffes')}>
            <Image source={require('../assets/images/SecondTab.png')} style={styles.hexagon} />
          </Pressable>
          <Pressable>
            <Image source={require('../assets/images/ThirdTabSec.png')} style={styles.hexagon} />
          </Pressable>
        </View>
        <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} />
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