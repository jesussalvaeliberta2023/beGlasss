import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/CircularCarousel/CircularCarousel';
import { useFonts } from '@expo-google-fonts/belleza';
import styles from '../styles/StyleSheet';
import PressComponent from '../components/PressableComponent';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

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
  const [activeImage, setActiveImage] = useState(data[0].image);
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const textoAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(translateX.value) }]};
  });

  const iconeAnimated = useAnimatedStyle(() => {
    return { transform: [{ translateX: withSpring(-translateX.value) }]};
  });

  const changeRoleta = (image, direction) => {
    setActiveImage(image);
    if (direction === "up") { translateX.value = -300 }
  };

  const resetRoleta = () => {
    translateX.value = 0;
  };

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

        <View style={styles.headerD}>
          <PressComponent onPress={() => navigation.navigate('Login')} source={require('../assets/images/Bars.png')} styleI={styles.headerOp}/>
          <Animated.View style={iconeAnimated}>
            <PressComponent onPress={() => navigation.navigate('SignUp')} source={require('../assets/images/Person.png')} styleI={styles.headerPe}/>
          </Animated.View>
        </View>

        <Animated.Text style={[styles.choose, textoAnimated, { fontFamily: 'Belleza' }]}>Escolha seu Drink</Animated.Text>

        <View style={styles.drinkSelection}>
          <PressComponent source={require('../assets/images/FirstTabSec.png')} styleI={styles.hexagon}/>
          <PressComponent onPress={() => navigation.navigate('Coffes')} source={require('../assets/images/SecondTab.png')} styleI={styles.hexagon}/>
          <PressComponent onPress={() => navigation.navigate('Juices')} source={require('../assets/images/ThirdTab.png')} styleI={styles.hexagon}/>
        </View>

        <CircularCarousel 
          data={data} 
          onImageChange={changeRoleta} 
          onReset={resetRoleta} 
          fontFamily="Belleza" 
        />

        <View style={styles.tabss}>
          <PressComponent onPress={() => navigation.navigate('Home')} source={require('../assets/images/HomeFilled.png')} styleI={[styles.literlyButton, { marginTop: -9 }]} styleP={styles.homeButton}/>
          <PressComponent onPress={() => navigation.navigate('Favorites')} source={require('../assets/images/HeartNaked.png')} styleI={[styles.literlyButton, { marginTop: -11, tintColor: '#ffffff' }]} styleP={styles.favsButton}/>
        </View>
      </ImageBackground>
    </View>
  );
}