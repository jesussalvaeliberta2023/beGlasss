import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, StyleSheet, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircularCarousel } from '../components/circular-carousel';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';
import { Image } from 'expo-image';
import { useFonts } from "expo-font";

const data = [
  require('../assets/images/Drinks/Caipirinha.png'),
  require('../assets/images/Drinks/MoscowMule.png'),
  require('../assets/images/Drinks/Sangria.png'),
  require('../assets/images/Drinks/Margarita.png'),
  require('../assets/images/Drinks/VirginOnTheBeach.png'),
  require('../assets/images/Drinks/Mojito.png'),
  require('../assets/images/Drinks/PinaColada.png'),
  require('../assets/images/Drinks/BlueHawaiian.png'),
  require('../assets/images/Drinks/Frame.png'),
];

export default function Home() {

  const [loaded] = useFonts({
    'Prompt': require('../assets/fonts/Belleza/Belleza-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  

  const [activeImage, setActiveImage] = useState(data[0]);
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style='light' translucent />
      <ImageBackground source={activeImage} style={ StyleSheet.absoluteFillObject } blurRadius={20}>
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.60)' }} />
          <Text style={styles.choose}>Escolha seu Drink</Text>
          <View style={styles.drinkSelection} >
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Image source={require('../assets/images/SelectTab.png')} style={styles.hexagon}/>
            </Pressable>
            <Pressable>
              <Image source={require('../assets/images/SecondTab.png')} style={styles.hexagon}/>
            </Pressable>
            <Pressable>
              <Image source={require('../assets/images/ThirdTab.png')} style={styles.hexagon}/>
            </Pressable>
          </View> 
          <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} />
          <View style={styles.tabs} >
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
              <Image source={require('../assets/images/HomeFilled.png')} style={styles.literlyButton}/>
            </Pressable>
            <Pressable style={styles.favsButton} onPress={() => navigation.navigate('Favorites')}>
              <Image source={require('../assets/images/HeartNaked.png')} style={[styles.literlyButton, {  marginTop: -9, }]}/>
            </Pressable>
            <Pressable style={styles.perfButton} onPress={() => navigation.navigate('Perfil')}>
              <Image source={require('../assets/images/PersonNaked.png')} style={[styles.literlyButton, {  marginTop: -9, }]}/>
            </Pressable>

          </View> 


      </ImageBackground>
     
    </View>
  );
}
