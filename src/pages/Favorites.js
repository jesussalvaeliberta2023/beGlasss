import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';

// Lista de Imagens com Títulos
const imagenes = [
  { id: '1', title: 'Caipirinha', image: require('../assets/images/Drinks/Caipirinha.png') },
  { id: '2', title: 'Moscow Mule', image: require('../assets/images/Drinks/MoscowMule.png') },
  { id: '3', title: 'Sangria', image: require('../assets/images/Drinks/Sangria.png') },
  { id: '4', title: 'Margarita', image: require('../assets/images/Drinks/Margarita.png') },
  { id: '5', title: 'Virgin on the Beach', image: require('../assets/images/Drinks/VirginOnTheBeach.png') },
  { id: '6', title: 'Mojito', image: require('../assets/images/Drinks/Mojito.png') },
  { id: '7', title: 'Piña Colada', image: require('../assets/images/Drinks/PinaColada.png') },
  { id: '8', title: 'Blue Hawaiian', image: require('../assets/images/Drinks/BlueHawaiian.png') },
];

// Medindo o tamanho da Tela
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
0

// Definindo tamanhos
// Tamanho do container de imagem
const CONTAINER_WIDTH = width * 0.6;
// Espaço de margem
const CONTAINER_SPACE = (width - CONTAINER_WIDTH) / 2;
// Espaço entre as caixas
const ESPACIO = 4;
// Altura do fundo
const ALTURA_BACKDROP = height * 1

// Conf. das imgs p/ Fundo de tela
function Backdrop({ scrollX }) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
        { overflow: 'hidden' } 
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * CONTAINER_WIDTH,
          index * CONTAINER_WIDTH,
          (index + 1) * CONTAINER_WIDTH,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.Image
            key={index}
            source={imagen.image}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <BlurView
        style={StyleSheet.absoluteFillObject}
        intensity={100} //intensidade do desfoque
        tint="dark" // tom do desfoque
      />
      <LinearGradient
        colors={['transparent', 'black']}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.containerII}>
    <StatusBar hidden />

      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment='start'
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: CONTAINER_SPACE,
        }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item.id} 
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CONTAINER_WIDTH,
            index * CONTAINER_WIDTH,
            (index + 1) * CONTAINER_WIDTH,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <View style={{ width: CONTAINER_WIDTH }}>
              <View style={styles.buttonContainer}>
        <Pressable style={styles.squareButton} onPress={() => navigation.navigate('Drinks')}>
          <Text style={styles.buttonText}>Drinks</Text>
        </Pressable>
        <Pressable style={styles.squareButton} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.buttonText}>Favorites</Text>
        </Pressable>
        <Pressable style={styles.squareButton} onPress={() => navigation.navigate('Language')}>
          <Text style={styles.buttonText}>Language</Text>
        </Pressable>
      </View>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 30,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={item.image} style={[styles.posterImage, { height: CONTAINER_WIDTH * 1.2 }]} />
                <Text style={{ fontWeight: 'bold', fontSize: 26, color: 'white', }}>
                  {item.title}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />

      {/* Botoes de rota */}
      <View style={styles.tabs} >
        {/* HOME */}
        <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Drinks')}>
          <Image source={require('../assets/images/HomeNaked.png')} style={styles.literlyButton} />
        </Pressable>
        {/* FAVORITOS */}
        <Pressable style={styles.favsButton} onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('../assets/images/HeartFilled.png')} style={[styles.literlyButton, { marginTop: -9, }]} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
