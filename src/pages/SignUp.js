import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from '../styles/StyleSheet';

export default function SignUp() {
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={10} style={{flex: 1}} source={require('../assets/images/Drinks/Sangria.png')}>
                <Image source={require('../assets/images/Logo.png')} style={estilos.imagens}/>
                <BlurView intensity={100} style={estilos.absolute} tint='dark'>
                    <View style={estilos.corpao}>
                        <Text style={estilos.titulous}>Faça seu Cadastro</Text>
                        <TextInput placeholder="Nome de Usuário:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TextInput placeholder="Email:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TextInput placeholder="Senha:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TextInput placeholder="Confirmar Senha:" placeholderTextColor={'white'} style={estilos.inputs} />
                        <TouchableOpacity style={estilos.botatudo}>
                            <Text style={{textAlign: 'center'}}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const estilos = StyleSheet.create({
    inputs: {
        width: 375,
        height: 45,
        borderBottomWidth: 2,
        borderColor: 'white',
        fontSize: 20,
        marginTop: '15%',
    },
    corpao: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulous: {
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
        width: 300,
        height: 100,
        alignSelf: 'center',
        marginTop: '20%',
        marginLeft: '10%',
        zIndex: 1
    },
    botatudo: {
        backgroundColor: '#E98F83',
        marginTop: '15%',
        width: 300,
        height: 50,
        justifyContent: 'center',
        borderRadius: 15
    }
});
