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

export default function Coffes() {
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

        <Animated.Text style={[styles.choose, textoAnimated, { fontFamily: 'Belleza' }]}>Escolha seu Café</Animated.Text>

        <View style={styles.drinkSelection}>
          <PressComponent onPress={() => navigation.navigate('Drinks')} source={require('../assets/images/FirstTab.png')} styleI={styles.hexagon}/>
          <PressComponent source={require('../assets/images/SecondTabSec.png')} styleI={styles.hexagon}/>
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