import React, { useState } from 'react';
import { StatusBar, View, ImageBackground, StyleSheet } from 'react-native';
import { CircularCarousel } from '../components/circular-carousel';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';

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
      
      {/* Camada de fundo com imagem */}
      <ImageBackground source={activeImage} style={StyleSheet.absoluteFillObject}>
        {/* Camada de desfoque */}
        <BlurView intensity={100} style={StyleSheet.absoluteFillObject} />
      </ImageBackground>

      {/* Camada escura para contraste */}
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.80)' }} />

      {/* Carrossel de imagens */}
      <CircularCarousel data={data} onImageChange={(image) => setActiveImage(image)} />
    </View>
  );
}
