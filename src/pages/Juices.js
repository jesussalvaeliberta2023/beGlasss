import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/CircularCarousel/CircularCarousel';
import { useFonts } from '@expo-google-fonts/belleza';
import styles from '../styles/StyleSheet';
import PressComponent from '../components/PressableComponent';

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
  const [activeImage, setActiveImage] = useState(data[0]);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Belleza: require('../assets/fonts/Belleza/Belleza-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <ImageBackground source={activeImage} style={StyleSheet.absoluteFillObject} blurRadius={20}>
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.60)' }} />

        <View  style={styles.headerD}>
          <PressComponent onPress={() => navigation.navigate('Login')} source={require('../assets/images/Bars.png')} styleI={styles.headerOp}/>
          <PressComponent onPress={() => navigation.navigate('SignUp')} source={require('../assets/images/Person.png')} styleI={styles.headerPe}/>
        </View>

        <Text style={[styles.choose, { fontFamily: 'Belleza' }]}>Escolha seu Suco</Text>

        <View style={styles.drinkSelection}>
          <PressComponent onPress={() => navigation.navigate('Drinks')} source={require('../assets/images/FirstTab.png')} styleI={styles.hexagon}/>
          <PressComponent onPress={() => navigation.navigate('Coffes')} source={require('../assets/images/SecondTab.png')} styleI={styles.hexagon}/>
          <PressComponent source={require('../assets/images/ThirdTabSec.png')} styleI={styles.hexagon}/>
        </View>

        <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} fontFamily="Belleza" />

        <View style={styles.tabss}>
          <PressComponent onPress={() => navigation.navigate('Home')} source={require('../assets/images/HomeFilled.png')} styleI={[styles.literlyButton, { marginTop: -9 }]} styleP={styles.homeButton}/>
          <PressComponent onPress={() => navigation.navigate('Favorites')} source={require('../assets/images/HeartNaked.png')} styleI={[styles.literlyButton, { marginTop: -11, tintColor: '#BDBDBD' }]} styleP={styles.favsButton}/>
        </View>
      </ImageBackground>
    </View>
  );
}