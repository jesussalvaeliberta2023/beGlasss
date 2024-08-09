import React, { useState, useEffect } from 'react';
import { StatusBar, View, ImageBackground, StyleSheet } from 'react-native';
import styles from '../styles/StyleSheet';
import { CircularCarousel } from '../components/circular-carousel';

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

export default function App() {
  const [activeImage, setActiveImage] = useState(data[0]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={activeImage} style={StyleSheet.absoluteFillObject}>
        <View style={{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Cor preta com 50% de opacidade
  }} />
        <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} />
      </ImageBackground>
    </View>
  );
}
