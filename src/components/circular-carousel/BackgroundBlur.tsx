import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

const BlurredBackground = ({ source }) => {
  return (
    <ImageBackground
      source={source}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={50} style={styles.blurView} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default BlurredBackground;