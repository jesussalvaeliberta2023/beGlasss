import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StatusBar, View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { CircularCarousel } from '../components/circular-carousel';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';
import { Image } from 'expo-image';

const data = [
  require('../assets/images/Caipirinha.png'),
  require('../assets/images/MoscowMule.png'),
  require('../assets/images/Sangria.png'),
  require('../assets/images/Margarita.png'),
  require('../assets/images/VirginOnTheBeach.png'),
  require('../assets/images/Mojito.png'),
  require('../assets/images/PinaColada.png'),
  require('../assets/images/BlueHawaiian.png'),
  require('../assets/images/Frame.png'),
];

export default function Home() {
  const [activeImage, setActiveImage] = useState(data[0]);
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.tabs} >
        <Pressable>
          <Image source={require('../assets/images/SelectTab.png')} style={styles.hexagon}/>
        </Pressable>
        <Pressable>
          <Image source={require('../assets/images/SecondTab.png')} style={styles.hexagon}/>
        </Pressable>
        <Pressable>
          <Image source={require('../assets/images/ThirdTab.png')} style={styles.hexagon}/>
        </Pressable>
      </View> 
      <ImageBackground source={activeImage} style={StyleSheet.absoluteFillObject}>
        <BlurView intensity={100} style={StyleSheet.absoluteFillObject}>
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.80)' }} />
          <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} />
          <View style={styles.tabs} >
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
              <Image source={require('../assets/images/HomeFilled.png')} style={styles.literlyButton}/>
            </Pressable>
            <Pressable style={styles.favsButton} onPress={() => navigation.navigate("Favorites")}>
              <Image source={require('../assets/images/HeartNaked.png')} style={[styles.literlyButton, {  marginTop: -9, }]}/>
            </Pressable>
          </View> 
        </BlurView>
      </ImageBackground>
     
    </View>
  );
}
