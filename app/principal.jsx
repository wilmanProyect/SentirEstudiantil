import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import useUserStore from '../store/userStore';
import { useState } from 'react';
export default function Principal() {
    const { edad, setEdad } = useUserStore();
    const [contador, setContador] = useState(3);
    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.text}>Cielo Emocional</Text>

                <Text style={styles.text}>¿Como te sientes el dia de hoy?</Text>


                <TextInput
                    placeholder="Edad"
                    value={edad}
                    onChangeText={setEdad}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push(`/principal`)}
                >
                    <Text>Expresa aquí tus emociones</Text>
                </TouchableOpacity>
                <Text style={styles.text} >Aparecera una estrella en {contador}</Text>
            </View>

        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover'
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    button: {
        backfaceVisibility: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,

    },
    input: {
        backfaceVisibility: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 20,
        fontWeight: 'bold'
    }
});        