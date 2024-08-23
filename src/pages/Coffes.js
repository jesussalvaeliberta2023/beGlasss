import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/circular-carousel';
import styles from '../styles/StyleSheet';
import { Image } from 'expo-image';
import { useFonts } from '@expo-google-fonts/belleza';

const data = [
  { image: require('../assets/images/Coffes/Capuccino.png'), characteristic: 'Capuccino', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Affogato.png'), characteristic: 'Affogato', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Mochaccino.png'), characteristic: 'Mochaccino', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Machiatto.png'), characteristic: 'Machiatto', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Latte.png'), characteristic: 'Latte', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Frappe.png'), characteristic: 'Frappe', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Smoothie.png'), characteristic: 'Smoothie', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/IcedMocha.png'), characteristic: 'Mocha Gelado', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Coffe.png'), characteristic: 'Café', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/IcedCoffe.png'), characteristic: 'Café Gelado', icon: require('../assets/images/HeartNaked.png') },
  { image: require('../assets/images/Coffes/Frame.png') }
];

// characteristic: 'Capuccino', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Affogato', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Mochaccino', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Machiatto', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Latte', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Mojito', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Pina Colada', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Blue Hawaiian', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Flower', icon: require('../assets/images/HeartNaked.png') },
// characteristic: 'Wattermelon Slushie', icon: require('../assets/images/HeartNaked.png') },

export default function Coffes() {
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
          <Pressable>
            <Image source={require('../assets/images/SecondTabSec.png')} style={styles.hexagon} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Juices')}>
            <Image source={require('../assets/images/ThirdTab.png')} style={styles.hexagon} />
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