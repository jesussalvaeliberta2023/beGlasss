import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';

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
        fontSize: 35,
        marginTop: '25%',
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
        width: 500,
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
    }
});
