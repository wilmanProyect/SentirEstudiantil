import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import useUserStore from '../store/userStore';

export default function Index() {
  const { nombre, edad, setNombre, setEdad } = useUserStore();
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Hola, Tus sentimientos son importantes para nosotros.</Text>
        <Text style={styles.text}>¿Cuál es tu nombre?</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
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
          <Text>Comenzar</Text>
        </TouchableOpacity>
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
  text:{
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 20,
    fontWeight: 'bold'
  }
});        