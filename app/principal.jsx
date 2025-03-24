import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';


export default function Principal() {
    const [contador, setContador] = useState(3);

    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Cielo emocional</Text>
                <Image source={require('../assets/images/favicon.png')}></Image>
            </View>
            <View style={styles.header}>
                <Text style={styles.subtitle}>¿Cómo te sientes el día de hoy?</Text>
                <Text> __ </Text>
            </View>
            <View style={styles.container}>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setContador(contador - 1)}
                >
                    <Text style={styles.buttonText}>Expresa aquí tus emociones</Text>
                </TouchableOpacity>

                <Text style={styles.counterText}>Aparecerá una estrella en {contador}</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        display: 'flex',
    },
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:100,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    calendarContainer: {
        marginBottom: 20,
    },
    calendarIcon: {
        width: 50,
        height: 50,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    counterText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});