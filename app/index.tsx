import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useRouter } from "expo-router";
import useUserStore from '../store/userStore';
import { useState } from 'react';

export default function Index() {
  const { nombre,  setNombre} = useUserStore();
  const [errors, setErrors] = useState({ nombre: false});
  const router = useRouter();

  const handleSubmit = () => {
    // Validación de campos
    const newErrors = {
      nombre: !nombre.trim(),
    };
    
    setErrors(newErrors);

    if (!newErrors.nombre) {
      router.push('/principal');
    }
  };
  return (
    <ImageBackground
      source={require('../assets/images/Background1.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Hola, Tus sentimientos son importantes para nosotros.</Text>
        <Text style={styles.text}>¿Cuál es tu nombre?</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            setErrors({...errors, nombre: false});
          }}
          style={styles.input}
        />
        {errors.nombre && <Text style={styles.errorText}>Este campo es requerido</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
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
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginTop: -5,
    marginBottom: 5
  }
});        