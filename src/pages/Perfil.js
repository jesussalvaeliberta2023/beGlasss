import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import i18next, {languageResources} from '../services/i18next';
import {useTranslation} from 'react-i18next';
import languagesList from '../services/languagesList.json';
import styles from '../styles/StyleSheet';

const Perfil = () => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerIII}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.languagesList}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLng(item)}>
                <Text style={styles.lngName}>
                  {languagesList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Text style={styles.text}>{t('welcome')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t('change-language')}</Text>
      </TouchableOpacity>
      <View style={styles.tabs} >
        <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/images/HomeNaked.png')} style={styles.literlyButton}/>
        </Pressable>
        <Pressable style={styles.favsButton} onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('../assets/images/HeartNaked.png')} style={[styles.literlyButton, {  marginTop: -9, }]}/>
        </Pressable>
        <Pressable style={styles.perfButton} onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../assets/images/PersonFilled.png')} style={[styles.literlyButton, {  marginTop: -9, }]}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;