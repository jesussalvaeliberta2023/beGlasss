import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';


export default function LoginPage() {

    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={{flex: 1}} source={require('../assets/images/Drinks/VirginOnTheBeach.png')}>
                <Image source={require('../assets/images/Logo.png')} style={estilos.imagens}/>
                <BlurView intensity={100} style={estilos.absolute} tint='dark'>
                    <View style={estilos.corpinho}>
                        <Text style={estilos.titulations}>Faça seu Login</Text>
                        <TextInput placeholder="Usuário:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TextInput placeholder="Senha:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TouchableOpacity style={estilos.botaun}>
                            <Text style={{textAlign: 'center'}}>Press Me</Text>
                        </TouchableOpacity>
                        <Pressable style={estilos.botaun2} onPress={() => navigation.navigate('Language')}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Cadastrar-se</Text>
                        </Pressable>
                    </View>
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const estilos = StyleSheet.create({
    inputs: {
        width: 400,
        height: 45,
        borderBottomWidth: 2,
        borderColor: 'white',
        fontSize: 20,
        marginTop: '15%',
    },
    corpinho: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulations: {
        fontSize: 25,
        marginTop: '22%',
        color: 'white',
        textAlign: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    imagens: {
        width: 240,
        height: 200,
        alignSelf: 'center',
        marginTop: '20%',
        marginLeft: '10%',
        zIndex: 1
    },
    botaun: {
        backgroundColor: '#E98F83',
        marginTop: '15%',
        width: 300,
        height: 50,
        justifyContent: 'center',
        borderRadius: 15
    },
    botaun2: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginTop: '15%',
        width: 85,
        height: 25,
        justifyContent: 'center'
    }
});
